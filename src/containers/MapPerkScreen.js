import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import BusinessTitle from '../components/business/BusinessTitle';
import BusinessDistance from '../components/business/BusinessDistance';

import Modal from '../components/Modal';
import Distance from '../components/map/Distance';
import Position from '../components/map/Position';
import MapView from '../components/map/MapView';


import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

class MapPerkScreen extends Component { 
  
  //https://maps.google.com/maps/api/geocode/json?latlng=
  //

  state = {
    distance: ''
  };

  setDistance = ( address ) => {
    console.log('address.distance', address.distance)
    this.setState({distance: `à ${address.distance.text} ( ${address.duration.text} )`});
  }

  render() {

    const {
      onClose,
      business,
      visible,
      color,
      category
    } = this.props;

    const address = business.address || business.addresses[0]
    
    return (
      <Modal
        onClose={onClose}
        animationType={'none'}
        blurType={'light'}
        blurAmount={0}
        visible={visible}
      >
        <View 
          style={styles.screen.mainContainer}
        >
          <View style={{flex: 1}} >
            <MapView 
              onClose={onClose}
              category={category}
              address={business.address || business.addresses[0]}
              userTrackingMode={true}
              mapDirection={true}
              setDistance={this.setDistance}
            />
          </View>
          <View
            style={styleMapDistanceScreen.footer}
          >
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text 
                style={[
                  fonts.style.bold,
                  fonts.style.regular,
                ]}
                numberOfLines={1}
              >
                {business.name} 
              </Text>
            </View>
            <BusinessDistance 
              color={ category.color }
              distance={this.state.distance}
            /> 
          </View>
        </View>
      </Modal> 
    );
  }
}

export default MapPerkScreen;

const styleMapDistanceScreen = StyleSheet.create({ 
  distanceMap: {  
    flex:3,
    backgroundColor: '#4285f4',
  },
  distanceMap: {  
    flex:6
  },
  footer: {  
    height: 60,
    paddingHorizontal: metrics.marginApp,
    paddingVertical: 2
  },
  position: {
    flex:2, 
    backgroundColor: '#4285f4'
  },
  text:{
    color: colors.white, 
    marginLeft: metrics.smallMargin
  },
  distance: {
    flex:1, 
    paddingVertical: metrics.baseMargin
  },
  icon: {
    flex:1, 
    alignItems: 'center' 
  }
}); 
