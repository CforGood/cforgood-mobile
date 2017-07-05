import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Modal from '../../components/Modal/WidthRNModal';
import IconImage from '../../components/common/IconImage';
import Button from '../../components/common/Button';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class ConfirmPopup extends Component {

  static propTypes = {
    message: PropTypes.element.isRequired,
    ignore: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    visiblePopup: PropTypes.bool.isRequired,
  };


  render() {

    const {
      message,
      ignore,
      confirm,
      visiblePopup,
    } = this.props;

    return (
      <Modal
        onClose={() => { }}
        animationType={'none'}
        blurType={'dark'}
        blurAmount={1}
        visible={visiblePopup}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['transparent', 'rgba(0,0,0,0.2)']}
        >
          <View style={{
            backgroundColor: 'white',
            margin: metrics.doubleBaseMargin,
          }}>
            <View style={{ margin: metrics.doubleBaseMargin, }}>
              {
                message
              }
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
            >
              <Button
                type={'simple'}
                text={'Décliner'}
                styleText={{ color: colors.green }}
                styleButton={{ backgroundColor: 'white' }}
                height={40}
                onPress={ignore}
              />
              <Button
                type={'simple'}
                text={'Accepter'}
                styleText={{ color: colors.green }}
                height={40}
                styleButton={{ backgroundColor: 'white' }}
                onPress={confirm}
              />
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  }
}

export default ConfirmPopup;

