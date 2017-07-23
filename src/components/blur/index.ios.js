/**
 *  Android  / react-native-blur
 */
'use strict';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  Animated,
  StyleSheet
} from 'react-native';


import { BlurView } from 'react-native-blur';

class Blur extends PureComponent {

  static propTypes = {
    blurType: PropTypes.string.isRequired,
    overlayColor: PropTypes.string.isRequired,
    blurAmount: PropTypes.number.isRequired
  };

  static defaultProps = {
    blurType: 'light',
  };

  render() {
    return (

      <BlurView
        blurType={this.props.blurType}
        overlayColor={this.props.overlayColor}
        blurAmount={this.props.blurAmount}
        style={style.blurView}
      >
        {this.props.children}
      </BlurView>
    );
  }
}

export default Blur;


const style = StyleSheet.create({
  blurView: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
  },
});