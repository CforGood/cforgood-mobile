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
    visiblePopupWarning: false,
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.verify !== nextProps.verify
      && nextProps.verify
    ) {
      this.confirm();
    }
  }

  enableLocation = () => {
    Permissions.getPermissionStatus('location')
      .then(response => {
        if (response === 'authorized') {
          this.props.nextStep();
          this.updateLocation();
        }
        else {
          this._requestPermission();
        }
      }).catch(e => this.notifyAutorize(e));
  }

  _requestPermission = () => {
    Permissions.requestPermission('location')
      .then(response => {
        if (String(response) !== 'authorized') {
          if (response === 'denied') {
            this.setState({
              visiblePopupWarning: true
            });
          }
          else {
            Permissions.openSettings;
          }
        }
        else {
          this.props.nextStep();
          this.updateLocation();
        }
      }).catch(e => this.notifyAutorize(e))
  }

  updateLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position && position.coords) {
        this.props.onUpdateUserLocation(position);
        //this.props.nextStep();
      }
    }, (error) => {
      //this.props.nextStep();
      //this.notifyAutorize(error);
    },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 3000,
      }
    );
  }

  notifyAutorize = (error) => {
    this.props.handleError('Vous avez réfuser l\'accès . on peut pas accéder au settings');
  }

  ignoreConfirm = () => {
    this.setState({
      visiblePopupWarning: true
    });
  }

  ignore = () => {
    this.props.nextStep();
    this.setState({
      visiblePopupWarning: false,
    });
  }

  openConfirm = () => {
    this.setState({ visiblePopupWarning: false });
  }

  confirm = () => {
    this.enableLocation();
    this.setState({
      visiblePopupWarning: false,
    });
  }


  render() {
    return (
      <View style={styles.screen.overlay}>
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
