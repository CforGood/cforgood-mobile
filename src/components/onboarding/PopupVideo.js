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
import Video from '../video/videoView';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class PopupVideo extends Component {
  state = {
    play: false
  };

  static propTypes = {
    visiblePopup: PropTypes.bool,
    play: PropTypes.func.isRequired,
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
        <Video
          play={this.state.play}
          stopPlay={() => this.setState({ play: false })}
        />
        <View style={{ flex: 1 }} />
        <Background style={{ flex: 5 }}>
          <View
            style={{
              marginVertical: metrics.doubleBaseMargin,
              marginHorizontal: metrics.marginApp,
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <View style={{
              paddingTop: metrics.baseMargin,
            }}>
              <Image
                source={require('../../resources/onboarding/light-bulb.png')}
                style={{
                  height: 100,
                }}
                resizeMode={'contain'}
              />
            </View>
            <Text style={[
              fonts.style.t25,
              fonts.style.mediumBold,
              { textAlign: 'center', color: 'white' }
            ]}>
              C’est compris ?
            </Text>
            <Text style={[
              fonts.style.t20,
              fonts.style.mediumBold,
              { textAlign: 'center', color: 'white' }
            ]}>
              CforGood expliqué en video, rien que pour vous !
            </Text>

            <View style={{ padding: metrics.baseMargin }}>
              <Icon
                onPress={() => this.setState({ play: true })}
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
                onPress={this.props.goToNextPage}
              />
            </View>
          </View>
        </Background>
      </Modal>
    );
  }
}

export default PopupVideo;
