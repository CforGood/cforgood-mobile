import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Alert,
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
    visiblePopupConfirm: false,
  };

  enableNotification() {
    Permissions.getPermissionStatus('notification')
      .then(response => {
        if (response !== 'authorized') {
          this._requestPermission();
        }
        else {
          this.props.scroll();
        }
      }).catch(e => this.error(e));
  }

  _requestPermission = () => {
    Permissions.requestPermission('notification')
      .then(response => {
        if (String(response) !== 'authorized') {
          Permissions.openSettings
        }
        else {
          this.props.scroll();
        }
      }).catch(e => this.error(e))
  }

  error(e) {
    this.setState({error: e});
  }

  ignore = () => {
    this.props.scroll();
    this.setState({
      visiblePopupConfirm: false,
    });
  }

  confirm = () => {
    this.enableNotification();
    this.setState({
      visiblePopupConfirm: false,
    });
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <ErrorView message={this.state.error} />
        <OnboardingDetail
          source={require('../../resources/onboarding/2.png')}
          icon={require('../../resources/onboarding/bons_plan.png')}
          text={(<View>
            <Text style={style.text}>
              Bénéficiez des <Text style={fonts.style.mediumBold}>bons plans</Text>
            </Text>
            <Text style={style.text}>
              qu’ils proposent ...
            </Text>
          </View>)}
          textButton={'M’informer'}
          onPress={() => this.setState({ visiblePopupConfirm: true })}
        />
        <ConfirmPopup
          visiblePopup={this.state.visiblePopupConfirm}
          message={(<Text style={style.message}>
            Autoriser <Text style={[
              fonts.style.mediumBold,
              { color: colors.darkGray }
            ]}>CforGood</Text> à vous envoyer des notifications ?
          </Text>)}
          ignore={this.ignore}
          confirm={this.confirm}
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
