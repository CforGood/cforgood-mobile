import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import IconImage from '../../components/common/IconImage';
import Button from '../../components/common/Button';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class SimplePopup extends Component {

  static propTypes = {
    children: PropTypes.array.isRequired,
    visiblePopup: PropTypes.bool,
  };

  static defautProps = {
    visiblePopup: false,
    children: null,
  };

  render() {
    return (
      <Modal
        ref={modal => { this.modal = modal; }}
        onShow={() => { }}
        animationType={'fade'}
        transparent
        visible={this.props.visiblePopup}
        onRequestClose={() => { }}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['transparent', 'rgba(0,0,0,0.2)']}
            style={{
              margin: metrics.doubleBaseMargin,
            }}
          >
            <View style={{
              backgroundColor: 'white',
              marginHorizontal: 1,
              marginTop: 1,
              marginBottom: 2,
            }}>
              {this.props.children}
            </View>
          </LinearGradient>
        </View>
      </Modal>
    );
  }
}
