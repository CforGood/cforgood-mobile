import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import {
  styles, 
  fonts,
  metrics,
} from '../../themes';

class BusinessDistance extends PureComponent {

  static propTypes = {
    color: PropTypes.string.isRequired,
    distance: PropTypes.string
  };

  render() {
    return (
      <View style={[
          styles.row,
          {alignItems: 'center'}
        ]}
      >
        <Image
          resizeMode='contain'
          style={[
            {
              height: 25,
              width: 25,
              tintColor: this.props.color,
              marginRight: 2
            }
          ]} 
          source={require('../../resources/icons/placeholder.png')}
        />

        <Text 
          style={[
            fonts.style.bold,
            fonts.style.normal,
          ]}
        >
          {this.props.distance}
        </Text>
      </View> 
    );
  }
};



export default BusinessDistance;
