import PropTypes from 'prop-types';
import React, { PureComponent, } from 'react';

import {
  Text,
  Modal,
} from 'react-native';
import Spinner from 'react-native-spinkit';

import {
  styles,
  fonts,
  colors,
} from '../../themes';
import Background from './Background';

export default class ModalLoading extends PureComponent {

  static propTypes = {
    loading: PropTypes.bool,
    title: PropTypes.string,
  };

  static defaultProps = {
    loading: false,
    title: '',
  };

  render() {
    const { loading, title } = this.props;
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={loading}
        onRequestClose={() => { }}
      >
        <Background
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin:0
          }}
        >
          <Text style={{
            ...fonts.style.t22,
            color: colors.white,
          }}>
            {title}
          </Text>
          <Spinner
            style={{
              marginBottom: 40,
            }}
            isVisible={loading}
            size={100}
            type={'ThreeBounce'}
            color={'#FFFFFF'}
          />
        </Background>
      </Modal>
    );
  }
}