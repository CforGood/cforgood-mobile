import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { styles, fonts, metrics, colors } from '../../themes';

import ProfileImage from '../common/ProfileImage';
import ChangePicture from './ChangePicture';

export default class Info extends Component {
  render() {
    const { user } = this.props;
    return (
      <View style={[styles.screen.container, styles.center, style.container]}>
        <View style={styles.row}>
          <ProfileImage
            picture={this.props.pictureSource}
            styleBorder={style.BorderImage}
            stylePicture={style.stylePicture}
          />
          <ChangePicture
            setPrictureSource={pictureSource =>
              this.props.setPrictureSource(pictureSource)}
          />
        </View>
        <Text style={[fonts.style.t17, { fontWeight: '500' }]}>
          {user.name || user.first_name + ' ' + user.last_name}
        </Text>
        {user.member && (
          <Text style={[fonts.style.normal, { color: colors.grayDate }]}>
            {user.status}
          </Text>
        )}

        <Text
          style={[
            fonts.style.normal,
            { color: colors.grayDate, marginBottom: 20 }
          ]}
        >
          {user.city}
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: metrics.doublebaseMargin
  },
  stylePicture: {
    width: 103,
    height: 103,
    borderRadius: 103 / 2
  },
  BorderImage: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: 106,
    height: 106,
    borderRadius: 106 / 2
  }
});
