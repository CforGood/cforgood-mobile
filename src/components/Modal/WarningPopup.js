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
    confirmText: PropTypes.string,
    confirm: PropTypes.func,
    ignore: PropTypes.func,
  };

  static defaultProps = {
    image: null,
    confirm: null,
    ignore: null,
    confirmText: '',
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
    } = this.props;

    return (
      <SimplePopup visiblePopup={visiblePopup}>
        <View />
        <View
          style={{
            margin: metrics.baseMargin,
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: metrics.deviceWidth * 4 / 5
          }}
        >
          <Text style={[
            fonts.style.t24,
            fonts.style.mediumBold,
            { textAlign: 'center' }
          ]}>
            {title}
          </Text>
          <Text style={[
            fonts.style.t15,
            fonts.style.mediumBold,
            { textAlign: 'center' }
          ]}>
            {message}
          </Text>
          <View style={{ padding: metrics.baseMargin }}>
            {
              image
            }
          </View>

          {
            confirm
            &&
            <ButtonGradiantRadius
              text={confirmText}
              onPress={confirm}
              style={{ margin: metrics.baseMargin }}
            />
          }
          <View>
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
        </View>
      </SimplePopup>
    );
  }
}

export default ConfirmPopup;
