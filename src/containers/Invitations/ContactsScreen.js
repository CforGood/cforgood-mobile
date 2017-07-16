import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Image,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Background from '../../components/common/Background';
import Icon from '../../components/common/Icon';
import WarningPopup from '../../components/Modal/WarningPopup';
import ButtonRadius from '../../components/common/ButtonRadius';
import Header from '../../components/invitation/Header';
import HeaderTextInput from '../../components/invitation/HeaderTextInput';
import ContactItem from '../../components/invitation/ContactItem';
import SeparatorInvitation from '../../components/invitation/SeparatorInvitation';
import { siginSuccess } from '../../redux/actions/auth';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

const NUMBER_INVITATION = 5;

class ContactsScreen extends Component {
  state = {
    contacts: [],
    invitations: [],
    visiblePopupConfirm: false,
    visiblePopupWarning: false,
  };

  _keyExtractor = (item) => item.recordID;

  componentWillMount() {
    this.checkPermission();
  }

  checkPermission = () => {
    Contacts.checkPermission((err, permission) => {

      if (permission === 'undefined') {
        Contacts.requestPermission((err, permission) => {
          // ...
        })
      }
      if (permission === 'authorized') {
        this.getContacts();
      }
      if (permission === 'denied') {
        // x.x
      }
    })
  }

  getContacts = () => {
    Contacts.getAll((err, contacts) => {
      //update the first record
      console.log('contacts', contacts);
      this.setState({ contacts });

    })
  }

  sendInvitation = (item) => {

    this.setState((oldState) => ({
      invitations: [
        ...oldState.invitations, // copy old data
        item // toggle
      ]
    }));
  }

  validate = () => {
    if (this.state.invitations.length < NUMBER_INVITATION) {
      this.setState({ visiblePopupWarning: true });
    } else {
      this.setState({ visiblePopupConfirm: true });
      setTimeout(() => {
        this.setState({ visiblePopupConfirm: false },
          () => this.props.siginSuccess()
        );
      }, 1000);

    }
  }

  confirm = () => {

  }

  ignore = () => {
    this.setState({ visiblePopupWarning: false },
      () => this.props.siginSuccess()
    );
  }

  render() {
    return (
      <Background
        style={{
          flex: 1,
        }}
      >
        <View style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 55,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}>
          <ButtonRadius
            text={'C’est parti !'}
            styleButton={{
              width: 180
            }}
            styleText={{
              color: colors.darkGray,
            }}
            onPress={this.validate}
          />
        </View>

        <View
          style={{
            height: (Platform.OS === 'ios' ? 20 : 10) + 75,
            paddingHorizontal: metrics.marginApp,
            paddingTop: Platform.OS === 'ios' ? 20 : 10,
            paddingBottom: 10,
          }}
        >
          <Header
            number={this.state.invitations.length}
            numberInvitaion={NUMBER_INVITATION}
          />
        </View>

        <SeparatorInvitation
          number={this.state.invitations.length}
          numberInvitaion={NUMBER_INVITATION}
        />

        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.contacts}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <ContactItem
                item={item}
                sendInvitation={this.sendInvitation}
              />)}
          />
        </View>
        <WarningPopup
          popupStyle={{
            minWidth: metrics.deviceWidth * 4 / 5,
            minHeight: metrics.deviceHeight * 1 / 2,
          }}
          visiblePopup={this.state.visiblePopupConfirm}
          title={
            (
              <Text>
                Félicitations {
                  this.props.user.first_name.length > 10 ?
                    '\n' + this.props.user.first_name
                    :
                    this.props.user.first_name
                } ;-)
              </Text>
            )
          }
          message={
            (
              <Text>
                Vous êtes au top !
              </Text>
            )
          }
          image={(
            <Image
              source={require('../../resources/icons/start.png')}
              style={{
                height: 125,
                width: 120,
              }}
              resizeMode={'contain'}
            />
          )}
          buttomText={'3 mois offerts !'}
        />
        <WarningPopup
          popupStyle={{
            minWidth: metrics.deviceWidth * 4 / 5,
            minHeight: metrics.deviceHeight * 1 / 2,
          }}
          visiblePopup={this.state.visiblePopupWarning}
          title={
            (
              <Text>
                {
                  this.state.invitations.length !== 0 &&
                  'Plus que '
                } {NUMBER_INVITATION - this.state.invitations.length} invitations à envoyer !
              </Text>
            )
          }
          message={
            (
              <Text>
                C’est dommage de s’arrêter maintenant :-)
              </Text>
            )
          }
          ignore={this.ignore}
          confirm={() => this.setState({ visiblePopupWarning: false })}
          image={(
            <Image
              source={require('../../resources/icons/flay.png')}
              style={{
                height: 70,
              }}
              resizeMode={'contain'}
            />
          )}
          confirmText={'Envoyer'}
        />
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => ({
  siginSuccess: bindActionCreators(siginSuccess, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen);  
