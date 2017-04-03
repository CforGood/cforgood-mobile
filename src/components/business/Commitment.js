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

export default class Commitment extends PureComponent {

  static propTypes = {
    name: PropTypes.string,
    index: PropTypes.number,
  };
 
  render() {
    return (
      <View style={[
          styleCommitment.container,
          {justifyContent: this.props.index%2 ? 'flex-end' : 'flex-start'}
        ]}
      > 
        <Image
          resizeMode='contain'
          style={styleCommitment.image} 
          source={require('../../resources/icons/hand-like.png')}
        />  
        <Text 
          style={[
            fonts.style.bold,
            fonts.style.normal,
          ]}
        >
          {this.props.name} 
        </Text> 
      </View> 
    );
  }
};

const styleCommitment = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (metrics.deviceWidth)/2 - metrics.marginApp,
    marginVertical: metrics.smallMargin,
  },
  image: {
    height: metrics.deviceWidth/20,
    width: metrics.deviceWidth/20, 
    marginRight: metrics.smallMargin,
  }
});
