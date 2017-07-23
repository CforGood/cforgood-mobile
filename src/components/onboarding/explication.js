// @flow
import React, { Component,  } from 'react'; import PropTypes from 'prop-types';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';


export default class Modal extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    visible: false,
  };

  render() {
    const {
      visible,
    } = this.props;

    return (
      <RNModal
        ref={modal => { this.modal = modal; }}
        onShow={() => { }}
        animationType={'slide'}
        transparent
        visible={visible}
        onRequestClose={() => { }}
      >
        <View style={{ flex: 1 }} />
      
      </RNModal>
    );
  }
}
