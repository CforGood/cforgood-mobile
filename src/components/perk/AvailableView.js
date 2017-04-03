import React, { PureComponent , PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import {
  fonts,
  metrics,
} from '../../themes';
 
export default class AvailableView extends PureComponent {
  static propTypes = {
    color: PropTypes.string.isRequired,
    flash: PropTypes.bool,
  };

  render() {
    if (!this.props.flash){
      return null;
    }

    return (
      <View style={style.container}> 
        <View style={style.circle}>
          <Image 
            source={require('../../resources/icons/flash.png')}
            resizeMode='contain'
            style={{
              flex: 1,
              tintColor: this.props.color
            }}
          />
        </View>
        <View style={{
          height: metrics.deviceWidth/15.625,
          justifyContent: 'center',
          marginLeft: metrics.tinyMargin
        }}>
          <Text 
            style={[ 
              {  
                textAlign: 'center',
                color: 'white'
              }, 
              fonts.style.tiny
            ]}
          >
            {this.props.times_remaining} restants 
          </Text>
        </View> 
      </View>
    );
  }
}
 
const style = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
  },
  circle: { 
    height: metrics.deviceWidth/15.625,
    width: metrics.deviceWidth/15.625,  
    borderRadius: metrics.deviceWidth/31.25,  
    padding: metrics.tinyMargin,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
