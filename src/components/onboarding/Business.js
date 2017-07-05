import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Alert,
} from 'react-native';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import OnboardingDetail from './OnboardingDetail';
import ConfirmPopup from '../Modal/ConfirmPopup';


import {
  colors,
  fonts,
  metrics,
} from '../../themes';
import { onUpdateUserLocation } from '../../redux/actions/user';

class Business extends PureComponent {

  state = { visiblePopup: false };

  enableLocation() {
    Permissions.getPermissionStatus('location')
      .then(response => {
        if (response !== 'authorized') {
          this._requestPermission();
        }
        else {
          this.verify();
        }
      }).catch(e => this.notifyAutorize());
  }

  _requestPermission = () => {
    Permissions.requestPermission('location')
      .then(response => {
        if (String(response) !== 'authorized') {
          Permissions.openSettings
        }
        else {
          this.verify();
        }
      }).catch(e => this.notifyAutorize())
  }

  verify() {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position && position.coords) {
        this.props.onUpdateUserLocation(position);
        this.props.scroll();
      }
    }, (error) => {
      this.notifyAutorize();
    },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 3000,
      }
    )
  }

  notifyAutorize() {
    Alert.alert(
      'Erreur',
      "Activé le GPS !",
      [
        { text: 'Fermer', onPress: () => { } },
      ]
    );

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <OnboardingDetail
          source={require('../../resources/onboarding/1.png')}
          icon={require('../../resources/onboarding/commerce.png')}
          text={(<View>
            <Text style={style.text}>
              Trouvez les <Text style={fonts.style.mediumBold}>meilleurs</Text>
            </Text>
            <Text style={style.text}>
              <Text style={fonts.style.mediumBold}>commerces</Text> autour de vous
            </Text>
          </View>)}
          textButton={'Me localiser'}
          onPress={() => this.setState({ visiblePopup: true })}
        />
        <ConfirmPopup
          visiblePopup={this.state.visiblePopup}
          message={(<Text style={style.message}>
            Autoriser <Text style={[
              fonts.style.mediumBold,
              { color: colors.darkGray }
            ]}>CforGood</Text> à accéder
          à la position de cet appareil ?
          </Text>)}
          ignore={() => {
            this.props.scroll();
            this.setState({ visiblePopup: false });
          }}
          confirm={() => {
            this.enableLocation()}
            this.setState({ visiblePopup: false });
          }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onUpdateUserLocation: bindActionCreators(onUpdateUserLocation, dispatch),
});

export default connect(null, mapDispatchToProps)(Business);

const style = {
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
