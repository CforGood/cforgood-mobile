// @flow
import React, { cloneElement, Component, PropTypes } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  findNodeHandle,
} from 'react-native';

import BlurView from '../blur';

export default class Modal extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired
  };


  state = {
    modalVisible: true,
    viewRef: 0
  };

  static defaultProps = {
    align: 'center',
    blurAmount: 2,
    blurType: 'dark',
    visible: false,
  };

  render() {
    const {
      blurAmount,
      blurType,
      style,
      onClose,
      visible,
    } = this.props;


    return (
      visible ?
      <View style={styles.blockout}>
        <BlurView 
          image={require('../../resources/images/blur.png')}
          overlayColor={blurType === 'dark' ?  'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)'}
          blurRadius={blurAmount}
          downsampleFactor={5}
          blurType={blurType}
          blurAmount={blurAmount}
        >
          <TouchableOpacity style={styles.blur} onPress={() => onClose()}>
            <View/>
          </TouchableOpacity>
          {this.props.children}
        </BlurView>
      </View>
      :
      null
    );
  }
}

const fillSpace = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

const styles = StyleSheet.create({
  blockout: {
    ...fillSpace,
  },
  blur: {
    ...fillSpace,
  },
  touchable: {
    flex: 1,
  },
});