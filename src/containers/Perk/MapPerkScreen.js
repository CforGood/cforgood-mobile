import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import BusinessDistance from '../../components/business/BusinessDistance';
import MapView from '../../components/map/MapView';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class MapPerkScreen extends Component {

  state = {
    distance: ''
  };

  setDistance = (address) => {
    this.setState({ distance: `à ${address.distance.text} ( ${address.duration.text} )` });
  }

  render() {

    const { business, perk, category } = this.props.navigation.state.params;

    const address = business.address || business.addresses[0]
    console.log('addressaddress', address)
    return (
      <View style={styles.screen.mainContainer}>
        <View style={{ flex: 1 }} >
          <MapView
            onClose={() => this.props.navigation.goBack()}
            category={category}
            address={address}
            userTrackingMode={true}
            mapDirection={true}
            setDistance={this.setDistance}
          />
        </View>
        <View
          style={styleMapDistanceScreen.footer}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={[
                fonts.style.bold,
                fonts.style.t16,
              ]}
              numberOfLines={1}
            >
              {business.name}
            </Text>
          </View>
          <BusinessDistance
            color={category.color}
            distance={this.state.distance}
          />
        </View>
      </View>
    );
  }
}

export default MapPerkScreen;

const styleMapDistanceScreen = StyleSheet.create({
  distanceMap: {
    flex: 3,
    backgroundColor: '#4285f4',
  },
  distanceMap: {
    flex: 6
  },
  footer: {
    height: 60,
    paddingHorizontal: metrics.marginApp,
    paddingVertical: 2
  },
  position: {
    flex: 2,
    backgroundColor: '#4285f4'
  },
  text: {
    color: colors.white,
    marginLeft: metrics.smallMargin
  },
  distance: {
    flex: 1,
    paddingVertical: metrics.baseMargin
  },
  icon: {
    flex: 1,
    alignItems: 'center'
  }
}); 
