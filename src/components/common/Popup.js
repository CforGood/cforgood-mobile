import React, {
  PropTypes,
  PureComponent,
} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Back from '../common/Back';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

import Button from './ButtonGradient';
import Like from './Like';
import Separator from './Separator';
import ButtonGradient from './ButtonGradient';

class PopupScreen extends PureComponent {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onValidate: PropTypes.func,
    bgImage: PropTypes.any,
    icon: PropTypes.any,
    bigtitle: PropTypes.string,
    smalltitle: PropTypes.string,
    description: PropTypes.any,
    textButton: PropTypes.string,
    iconButton: PropTypes.any,
  };

  static defaultProps = {
    onClose: () => { },
    bigtitle: '',
    smalltitle: '',
    description: '',
    textButton: null,
    iconButton: null,
    bgImage: null,
    onValidate: () => { },
  };


  render() {
    const {
      onClose,
      icon,
      iconButton,
      textButton,
      description,
      bgImage,
      bigtitle,
      smalltitle,
      onValidate
    } = this.props;

    return (
      <Image
        style={stylePopupScreen.popup}
        source={require('../../resources/images/popup.png')}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={colors.gradientColor}
          style={[
            {
              flex: 1,
              padding: 2,
            }
          ]}
        >
          <View style={[
            styles.screen.mainContainer,
            {
              paddingHorizontal: metrics.marginApp,
            }
          ]}
          >
            {
              <View
                style={[
                  styles.screen.overlay,
                  styles.center
                ]}
              >
                {bgImage !== null && bgImage}
              </View>
            }
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'transparent',
                flex: 1,
              }}
            >
              <Image
                resizeMode='contain'
                style={[
                  styles.center,
                  stylePopupScreen.picture
                ]}
                source={icon}
              />
              <Text style={[
                fonts.style.bold,
                {
                  fontSize: 22,
                  marginVertical: metrics.baseMargin
                }
              ]}
              >
                {bigtitle}
              </Text>
              <Text style={[
                fonts.style.t16,
                fonts.style.bold,
                {
                  marginVertical: metrics.baseMargin,
                  textAlign: 'center',
                  fontSize: 18,
                }
              ]}
              >
                {smalltitle}
              </Text>
              <Text style={[
                fonts.style.t16,
                {
                  marginVertical: metrics.baseMargin,
                  textAlign: 'center',
                }
              ]}
              >
                {description}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={stylePopupScreen.black}
            >
              <Image
                resizeMode={'contain'}
                style={{
                  height: 36,
                  width: 36,
                  tintColor: colors.darkGray,
                }}
                source={require('../../resources/icons/close-circular-button-of-a-cross-white.png')}
              />
            </TouchableOpacity>

            {
              textButton ?
                <View
                  style={{
                    marginVertical: metrics.baseMargin
                  }}
                >
                  <ButtonGradient
                    onPress={onValidate}
                    text={
                      textButton
                    }
                    styleButton={{
                      height: 44,
                      borderRadius: 22,
                      justifyContent: 'center',
                    }}
                    style={{
                      height: 44,
                      borderRadius: 22,
                      justifyContent: 'center',
                    }}
                    iconGradient={
                      iconButton &&
                      <Image
                        source={iconButton}
                        style={{
                          height: 25,
                          width: 38,
                          tintColor: 'white'
                        }}
                        resizeMode={'contain'}
                      />
                    }
                  />
                </View>
                :
                <View
                  style={{
                    alignItems: 'center',
                    marginVertical: metrics.baseMargin
                  }}
                >
                  <Image
                    style={{
                      width: 92,
                      height: 92,
                    }}
                    resizeMode='contain'
                    source={require('../../resources/images/logo.png')}
                  />
                </View>
            }
          </View>
        </LinearGradient>
      </Image>
    );
  }
}

export default PopupScreen;

const stylePopupScreen = {
  popup: {
    width: Math.min(320, metrics.deviceWidth - metrics.marginApp * 2),
    height: Math.min(429, metrics.deviceHeight * 0.75),
    //left: metrics.marginApp,
  },
  picture: {
    height: 100,
    width: 100,
    marginVertical: metrics.doubleBaseMargin,
  },
  black: {
    position: 'absolute',
    right: metrics.marginApp,
    top: metrics.marginApp
  },
}; 
