import React, { Component,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../../components/common/Button';
import SimplePopup from './SimplePopup';

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
      <SimplePopup visiblePopup={visiblePopup}>
        <View style={{ margin: metrics.doubleBaseMargin, }}>
          {
            message
          }
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: metrics.doubleBaseMargin,
        }}
        >
          <Button
            type={'simple'}
            text={'Décliner'}
            styleText={{
              ...fonts.style.t16,
              color: colors.green,
            }}
            styleButton={{ backgroundColor: 'white' }}
            height={40}
            onPress={ignore}
          />
          <Button
            type={'simple'}
            text={'Accepter'}
            styleText={{
              ...fonts.style.t16,
              color: colors.green,
            }}
            height={40}
            styleButton={{ backgroundColor: 'white' }}
            onPress={confirm}
          />
        </View>
      </SimplePopup>
    );
  }
}

export default ConfirmPopup;

