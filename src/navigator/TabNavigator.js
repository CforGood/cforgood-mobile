
import React from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import TabNavigator from '../modules/TabView/TabNavigator';

import PerksScreen from '../containers/PerksScreen';
import AssociationScreen from '../containers/AssociationScreen';
import MapScreen from '../containers/MapScreen';

const { height, width } = Dimensions.get('window');

const TabNavigatorAPP = TabNavigator({
  
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      tabBar: {
        label: 'Commerces',
        icon: ({ tintColor }) => (
          <Image
            resizeMode='contain'
            source={require('../resources/icons/map-of-roads.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      },
    },
  }, 
  Perks: {
    screen: PerksScreen,
    navigationOptions: {
      visible: false,
      tabBar: {
        label: 'Bons Plans',
        icon: ({ tintColor }) => (
          <Image
            resizeMode='contain'
            source={require('../resources/icons/price-tag.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      },
    },
  },
  Association: {
    screen: AssociationScreen,
    navigationOptions: {
      tabBar: {
        label: 'Associations',
        icon: ({ tintColor }) => (
          <Image
            resizeMode='contain'
            source={require('../resources/icons/handshake.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      },
    },
  },

}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#64B9EA',
    inactiveTintColor: '#404040',
    labelStyle: {
      fontFamily: 'Avenir',
      fontWeight: 'bold',
      fontSize: width/28,
    },
    style: {
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#404040',
      height: height/12,
    },
    indicatorStyle: {
      backgroundColor: 'transparent'
    },
    tabStyle: {
      flexDirection: 'column-reverse',
      height: height/13.01, 
    }
  }
});

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: height/21,
    marginTop: 2,
  },
});

export default TabNavigatorAPP;
