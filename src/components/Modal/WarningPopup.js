import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../../components/common/Button';
import SimplePopup from './SimplePopup';
import ButtonGradiantRadius from '../../components/common/ButtonGradiantRadius'

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class ConfirmPopup extends Component {

  static propTypes = {
    title: PropTypes.element.isRequired,
    message: PropTypes.element.isRequired,
    image: PropTypes.element,
    visiblePopup: PropTypes.bool.isRequired,
    popupStyle: PropTypes.object,
    confirmText: PropTypes.string,
    buttomText: PropTypes.string,
    confirm: PropTypes.func,
    ignore: PropTypes.func,
  };

  static defaultProps = {
    image: null,
    confirm: null,
    ignore: null,
    confirmText: '',
    buttomText: null,
    popupStyle: {},
  };

  render() {

    const {
      title,
      message,
      image,
      ignore,
      confirm,
      visiblePopup,
      confirmText,
      buttomText,
      popupStyle,
    } = this.props;

    return (
      <SimplePopup visiblePopup={visiblePopup}>
        <View />
        <View
          style={{
            ...popupStyle,
            paddingHorizontal: metrics.baseMargin,
            paddingVertical: metrics.doubleBaseMargin,
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: metrics.deviceWidth * 4 / 5,
          }}
        >
          <View>
            <Text style={[
              fonts.style.t24,
              fonts.style.bold,
              { textAlign: 'center' }
            ]}>
              {title}
            </Text>
            <Text style={[
              fonts.style.t20,
              fonts.style.mediumBold,
              { textAlign: 'center' }
            ]}>
              {message}
            </Text>
          </View>
          <View style={{ padding: metrics.baseMargin }}>
            {
              image
            }
          </View>


          <View>
            {
              confirm
              &&
              <ButtonGradiantRadius
                text={confirmText}
                onPress={confirm}
                style={{ margin: metrics.baseMargin }}
              />
            }
            {
              ignore &&
              <Button
                type={'simple'}
                text={'Passer'}
                styleText={{
                  ...fonts.style.t16,
                  color: colors.ignore,
                }}
                styleButton={{ backgroundColor: 'white' }}
                height={40}
                onPress={ignore}
              />
            }
          </View>
          {
            buttomText &&
            <Text style={[
              fonts.style.t24,
              fonts.style.bold,
              {
                textAlign: 'center',
                marginBottom: metrics.doubleBaseMargin,
              }
            ]}>
              {buttomText}
            </Text>
          }

        </View>
      </SimplePopup>
    );
  }
}

export default ConfirmPopup;
