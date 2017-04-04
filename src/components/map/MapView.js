'use strict';
/* eslint no-console: 0 */

import React, { Component } from 'react';
import Mapbox, { MapView as RNMapView, Annotation } from 'react-native-mapbox-gl';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { onUpdateUserLocation } from '../../redux/actions/user';
import { loadBusiness } from '../../redux/actions/business';
import { loadAssociation } from '../../redux/actions/association';

import Marker from './Marker';
import MapDirection from './MapDirection';
import { 
  accessTokenMapBox,
  styleMapBox,
  mapGoogleKey
} from '../../config.json';

import { metrics, colors } from '../../themes';
import { businessType, } from '../../types';

import {
  getCategory,
} from '../../constants/categories';


const rayonMarker = 21;
const circle = 52;

Mapbox.setAccessToken(accessTokenMapBox);

class MapView extends Component {

  state = {
    legs: {},
    direction: [],
    showsUserLocation: true,
    regionUser: this.props.location,
    zoom: 12,
    userTrackingMode: Mapbox.userTrackingMode.followWithHeading,
    annotations: [],
    annotation: null,
    color: 'white',
    gps_activate: true,
    mode: 'driving',
    loadedDirection: true,
    nearMe: false,
    //findRegionUser: true
  };

  shouldComponentUpdate(nextProps , nextState){

    if(
      nextState.annotations !== this.state.annotations
      ||
      nextState.direction !== this.state.direction
      ||
      nextState.mode !== this.state.mode
      ||
      nextState.userTrackingMode !== this.state.userTrackingMode
      ||
      nextProps.changedLocation !== nextProps.changedLocation
    ){
      return true;
    }
    return false;
  }

