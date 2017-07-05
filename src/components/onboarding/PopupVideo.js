import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';


import Background from '../common/Background';
import Icon from '../common/Icon';
import Button from '../common/Button';


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

  };

  render() {
    return (
      <Modal
        ref={modal => { this.modal = modal; }}
        onShow={() => { }}
        animationType={"slide"}
        transparent
        visible={this.props.visiblePopup}
        onRequestClose={() => { }}
      >
        <View style={{ flex: 1 }} />
        <Background style={{ flex: 5 }}>
          <View
            style={{
              margin: metrics.baseMargin,
              marginHorizontal: metrics.marginApp,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ padding: metrics.baseMargin }}>
              <Image
                source={require('../../resources/onboarding/light-bulb.png')}
                style={{
                  height: 100,
                }}
                resizeMode={'contain'}
              />
            </View>
            <Text style={[
              fonts.style.t24,
              fonts.style.mediumBold,
              { textAlign: 'center', color: 'white' }
            ]}>
              C’est compris ?
            </Text>
            <Text style={[
              fonts.style.t15,
              fonts.style.mediumBold,
              { textAlign: 'center', color: 'white' }
            ]}>
              CforGood expliqué en video, rien que pour vous !
            </Text>

            <View style={{ padding: metrics.baseMargin }}>
              <Icon
                onPress={() => { }}
                source={require('../../resources/icons/play.png')}
                style={{
                  height: 53,
                  width: 53,
                }}
                styleImage={{
                  height: 53,
                  width: 53
                }}
              />
            </View>
            <View>
              <Button
                type={'simple'}
                text={'Passer'}
                styleText={{
                  ...fonts.style.t16,
                  color: colors.white,
                }}
                styleButton={{ backgroundColor: 'transparent' }}
                height={40}
                onPress={() => { }}
              />
            </View>
          </View>
        </Background>

      </Modal>
    );
  }
}
