import React, { Component, } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../components/common/Loading';
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
    allContacts: [],
    invitations: [],
    visiblePopupConfirm: false,
    visiblePopupWarning: false,
    searchText: '',
    visibleSearch: false,
    loaded: true,
  };

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
    this.setState({ loaded: false });
    Contacts.getAll((err, allContacts) => {
      //update the first record
      this.setState({
        allContacts,
        contacts: allContacts,
        loaded: true,
      });

    })
  }

  sendInvitation = (item) => {
    //API INVITATION

    const data = [
      'user_login=""',
      'api_key=""',
      'sms_recipients=""',
      'sms_text=""',
      'sms_type=""',
      'sms_sender=""',
    ];

    const url = `http://www.octopush-dm.com/api/sms/?` + data.join('&');

    return fetch(url)
      .then(response => {
        console.log('responseresponse', response);
        if (response.status === 200) {
          return response.json();
        }
        else {

        }
      })
      .then((responseJson) => {
        this.setState((oldState) => ({
          invitations: [
            ...oldState.invitations, // copy old data
            item // toggle
          ]
        }));
      })
      .catch(error => {

      })


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

  setSearchText = (searchText) => {
    if (searchText !== '') {
      const contacts = this.state.allContacts.filter(contact =>
        contact.familyName.toLowerCase().includes(searchText.toLowerCase())
        ||
        contact.givenName.toLowerCase().includes(searchText.toLowerCase())
      );
      this.setState({
        contacts,
        searchText,
      });

    }
    else {
      this.setState({
        contacts: this.state.allContacts,
        searchText,
      });
    }

  }

  render() {
    const { searchText } = this.state;
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
          {
            this.state.visibleSearch ?
              <HeaderTextInput
                onChangeText={(searchText) => this.setSearchText(searchText)}
                onClose={() => this.setState({
                  searchText: '',
                  visibleSearch: false,
                  contacts: this.state.allContacts,
                })
                }
                value={this.state.searchText}
              />
              :
              <Header
                number={this.state.invitations.length}
                numberInvitaion={NUMBER_INVITATION}
                onPressSearch={() => this.setState({ visibleSearch: true })}
              />

          }
        </View>

        <SeparatorInvitation
          number={this.state.invitations.length}
          numberInvitaion={NUMBER_INVITATION}
        />

        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps='always'>
            {
              this.state.contacts.map(contact =>
                <ContactItem
                  key={contact.recordID}
                  item={contact}
                  sendInvitation={this.sendInvitation}
                />
              )
            }
          </ScrollView>
        </View>
        <WarningPopup
          popupStyle={{
            minWidth: metrics.deviceWidth * 4 / 5,
            minHeight: metrics.deviceHeight * 1 / 2,
          }}
          visiblePopup={this.state.visiblePopupConfirm}
          title={
            (<View />
              // <Text>
              //   Félicitations {
              //     this.props.user.first_name.length > 10 ?
              //       '\n' + this.props.user.first_name
              //       :
              //       this.props.user.first_name
              //   } ;-)
              // </Text>
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
        <Loading loading={!this.state.loaded} />
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

export default connect(null, mapDispatchToProps)(ContactsScreen);  
