import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Permissions from 'react-native-permissions';

import OnboardingDetail from './OnboardingDetail';
import ConfirmPopup from '../Modal/ConfirmPopup';
import ErrorView from '../common/ErrorView';

import {
  colors,
  fonts,
  metrics,
} from '../../themes';


export default class Perk extends PureComponent {

  state = {
    error: '',
  };

  enableNotification() {
    if (Platform.OS === 'ios') {

      Permissions.getPermissionStatus('notification')
        .then(response => {
          if (response !== 'authorized') {
            this._requestPermission();
          }
          else {
            this.props.scroll();
          }
        }).catch(e => this.error(e));
    } else {
      this.props.scroll();
    }

  }

  _requestPermission = () => {
    Permissions.requestPermission('notification')
      .then(response => {
        if (String(response) !== 'authorized') {
          if (response === 'denied') {
            this.props.scroll();
          }
          else {
            Permissions.openSettings;
          }

        }
        else {
          this.props.scroll();
        }
      }).catch(e => this.error(e))
  }

  error = (e) => {
    this.setState({ error: e });
  }

  ignore = () => {
    this.props.scroll();
  }

  confirm = () => {
    this.enableNotification();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
        <OnboardingDetail
          source={require('../../resources/onboarding/2.png')}
          icon={require('../../resources/onboarding/bons_plan.png')}
          text={(<View style={{ width: metrics.deviceWidth * 3 / 4 }}>
            <Text style={style.text}>
              Bénéficiez des <Text style={fonts.style.mediumBold}>bons plans</Text>
            </Text>
            <Text style={style.text}>
              qu’ils proposent ...
            </Text>
          </View>)}
          textButton={'M’informer'}
          onPress={() => this.confirm()}
        />
      </View>
    );
  }
}

var style = {
  text: {
    ...fonts.style.t20,
    textAlign: 'center',
  },
  message: {
    ...fonts.style.t16,
    color: colors.textPoppup,
    textAlign: 'center',
  }
};
