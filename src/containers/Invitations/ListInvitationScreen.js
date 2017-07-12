import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';
import Contacts from 'react-native-contacts';

import Background from '../../components/common/Background';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';
import Header from '../../components/invitation/Header';
import HeaderTextInput from '../../components/invitation/HeaderTextInput';
import ContactItem from '../../components/invitation/ContactItem';
import SeparatorInvitation from '../../components/invitation/SeparatorInvitation';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class ListInvitationScreen extends Component {
  state = {
    contacts: [],
  };

  _keyExtractor = (item) => item.id;

  componentWillMount() {
    this.checkPermission();
  }

  checkPermission = () => {
    Contacts.checkPermission((err, permission) => {
      // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
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
      this.setState({ contacts });

    })
  }

  render() {
    return (
      <Background
        style={{
          flex: 1,
        }}>
        <View style={{ height: 80, padding: metrics.baseMargin }}>
          <HeaderTextInput text={"Allan"} />
        </View>

        <SeparatorInvitation />

        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.contacts}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <ContactItem item={item} />
            )}
          />
        </View>
      </Background>
    );
  }
}

const style = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center'
  },
});   