  componentWillMount() {
    this._offlineProgressSubscription = Mapbox.addOfflinePackProgressListener(progress => {
      //console.log('offline pack progress', progress);
    });
    this._offlineMaxTilesSubscription = Mapbox.addOfflineMaxAllowedTilesListener(tiles => {
      //console.log('offline max allowed tiles', tiles);
    });
    this._offlineErrorSubscription = Mapbox.addOfflineErrorListener(error => {
      //console.log('offline error', error);
    });
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.mode !== this.state.mode) {
      this.fetchDirection(this.props.address, this.props.category.color, true);
    }
    else if(this.state.userTrackingMode != nextState.userTrackingMode){
      this.fetchDirection(this.state.annotation, this.state.color, nextState.gps_activate);
    }
  }

  componentDidMount() {
    if(this.props.businesses) {
      this.generateMarkers(this.props.businesses);
      if(this.props.businesses[0]){
        this.fetchAnnotation(this.props.businesses[0], this.props.businesses[0].addresses[0]);
      }
    }

    if(this.props.address){

      let category = {};

      if(!this.props.businesses){
        this.generateMarker();
      }
      
      if(this.props.business) {
        category = getCategory(this.props.business.business_category_id);
      }
      else if(this.props.category) {
        category = this.props.category;
      }

      if(category) {
        this.fetchDirection(this.props.address, category.color, true);
      }
      
    }
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.businesses !== this.props.businesses) {

      this.generateMarkers(nextProps.businesses);
      if(nextProps.businesses[0]){
        let business = null;
        let address =  null;

        if(!this.state.nearMe) {

          if(this.props.business && this.props.address) {
            business = this.props.business;
            address = this.props.address;
          }
          else {
            business  = nextProps.businesses[0];
            address = nextProps.businesses[0].addresses[0]
          }

          if( business ) {
            this.setState({nearMe: true});
            this.fetchAnnotation(business, address);
          }
          
        }
      }

      else {
        this.props.showBusiness(null, null)
        this.setState({nearMe: false, direction: []});
      }
      
    }
    else if(nextProps.changedLocation !== this.props.changedLocation) {
      this.load();
    }
  }

  onRegionDidChange = (location) => {

    //console.log('onRegionDidChange', location);
  };

  onRegionWillChange = (location) => {
   // console.log('onRegionWillChange', location);

  };

  onUpdateUserLocation = (location) => {

    const regionUser =  {
      latitude: location.latitude,
      longitude: location.longitude,
    }

    this.setState({ regionUser });
    
    if(!this.props.changedLocation){
      
      this.setCenterCoordinate(regionUser);
      this.props.onUpdateUserLocation(regionUser);
      
    }
    
  };

  load() {
    this.props.loadBusiness();
    this.props.loadAssociation();
  }
  

  onOpenAnnotation = (annotation) => {
    
    if(this.props.businesses){
      const id = annotation.id.split('address');

      const business = this.props.businesses.find(obj => parseInt(obj.id) === parseInt(id[0]));
      const address = business.addresses.find(obj => parseInt(obj.id) === parseInt(id[1]));
      
      
      const category = getCategory(business.business_category_id);

      this.fetchDirection(address, category.color, this.state.gps_activate);
      this.props.showBusiness(business, address);
    }
    
    //console.log('onOpenAnnotation', annotation);
  };

  fetchAnnotation = (business, address) => {
    
    const category = getCategory(business.business_category_id);
    this.fetchDirection(address, category.color, this.state.gps_activate);
    this.props.showBusiness(business, address);
  }



  onRightAnnotationTapped = (e) => {
    console.log('onRightAnnotationTapped', e);
  };

  onLongPress = (location) => {
    console.log('onLongPress', location);
  };

  onTap = (location) => {
    console.log('onTap', location);
  };

  onChangeUserTrackingMode = (userTrackingMode) => {
    this.setState({ userTrackingMode });
    //console.log('onChangeUserTrackingMode', userTrackingMode);
  };
  

  setDirection = () => {
    //this.fetchDirection(this.state.annotation);
    this.setState({
      gps_activate: !this.state.gps_activate,
      userTrackingMode: 
        !this.state.gps_activate ? 
        Mapbox.userTrackingMode.followWithHeading : 
        Mapbox.userTrackingMode.none
    });

  }
  
  setCenterCoordinate(regionUser) {
    this._map.setCenterCoordinate(
      regionUser.latitude,
      regionUser.longitude,
      true
    );
  }
   
  generateMarker () {
    const annotations = [];

    annotations.push(this.annotationItem({id: 1}, this.props.address, this.props.category));

    this.setState({
      annotations
    });
    
  }

  annotationItem(business, address, category) {
    return {
      coordinates: [address.latitude, address.longitude],
      type: 'point',
      id: business.id+ 'address' + address.id ,
      annotationImage: {
        source: { 
          uri:  Platform.OS === 'android' ? 
          category.marker : 
          category.markerIOS 
        },
        height: 20,
        width: 20
      },
    };
  }

  generateMarkers(businesses) {
    const annotations = [];

    businesses.forEach(business => {
      
      const category = getCategory(business.business_category_id);

      business.addresses.forEach((address, key) => {
        annotations.push(this.annotationItem(business, address, category));
      })
    });
    
    // Treat annotations as immutable and create a new one instead of using .push()
    this.setState({
      annotations
    });
  };

  onRightAnnotationTapped = (e) => {

    console.log('onRightAnnotationTapped', e);
  };

  fetchDirection(address, color, gps) {

    this.setState({ 
      annotation: address,
      color: color,
      direction: [],
    });
    
    if(gps && address){
      //const startPosition = LATITUDE + ',' + LONGITUDE;
       
      const startPosition = this.state.regionUser.latitude + ',' + this.state.regionUser.longitude;
      const endPosition = address.latitude + ','  + address.longitude;

      const url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' 
      + startPosition 
      +'&destination=' 
      + endPosition 
      
      + '&key=' 
      + mapGoogleKey;

      if(this.props.mapDirection){
        url+= '&departure_time='
           + Date.now()
           + '&traffic_model=best_guess';
      }

      if(this.state.mode === 'driving'
        ||
        this.state.mode === 'walking'
        ||
        this.state.mode === 'bicycling'

      ){
        url+= '&mode='+ this.state.mode;
      }
      else{
        url+= '&mode=transit&transit_mode='+ this.state.mode;
      }
      

      return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(async (responseData) => {

        console.log('responseDataDirection', responseData)
        let coordinates = [];
        let legs = {};

        if(responseData && responseData.routes[0]){

          //setInfoAddress

          
          legs = responseData.routes[0].legs[0];
          await legs.steps.forEach( step => {
            coordinates.push([step.start_location.lat,step.start_location.lng]);
            coordinates.push([step.end_location.lat,step.end_location.lng]);
          })
        }
        
        
        if(!this.props.mapDirection){

          this.setState({
            direction: coordinates,
          });
        }
        else{

          if(this.props.setDistance) {
            this.props.setDistance(legs);
          }

          this.setState({
            direction: coordinates,
            legs
          });
        }
        
      })
      .catch(error => {
      })
      
    }

  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.mapDirection &&
          <MapDirection 
            address={this.props.address}
            mode={this.state.mode}
            setMode={(mode) => this.setState({ mode })}
            legs={this.state.legs}
            onClose={this.props.onClose}
          />
        } 
        <RNMapView
          ref={map => { this._map = map; }}
          style={styles.map}
          initialCenterCoordinate={this.state.regionUser}
          initialZoomLevel={this.state.zoom}
          initialDirection={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={this.state.showsUserLocation}
          styleURL={styleMapBox}
          annotations={[{
            type: 'polyline',
            fillAlpha: 1,
            strokeColor: this.state.color,
            strokeAlpha: 3,
            strokeWidth: 3, 
            id: 'polyline',
            coordinates: this.state.direction
          } , ...this.state.annotations]}
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
        
        <View style={styles.rightContainer}>
          <TouchableOpacity 
            style={[
              styles.iconContainer,
            ]}
            onPress={() => this.setCenterCoordinate(this.state.regionUser)}
          >
            <Image
              resizeMode='contain'
              style={styles.image}
              source={require('../../resources/icons/oval.png')}
            >
              <Image 
                source={require('../../resources/icons/gps-fixed-indicator.png')}
                resizeMode='contain'
                style={{
                  height: 20,
                  width:  20,
                }}
              />
            </Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setDirection()}
            style={[
              styles.iconContainer,
            ]}
          >
            {
              !this.state.gps_activate ?
              <Image
                resizeMode='contain'
                style={styles.image}
                source={require('../../resources/icons/oval.png')}
              >
                <Image
                  resizeMode='contain'
                  source={require('../../resources/icons/navigation-blue.png')}
                  style={{
                    height: 20,
                    width:  14,
                  }}
                />
              </Image>
              :
              <Image
                resizeMode='contain'
                style={styles.image}
                source={require('../../resources/icons/gps_activate.png')}
              />
            }
            
          </TouchableOpacity>
          
        </View>
        

      </View>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location.latlng,
  changedLocation: state.location.changed,
});


const mapDispatchToProps = (dispatch) => ({
  onUpdateUserLocation: bindActionCreators(onUpdateUserLocation, dispatch),
  loadBusiness: bindActionCreators(loadBusiness, dispatch),
  loadAssociation: bindActionCreators(loadAssociation, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  map: {
    flex: 5
  },
  rightContainer: {
    position: 'absolute',
    bottom: metrics.smallMargin,
    right: metrics.baseMargin,
    flexDirection: 'row',
  },
  iconContainer: {       
    height: circle,
    width: circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  annotation: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 18,
    height: 18,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

