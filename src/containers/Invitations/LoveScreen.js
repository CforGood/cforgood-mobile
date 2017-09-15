import React, { Component, } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Permissions from 'react-native-permissions';

import Background from '../../components/common/Background';
import Icon from '../../components/common/Icon';
import ConfirmPopup from '../../components/Modal/ConfirmPopup';
import WarningPopup from '../../components/Modal/WarningPopup';
import ErrorView from '../../components/common/ErrorView';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class LoveScreen extends Component {
  state = {
    visiblePopupWarning: false,
    authorized: false,
    error: '',
  };

  componentWillMount() {
    Permissions.getPermissionStatus('contacts')
      .then(response => {
        if (response === 'authorized') {
          this.setState({ authorized: true });
        }
      });
  }

  enableContacts() {
    Permissions.getPermissionStatus('contacts')
      .then(response => {
        if (response !== 'authorized') {
          this._requestPermission();
        }
        else {
          this.props.navigation.navigate('InvitationContacts');
        }
      }).catch(e => this.error(e));
  }

  _requestPermission = () => {
    Permissions.requestPermission('contacts')
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
          this.props.navigation.navigate('InvitationContacts');
        }
      }).catch(e => this.error(e))
  }

  error(e) {
    this.setState({ error: JSON.stringify(e) });
  }

  openConfirm = () => {
    if (!this.state.authorized) {
      this.enableContacts();
    }
    else {
      this.props.navigation.navigate('InvitationContacts');
    }
  }

  ignoreConfirm = () => {
    this.setState({ visiblePopupWarning: true });
  }


  render() {
    return (
      <Background
        style={{
          flex: 1,
        }}
      >
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
        <View style={{
          flex: 1,
          paddingVertical: metrics.base * 2,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        >
          <Text style={[style.title, fonts.style.bold]}>
            Envoyez du love !
          </Text>
          <Icon
            styleImage={{
              width: 100,
              height: 108,
            }}
            source={require('../../resources/icons/love.png')}
            onPress={() => { }}
          />
          <View >
            <Text style={style.text}>
            Offrez à vos amis <Text style={fonts.style.bold}>1 mois gratuit</Text>
            </Text>
            <Text style={style.text}> sur CforGood !</Text>
          </View>

          <Text style={[
            style.smallText,
          ]}>
            Et bénéficiez de <Text style={fonts.style.bold}>3 mois offerts !</Text>
          </Text>
          <Icon
            styleImage={{
              width: 60,
              height: 60,
              tintColor: 'white'
            }}
            source={require('../../resources/icons/arrow-right.png')}
            onPress={this.openConfirm}
            borderColor={colors.transparent}
          />
        </View>
        <WarningPopup
          visiblePopup={this.state.visiblePopupWarning}
          title={
            (
              <Text>
                Oh vraiment ? :-(
              </Text>
            )
          }
          message={
            (
              <Text>
                Ne vous privez pas de faire plaisir et d’envoyer
                des bonnes nouvelles !
              </Text>
            )
          }
          ignore={this.ignore}
          confirm={this.confirm}
          source={(
            <Image
              source={require('../../resources/icons/hand-ok.png')}
              style={{
                height: 83,
                width: 63,
              }}
              resizeMode={'contain'}
            />
          )}
          confirmText={'Autoriser'}
        />
      </Background>
    );
  }
}

const style = StyleSheet.create({
  title: {
    ...fonts.style.t25,
    color: colors.white,
    textAlign: 'center'
  },
  text: {
    ...fonts.style.t22,
    color: colors.white,
    textAlign: 'center'
  },
  smallText: {
    ...fonts.style.t20,
    color: colors.white,
    textAlign: 'center'
  },
  message: {
    ...fonts.style.t16,
    color: colors.textPoppup,
    textAlign: 'center',
  }

});   
