import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';

import {
  styles,
  colors,
  metrics,
} from '../../themes';
import Background from '../../components/common/Background';
import ButtonGradiantRadius from '../../components/common/ButtonGradiantRadius'
import AssociationSelect from '../../components/Association/AssociationSelect';
import { associations } from '../../dummyData/index';

export default class AssociationListScreen extends Component {

  _keyExtractor = (item) => item.id;

  render() {
    return (
      <Background
        style={{
          flex: 1,
        }}>
        <ButtonGradiantRadius
          text={'Soutenir !'}
          styleButton={{
            position: 'absolute',
            left: metrics.deviceWidth /2 - 60,
            bottom: 55,
            zIndex: 1,
          }}
        />
        <View style={[
          styles.center,
          { height: 70, padding: metrics.baseMargin }
        ]}>
          <Text style={{ fontSize: 25, color: colors.white }}>
            Séléctinnez une association
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <FlatList
            data={associations}
            keyExtractor={this._keyExtractor}
            contentContainerStyle={[
              styles.wrap,
              {
                paddingHorizontal: metrics.baseMargin,
                paddingTop: metrics.baseMargin
              }
            ]}
            renderItem={({ item }) => (<AssociationSelect
              association={item}
            />
            )}
          />
        </View>
        <View style={[
          styles.center,
          {
            height: 50,
            padding: metrics.baseMargin,
            backgroundColor: colors.white,
            borderTopWidth: 1,
            borderTopColor: colors.gray
          }
        ]}>
          <Text style={{ color: colors.gray }}>
            Passer
          </Text>
        </View>
      </Background>
    );
  }
}