import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Alert,
} from 'react-native';
import Permissions from 'react-native-permissions';

import OnboardingDetail from './OnboardingDetail';
import ConfirmPopup from '../Modal/ConfirmPopup';

import {
  colors,
  fonts,
  metrics,
} from '../../themes';


export default class Business extends PureComponent {

  state = {
    visiblePopup: false
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
    Alert.alert(
      'Erreur',
      e.message,
      [
        { text: 'Fermer', onPress: () => { } },
      ]
    );

  }

  render() {
    return (
      <View>
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
          onPress={() => this.setState({ visiblePopup: true })}
        />
        <ConfirmPopup
          visiblePopup={this.state.visiblePopup}
          message={(<Text style={style.message}>
            Autoriser <Text style={[
              fonts.style.mediumBold,
              { color: colors.darkGray }
            ]}>CforGood</Text> à vous envoyer des notifications ?
          </Text>)}
          ignore={() => {
            this.props.scroll();
            this.setState({ visiblePopup: false });
          }}
          confirm={() => {() => {
            this.enableNotification()}
            this.setState({ visiblePopup: false });
          }}
        />
      </View>
    );
  }
}

var style = {
  text: {
    ...fonts.style.t22,
    textAlign: 'center',
  },
  message: {
    ...fonts.style.t16,
    color: colors.textPoppup,
    textAlign: 'center',
  }
};
