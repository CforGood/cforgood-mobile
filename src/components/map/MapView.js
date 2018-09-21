"use strict";
/* eslint no-console: 0 */

import React, { Component } from "react";
import Mapbox, {
  MapView as RNMapView,
  Annotation
} from "react-native-mapbox-gl";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";

import Permissions from "react-native-permissions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkLocationAndroid } from '../../helpers/location';
import { onUpdateUserLocation } from "../../redux/actions/user";
import {
  loadPopupNearMe,
  noPermissionLocation,
  checkLocation
} from "../../redux/actions/popup";

import { loadBusiness } from "../../redux/actions/business";
import { loadAssociation } from "../../redux/actions/association";
import { maximumDistance } from "../../helpers/distance";

import Marker from "./Marker";
import MapDirection from "./MapDirection";
import AuthorizeLocation from "../authorize/Location";

Mapbox.setAccessToken(accessTokenMapBox);

import {
  accessTokenMapBox,
  styleMapBox,
  mapGoogleKey
} from "../../config.json";

import { metrics, colors } from "../../themes";
import { businessType } from "../../types";

import { getCategory } from "../../constants/categories";

const rayonMarker = 21;
const circle = 52;

class MapView extends Component {
  state = {
    legs: {},
    direction: [],
    showsUserLocation: true,
    regionUser: { latitude: 0, longitude: 0 },
    zoom: 12,
    userTrackingMode: Mapbox.userTrackingMode.followWithHeading,
    annotations: [],
    annotation: null,
    color: "white",
    gps_activate: true,
    mode: "walking",
    loadedDirection: true,
    nearMe: false,
    verifyLocation: false,
    activateLocation: false
    //findRegionUser: true
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.verifyLocation !== this.state.verifyLocation ||
      nextState.annotations !== this.state.annotations ||
      nextState.direction !== this.state.direction ||
      nextState.mode !== this.state.mode ||
      nextState.userTrackingMode !== this.state.userTrackingMode ||
      nextProps.changedLocation !== this.props.changedLocation ||
      nextProps.check_location !== this.props.check_location
    ) {
      return true;
    }
    return false;
  }

  componentWillMount() {
    if (this.props.location && this.props.location.latitude) {
      this.setState({ regionUser: this.props.location });
    }

    this.checkAuthorizedLocation();

    this._offlineProgressSubscription = Mapbox.addOfflinePackProgressListener(
      progress => {
        //console.log('offline pack progress', progress);
      }
    );
    this._offlineMaxTilesSubscription = Mapbox.addOfflineMaxAllowedTilesListener(
      tiles => {
        //console.log('offline max allowed tiles', tiles);
      }
    );
    this._offlineErrorSubscription = Mapbox.addOfflineErrorListener(error => {
      //console.log('offline error', error);
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.mode !== this.state.mode) {
      this.fetchDirection(
        this.props.address,
        this.props.category.color,
        true,
        nextState.mode
      );
    } else if (this.state.userTrackingMode !== nextState.userTrackingMode) {
      this.fetchDirection(
        this.state.annotation,
        this.state.color,
        nextState.gps_activate,
        this.state.mode
      );
    }
  }

  componentDidMount() {
    this.loadmarkers(this.props);
    if (this.props.address) {
      let category = {};

      if (!this.props.businesses) {
        this.generateMarker();
      }

      if (this.props.business) {
        category = getCategory(this.props.business.business_category_id);
      } else if (this.props.category) {
        category = this.props.category;
      }

      if (category) {
        this.fetchDirection(this.props.address, category.color, true);
      }
    }

    if (this.props.businesses && this.props.businesses[0]) {
      this.fetchAnnotation(
        this.props.businesses[0],
        this.props.businesses[0].addresses[0]
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.businesses !== this.props.businesses) {
      this.loadmarkers(nextProps);
    }

    if (nextProps.changedLocation !== this.props.changedLocation) {
      this.load();
    }
  }

  checkAuthorizedLocation() {
    Permissions.requestPermission("location")
      .then(response => {
        if (response === "authorized") {
          this.load();
        } else {
          checkLocationAndroid();
          this.props.noPermissionLocation();
        }
      })
      .catch(e => {
        checkLocationAndroid();
        this.props.noPermissionLocation();
      });
    navigator.geolocation.getCurrentPosition(
      position => {
        if(position) {

          this.onUpdateUserLocation(position.coords);
        }
      },
      error => {
        this.props.noPermissionLocation();
      }
    );
  }

  loadmarkers(props) {
    this.generateMarkers(props.businesses);
    if (props.businesses && props.businesses[0]) {
      let business = null;
      let address = null;

      if (!this.state.nearMe) {
        if (props.businesses[0].addresses[0]) {
          business = props.businesses[0];
          address = props.businesses[0].addresses[0];
        }

        if (business && address) {
          this.setState({ nearMe: true });
          this.maximumDistance(business, address);
        }
      }
    } else {
      props.showBusiness(null, null);
      this.setState({ nearMe: false, direction: [] });
    }
  }

  maximumDistance(business, address) {
    const verify = maximumDistance(this.props.location, address);

    if (verify) {
      this.fetchAnnotation(business, address);
    }

    this.props.loadPopupNearMe(verify);
  }

  onRegionDidChange = location => {
    //console.log('onRegionDidChange', location);
  };

  onRegionWillChange = location => {
    // console.log('onRegionWillChange', location);
  };

  onUpdateUserLocation = location => {
    if (
      !this.props.location ||
      (this.props.location.latitude !== location.latitude &&
        this.props.location.longitude !== location.longitude)
    ) {
      const regionUser = {
        latitude: location.latitude,
        longitude: location.longitude
      };

      this.setState({ regionUser });

      this.props.onUpdateUserLocation(regionUser);

      if (!this.props.changedLocation) {
        this.setCenterCoordinate(regionUser);
      }
    }
  };

  load() {
    this.props.loadBusiness();
    this.props.loadAssociation();
  }

  onOpenAnnotation = annotation => {
    if (this.props.businesses) {
      const id = annotation.id.split("address");

      const business = this.props.businesses.find(
        obj => parseInt(obj.id) === parseInt(id[0])
      );
      const address = business.addresses.find(
        obj => parseInt(obj.id) === parseInt(id[1])
      );

      const category = getCategory(business.business_category_id);

      this.fetchDirection(address, category.color, this.state.gps_activate);
      this.props.showBusiness(business, address);
    }
  };

  fetchAnnotation = (business, address) => {
    const category = getCategory(business.business_category_id);
    this.fetchDirection(address, category.color, this.state.gps_activate);
    this.props.showBusiness(business, address);
  };

  onRightAnnotationTapped = e => {
    console.log("onRightAnnotationTapped", e);
  };

  onLongPress = location => {
    console.log("onLongPress", location);
  };

  onTap = location => {
    console.log("onTap", location);
  };

  onChangeUserTrackingMode = userTrackingMode => {
    this.setState({ userTrackingMode });
  };

  setDirection = () => {
    this.setState({
      gps_activate: !this.state.gps_activate,
      userTrackingMode: !this.state.gps_activate
        ? Mapbox.userTrackingMode.followWithHeading
        : Mapbox.userTrackingMode.none
    });
  };

  setCenterCoordinate(regionUser) {
    this._map.setCenterCoordinate(
      regionUser.latitude,
      regionUser.longitude,
      true
    );
  }

  generateMarker() {
    const annotations = [];

    annotations.push(
      this.annotationItem({ id: 1 }, this.props.address, this.props.category)
    );

    this.setState({
      annotations
    });
  }

  annotationItem(business, address, category) {
    return {
      coordinates: [address.latitude, address.longitude],
      type: "point",
      id: business.id + "address" + address.id,
      annotationImage: {
        source: {
          uri: Platform.OS === "android" ? category.marker : category.markerIOS
        },
        height: 20,
        width: 20,
        zIndex: 10
      }
    };
  }

  generateMarkers(businesses) {
    const annotations = [];

    if (businesses) {
      businesses.forEach(business => {
        const category = getCategory(business.business_category_id);

        business.addresses.forEach((address, key) => {
          annotations.push(this.annotationItem(business, address, category));
        });
      });
    }

    // Treat annotations as immutable and create a new one instead of using .push()
    this.setState({
      annotations
    });
  }

  onRightAnnotationTapped = e => {
    console.log("onRightAnnotationTapped", e);
  };

  fetchDirection(address, color, gps, mode = null) {
    this.setState({
      annotation: address,
      color: color,
      direction: []
    });

    if (gps && address) {
      const startPosition =
        this.state.regionUser.latitude + "," + this.state.regionUser.longitude;
      const endPosition = address.latitude + "," + address.longitude;

      const url =
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
        startPosition +
        "&destination=" +
        endPosition +
        "&key=" +
        mapGoogleKey;

      if (this.props.mapDirection) {
        url += "&departure_time=" + Date.now() + "&traffic_model=best_guess";
      }
      const m = mode || this.state.mode;
      if (m === "driving" || m === "walking" || m === "bicycling") {
        url += "&mode=" + m;
      } else {
        url += "&mode=transit&transit_mode=" + m;
      }

      return fetch(url)
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          let coordinates = [];
          let legs = {};

          if (responseData && responseData.routes[0]) {
            //setInfoAddress

            legs = responseData.routes[0].legs[0];
            legs.steps.forEach(step => {
              coordinates.push([
                step.start_location.lat,
                step.start_location.lng
              ]);
              coordinates.push([step.end_location.lat, step.end_location.lng]);
            });
          }

          if (!this.props.mapDirection) {
            this.setState({
              direction: coordinates
            });
          } else {
            if (this.props.setDistance) {
              this.props.setDistance(legs);
            }

            this.setState({
              direction: coordinates,
              legs
            });
          }
        })
        .catch(error => {});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AuthorizeLocation
          nextStep={() => this.props.checkLocation(false)}
          verify={this.props.check_location}
          handleError={() => {}}
        />
        {this.props.mapDirection && (
          <MapDirection
            address={this.props.address}
            mode={this.state.mode}
            setMode={mode => this.setState({ mode })}
            legs={this.state.legs}
            onClose={this.props.onClose}
          />
        )}
        {
          <RNMapView
            ref={map => {
              this._map = map;
            }}
            style={styles.map}
            initialCenterCoordinate={this.state.regionUser}
            initialZoomLevel={this.state.zoom}
            initialDirection={0}
            rotateEnabled={true}
            scrollEnabled={true}
            zoomEnabled={true}
            showsUserLocation={this.state.showsUserLocation}
            styleURL={styleMapBox}
            annotations={[
              {
                type: "polyline",
                fillAlpha: 1,
                strokeColor: this.state.color,
                strokeAlpha: 3,
                strokeWidth: 3,
                id: "polyline",
                coordinates: this.state.direction
              },
              ...this.state.annotations
            ]}
            userTrackingMode={this.state.userTrackingMode}
            annotationsAreImmutable={true}
            annotationsPopUpEnabled={false}
            onChangeUserTrackingMode={this.onChangeUserTrackingMode}
            onRegionDidChange={this.onRegionDidChange}
            onRegionWillChange={this.onRegionWillChange}
            onUpdateUserLocation={this.onUpdateUserLocation}
            onLongPress={this.onLongPress}
            onTap={this.onTap}
            logoIsHidden={true}
            compassIsHidden={true}
            onRightAnnotationTapped={this.onRightAnnotationTapped}
            onOpenAnnotation={this.onOpenAnnotation}
          />
        }

        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={[styles.iconContainer]}
            onPress={() => this.setCenterCoordinate(this.state.regionUser)}
          >
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require("../../resources/icons/oval.png")}
            >
              <Image
                source={require("../../resources/icons/gps-fixed-indicator.png")}
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20
                }}
              />
            </Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setDirection()}
            style={[styles.iconContainer]}
          >
            {!this.state.gps_activate ? (
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../../resources/icons/oval.png")}
              >
                <Image
                  resizeMode="contain"
                  source={require("../../resources/icons/navigation-blue.png")}
                  style={{
                    height: 20,
                    width: 14
                  }}
                />
              </Image>
            ) : (
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../../resources/icons/gps_activate.png")}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location.latlng,
  changedLocation: state.location.changed,
  check_location: state.popup.check_location
});

const mapDispatchToProps = dispatch => ({
  onUpdateUserLocation: bindActionCreators(onUpdateUserLocation, dispatch),
  loadBusiness: bindActionCreators(loadBusiness, dispatch),
  loadAssociation: bindActionCreators(loadAssociation, dispatch),
  loadPopupNearMe: bindActionCreators(loadPopupNearMe, dispatch),
  noPermissionLocation: bindActionCreators(noPermissionLocation, dispatch),
  checkLocation: bindActionCreators(checkLocation, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "white"
  },
  map: {
    flex: 5
  },
  rightContainer: {
    position: "absolute",
    bottom: metrics.smallMargin,
    right: metrics.baseMargin,
    flexDirection: "row"
  },
  iconContainer: {
    height: circle,
    width: circle,
    justifyContent: "center",
    alignItems: "center"
  },
  annotation: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 18,
    height: 18
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
