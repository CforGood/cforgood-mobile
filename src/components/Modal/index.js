// @flow
import React, { cloneElement, Component, } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Modal as RNModal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  findNodeHandle,
} from 'react-native';


import BlurView from '../blur';

function animateToValueWithOptions(val) {
  return {
    toValue: val,
    friction: 10,
    tension: 100,
  };
}

const MODAL_ALIGNMENT = {
  bottom: 'flex-end',
  top: 'flex-start',
  center: 'center',
};

export default class Modal extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    animationType: PropTypes.string,
    blurType: PropTypes.string,
    blurAmount: PropTypes.number,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    align: 'center',
    blurAmount: 2,
    blurType: 'dark',
    visible: false,
    onClose: () => { },
  };

  state = {
    modalVisible: true,
    viewRef: 0
  };

  onShowModal = () => {
    this.setState({ viewRef: findNodeHandle(this.modal) })
  }

  render() {
    const {
      animationType,
      blurAmount,
      blurType,
      style,
      viewRef,
      onClose,
      image,
    } = this.props;

    return (
      <RNModal
        ref={modal => { this.modal = modal; }}
        onShow={this.onShowModal}
        animationType={animationType}
        transparent
        visible={this.props.visible}
        onRequestClose={onClose}
      >
        <BlurView
          image={
            image ? { uri: image } : require('../../resources/images/blur.png')
          }
          overlayColor={blurType === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)'}
          blurRadius={blurAmount}
          downsampleFactor={5}
          blurType={blurType}
          blurAmount={blurAmount}
        >
          <TouchableOpacity style={styles.blur} onPress={onClose}>
            <View />
          </TouchableOpacity>
          {
            this.props.children
          }
        </BlurView>
      </RNModal>
    );
  }
}

const fillSpace = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)'
};

const styles = StyleSheet.create({

  blur: {
    ...fillSpace,
  },
  touchable: {
    flex: 1,
  },
});