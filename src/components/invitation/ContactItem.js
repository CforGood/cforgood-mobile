import React, {
  PropTypes,
  Component,
} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import {
  colors,
  metrics,
  styles,
  fonts,
} from '../../themes';
import Icon from '../common/Icon';
import Profile from '../common/Profile';

export default class ContactItem extends Component {
  render() {
    const { item } = this.props;
    return ( 
      <TouchableOpacity
        style={[
          styles.marginContainer,
          styles.row,
          style.container,
        ]}
      >
        <View style={[
          styles.row,
          {
            flex: 4,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }
        ]}>
          <Profile
            width={45}
            source={item.image}
            border={0}
          />
          <Text style={[
            style.text,
            { marginLeft: metrics.smallMargin }
          ]}>
            {
              item.name === null ? item.mobile : item.name
            }
          </Text>
        </View>

        <View style={[
          styles.center,
          { flex: 1 }
        ]}>
          {
            item.invite ?
              <Icon
                styleImage={{width: 40, tintColor: colors.white}}
                source={require('../../resources/icons/checked.png')}
                onPress={() => { }}
              />
              :
              <Text style={style.text}>
                + inviter
              </Text>
          }
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: metrics.baseMargin,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    marginHorizontal: metrics.baseMargin
  },
  text: {
    fontSize: 14,
    color: colors.white,
  }
});
