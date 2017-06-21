import React, {
  PureComponent,
  PropTypes,
} from 'react';

import {
  Text,
  View,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

import Separator from '../common/Separator';
import ButtonGradient from '../common/ButtonGradient';

class OnboardingDetail extends PureComponent {

  static propTypes = {
    text: PropTypes.element,
    title: PropTypes.element,
    source: PropTypes.node.isRequired,
    textButton: PropTypes.string,
    cta: PropTypes.func,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    text: null,
    index: 0,
    textButton: null,
    cta: null,
    title: null,
    onPress: () => { }
  };

  state = {
    offset: new Animated.Value(0)
  };

  render() {
    const {
      textButton,
      cta,
      icon,
      title,
      onPress, } = this.props;
    return (
      <Animated.View
        style={[
          styles.screen.overlay,
          {
            alignItems: 'center',
            transform: [
              {
                translateX: this.state.offset
              }
            ]
          }
        ]}
      >
        <Image
          style={{
            marginTop: metrics.marginApp * 4,
            marginBottom: metrics.marginApp * 2,
            height: metrics.deviceHeight - metrics.marginApp * 6,
          }}
          source={this.props.source}
          resizeMode={'contain'}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
            colors={['rgba(255,255,255,0)', 'white']}
            style={{ flex: 1.2 }}
          />
          <View style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'space-between',
            paddingTop: metrics.doubleBaseMargin,
          }} >
            <View style={styles.center}>
              {
                icon &&
                <Image
                  style={{
                    height: 60,
                  }}
                  source={icon}
                  resizeMode={'contain'}
                />
              }
              {
                title
              }
            </View>
            <View style={styles.center}>
              {this.props.text}
            </View>
            <View style={styles.center}>
              {
                textButton &&
                <ButtonGradient
                  onPress={onPress}
                  text={
                    this.props.textButton
                  }
                  styleButton={{
                    height: 44,
                    borderRadius: 22,
                    justifyContent: 'center',
                    paddingHorizontal: 15,
                  }}
                  style={{
                    height: 44,
                    borderRadius: 22,
                    justifyContent: 'center',
                  }}
                />
              }
              {
                cta &&
                <TouchableOpacity
                  onPress={cta}
                  style={{
                    height: 60,
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    style={{
                      height: 60,
                    }}
                    source={require('../../resources/onboarding/right-arrow.png')}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              }
            </View>
          </View>
        </Image>
      </Animated.View>
    )
  }
};

export default OnboardingDetail;
