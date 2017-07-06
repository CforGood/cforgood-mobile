import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import FontMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';

import Background from '../../components/common/Background';
import Icon from '../../components/common/Icon';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default class LikeScreen extends Component {

  render() {
    return (
      <Background
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>

        <Text style={style.title}>
          Envoyez du love !
        </Text>
        <Icon
          styleImage={{
            width: 100,
          }}
          source={require('../../resources/icons/likeSecond.png')}
          onPress={() => { }}
        />
        <View >
          <Text style={style.title}>
            Offrez à vous proches 1 mois
          </Text>
          <Text style={style.title}>
            graduit sur CforGood !
          </Text>
        </View>

        <Text style={[
          style.title,
          { marginVertical: metrics.doubleBaseMargin }
        ]}>
          Et bénéficiez aussi d' 1 mois offert !
        </Text>

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
