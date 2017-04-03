import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
 
import {
  styles, 
  fonts,
  metrics,
} from '../../themes';

export default class Social extends PureComponent {

  static propTypes = {
    text: PropTypes.string, 
    icon: PropTypes.any, 
  };
 
  render() {
    return (
      <View style={styleSocial.container}> 
        <Image
          resizeMode='contain'
          style={[
            {
              height: 36,
              width: 36, 
              marginHorizontal: metrics.baseMargin,
              tintColor: this.props.color
            }
          ]} 
          source={this.props.icon}
        />
        <Text 
          style={[
            fonts.style.bold,
            fonts.style.normal,
          ]}
        >
          {this.props.text} 
        </Text>
      </View> 
    );
  }
};

const styleSocial = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: metrics.tinyMargin,
    marginRight: metrics.doubleBaseMargin,
    flexDirection: 'row',
    marginLeft: metrics.deviceWidth/4 - 36
  }
});
