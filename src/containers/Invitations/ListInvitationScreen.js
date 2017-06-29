import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';

import Background from '../../components/common/Background';
import IconImage from '../../components/common/IconImage';
import Button from '../../components/common/Button';
import Header from '../../components/invitation/Header';
import ContactItem from '../../components/invitation/ContactItem';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';
import { Contacts } from '../../dummyData/index';

export default class ListInvitationScreen extends Component {

_keyExtractor = (item) => item.id;

  render() {
    return (
      <Background
        style={{
          flex: 1,
        }}> 
        <View style={{ height: 80, padding: metrics.baseMargin }}>
          <Header />
        </View>
        <View style={{ height: 3, backgroundColor: colors.green80 }}>
          <View style={{ height: 3, backgroundColor: colors.yellow, width: 200 }} />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={Contacts}
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
