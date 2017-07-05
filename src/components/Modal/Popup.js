import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Like from '../../components/common/Like';
import Modal from '../../components/Modal/WidthRNModal';
import Separator from '../../components/common/Separator';
import IconImage from '../../components/common/IconImage';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class Popup extends Component {

  static propTypes = {
    typeSmall: PropTypes.bool,
    close: PropTypes.bool,
    icon: PropTypes.any,
    subTextIcon: PropTypes.element,
    iconBottom: PropTypes.any,
    title: PropTypes.element,
    subTitle: PropTypes.element,
    description: PropTypes.string,
    button: PropTypes.element,
    subButton: PropTypes.element,
    firstLink: PropTypes.element,
    secondLink: PropTypes.element
  };

  static defaultProps = {
    typeSmall: false,
    close: false,
    icon: null,
    iconBottom: null,
    title: null,
    subTitle: null,
    description: '',
    button: null,
    subButton: null,
    firstLink: null,
    secondLink: null,
    subTextIcon: null,
  };

  render() {

    const {
      typeSmall,
      close,
      icon,
      iconBottom,
      title,
      subTitle,
      description,
      button,
      subButton,
      subTextIcon
    } = this.props;

    return (
      <Modal
        onClose={() => { }}
        animationType={'none'}
        blurType={'dark'}
        blurAmount={3}
        visible={true}
      >
        <Image
          style={[
            style.popup,
            { height: typeSmall ? 180 : 400 }
          ]}
          source={require('../../resources/images/popup.png')}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
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
                padding: metrics.baseMargin,
              }
            ]}>
              {
                close &&
                <IconImage
                  width={30}
                  tintColor={colors.gray}
                  image={require('../../resources/icons/close-circular.png')}
                  iconStyle={{
                    position: 'absolute',
                    right: 0,
                    top: 0
                  }}
                  onPress={() => { }}
                />
              }
              <View style={{
                flex: 1,
                alignItems: 'center',
                marginTop: metrics.baseMargin,
              }}>
                {
                  icon !== null &&
                  <IconImage
                    width={80}
                    image={icon}
                  />
                }
                {
                  title !== null &&
                  title
                }
                {
                  subTitle !== null &&
                  subTitle
                }
                {
                  description !== "" &&
                  <Text style={[
                    fonts.style.t13,
                    {
                      marginVertical: metrics.baseMargin, 
                    }
                  ]}
                  >
                    {description}
                  </Text>
                }
                {
                  iconBottom !== null &&
                  <IconImage
                    width={80}
                    image={iconBottom}
                  />
                }
                  {
                    subTextIcon !== null &&
                    subTextIcon
                  }
                <View style={[
                  subButton !== null ? {} : styles.row ,
                  { marginTop: metrics.doubleBaseMargin }
                ]}>

                  {
                    button
                  }
                  {
                    subButton
                  }
                </View> 
              </View>
            </View>
          </LinearGradient>
        </Image>
      </Modal>
    );
  }
}

export default Popup;

const style = {
  popup: {
    width: metrics.deviceWidth - metrics.marginApp * 2,
    left: metrics.marginApp,
    //top: (metrics.deviceHeight - metrics.deviceHeight/1.5) /2,
  },
  picture: {
    height: 170,
  }
}; 
