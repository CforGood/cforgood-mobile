import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Distance from './Distance';
import Position from './Position';


import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class MapDirection extends Component { 

  render() {

    const {
      onClose,
      address,
      legs,
    } = this.props;
    
    return (
      
      <View style={[
          styleMapDistanceScreen.position,
          {
            paddingTop: metrics.baseMargin + (Platform.OS === 'ios' ? 20: 0),
            backgroundColor: '#4285f4',
          }
        ]}
      >
        <View style={[
            styles.row,
            {flex:2}
          ]}
        >
          <TouchableOpacity 
            style={{
              flex:1,
              alignItems: 'center'
            }}
            onPress={() => this.props.onClose()}
          >
            <Icon
              name="arrow-back"
              color={colors.white}
              size={30} 
            />
          </TouchableOpacity>
          <View style={{flex:5}}>
            <Position 
              icon={'radio-button-checked'}
              text={legs.start_address}
            />
            <View style={[
                styles.row,
                {flex:0.5}
              ]}
            >
              <Text style={styleMapDistanceScreen.text}>:</Text> 
            </View> 
            <Position 
              icon={'place'}
              text={address.street || legs.end_address}
            />
          </View>
          <View style={styleMapDistanceScreen.icon}>
            <Icon
              name="more-vert"
              color={colors.white}
              size={30} 
            />
          </View>     
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            {
              height: 40,
              flexDirection: 'row',
              alignItems: 'center'
            }
          ]}
        >
          <Distance 
            text={'En voiture'} 
            icon={'drive-eta'}
            active={this.props.mode === 'driving'}
            onPress={() => this.props.setMode('driving')}
          />
          <Distance 
            text={'A pied'} 
            icon={'directions-walk'}
            active={this.props.mode === 'walking'}
            onPress={() => this.props.setMode('walking')}
          />
          <Distance 
            text={'A vélo'} 
            icon={'directions-bike'}
            active={this.props.mode === 'bicycling'}
            onPress={() => this.props.setMode('bicycling')}
          />        
          <Distance 
            text={'Bus'} 
            icon={'directions-bus'}
            active={this.props.mode === 'bus'}
            onPress={() => this.props.setMode('bus')}
          />
          <Distance 
            text={'Train'} 
            icon={'train'}
            active={this.props.mode === 'train'}
            onPress={() => this.props.setMode('train')}
          />
          <Distance 
            text={'Subway'} 
            icon={'directions-subway'}
            active={this.props.mode === 'subway'}
            onPress={() => this.props.setMode('subway')}
          />
          
        </ScrollView>
      </View> 
    );
  }
}

export default (MapDirection);

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
    flexDirection: 'row',
    paddingHorizontal: metrics.marginApp,
    alignItems: 'center'
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
