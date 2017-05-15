'use strict';
/* eslint no-console: 0 */

import React, { Component } from 'react';
import Mapbox, { MapView, Annotation } from 'react-native-mapbox-gl';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  Platform,
  Modal
} from 'react-native';

import Marker from '../map/Marker';

import {
  metrics,
} from '../../themes';

import {
  businessType,
} from '../../types';

import { 
  accessTokenMapBox,
  styleMapBox,
} from '../../config.json';



class MapBusiness extends Component {
  state = {
    center: null,
    zoom: 10,
    userTrackingMode: Mapbox.userTrackingMode.none,
    annotation: []
  };

  componentWillMount() {
    const { address, category }  = this.props;
    if(address){
      this.setState({
        center: {
          latitude: address.latitude,
          longitude: address.longitude,
        },
        annotations: [{
          coordinates: [address.latitude, address.longitude],
          type: 'point',
          id: 'point' ,
          annotationImage: {
            source: { 
              uri:  Platform.OS === 'android' ? 
              category.marker : 
              category.markerIOS 
            },
            height: 20,
            width: 20
          },
        }]
      })
    }
    
  }
  
  renderMap () {
    return (
      <MapView
        ref={map => { this._map = map; }}
        style={styles.map}
        initialCenterCoordinate={this.state.center}
        initialZoomLevel={this.state.zoom}
        initialDirection={0}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
        showsUserLocation={false}
        styleURL={styleMapBox}
        annotations={this.state.annotations}
      />
    )
  }

  render() {
    const { address, category } = this.props;
    return (
      <View style={styles.container}>
        {this.renderMap()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //height: metrics.deviceHeight/5.90,
    backgroundColor: 'red',
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
export default MapBusiness;