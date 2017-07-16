import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Alert,
  Image,
} from 'react-native';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import ConfirmPopup from '../Modal/ConfirmPopup';
import WarningPopup from '../Modal/WarningPopup';


import {
  colors,
  fonts,
  metrics,
  styles,
} from '../../themes';
import { onUpdateUserLocation } from '../../redux/actions/user';

class AuthorizeLocation extends PureComponent {

  state = {
    visiblePopupConfirm: false,
    visiblePopupWarning: false,
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.verify !== nextProps.verify
      && nextProps.verify
    ) {
      this.setState({
        visiblePopupConfirm: true
      });
    }
  }

  enableLocation = () => {
    Permissions.getPermissionStatus('location')
      .then(response => {
        if (response !== 'authorized') {
          this._requestPermission();
        }
        else {
          this.verify();
        }
      }).catch(e => this.notifyAutorize(e));
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
      }).catch(e => this.notifyAutorize(e))
  }

  verify() {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position && position.coords) {
        this.props.onUpdateUserLocation(position, true);
        this.props.nextStep();
      }
    }, (error) => {
      this.notifyAutorize(error);
    },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 3000,
      }
    );
  }

  notifyAutorize(error) {
    this.props.handleError(error.message);
  }

  ignoreConfirm = () => {
    this.setState({ visiblePopupConfirm: false }, () => {
      this.setState({
        visiblePopupWarning: true
      });
    });
  }

  ignore = () => {
    this.props.nextStep();
    this.setState({
      visiblePopupConfirm: false,
      visiblePopupWarning: false,
    });
  }

  openConfirm = () => {
    this.setState({ visiblePopupWarning: false }, this.setState({
      visiblePopupConfirm: true
    }));
  }

  confirm = () => {
    this.enableLocation();
    this.setState({
      visiblePopupConfirm: false,
      visiblePopupWarning: false,
    });
  }


  render() {
    return (
      <View style={styles.screen.overlay}>
        <ConfirmPopup
          visiblePopup={this.state.visiblePopupConfirm}
          message={(<Text style={style.message}>
            Autoriser <Text style={[
              fonts.style.mediumBold,
              { color: colors.darkGray }
            ]}>CforGood</Text> à accéder
          à la position de cet appareil ?
          </Text>)}
          ignore={this.ignoreConfirm}
          confirm={this.confirm}
        />
        <WarningPopup
          visiblePopup={this.state.visiblePopupWarning}
          title={
            (
              <Text>
                Vous êtes sûr ?
              </Text>
            )
          }
          message={
            (
              <Text>
                Nous devons vous localiser pour vous permettre de trouver les meilleurs commerces autour de vous !
              </Text>
            )
          }
          ignore={this.ignore}
          confirm={this.confirm}
          image={(
            <Image
              source={require('../../resources/onboarding/map.png')}
              style={{
                height: 70,
              }}
              resizeMode={'contain'}
            />
          )}
          confirmText={'Me localiser'}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onUpdateUserLocation: bindActionCreators(onUpdateUserLocation, dispatch),
});

export default connect(null, mapDispatchToProps)(AuthorizeLocation);

const style = {
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
