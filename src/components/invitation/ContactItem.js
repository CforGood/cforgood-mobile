import PropTypes from 'prop-types'; import React, {  Component, } from 'react';
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
  state = {
    selected: false,
  };

  sendInvitation = () => {
    const { item } = this.props;
    if (!this.state.selected) {
      this.props.sendInvitation(item);
      this.setState({ selected: true });

    }
  }

  render() {
    const { item } = this.props;
    return (
      <View
        style={[
          styles.row,
          style.container,
          {
            justifyContent: 'space-between',
          }
        ]}
      >
        <View style={[
          styles.row,
          {

            justifyContent: 'flex-start',
            alignItems: 'center',
          }
        ]}>
          <Profile
            width={45}
            source={item.hasThumbnail && item.thumbnailPath}
            border={0}
          />
          <Text style={[
            style.text,
            { marginLeft: metrics.smallMargin }
          ]}>
            {
              item.givenName === null ? item.phoneNumbers.number : (item.familyName + ' ' + item.givenName)
            }
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.center
          ]}
          onPress={this.sendInvitation}
        >
          {
            this.state.selected ?
              <Text style={[
                style.text,
                { color: '#F8E71C' }
              ]}>
                envoyé !
              </Text>
              :
              <Text style={style.text}>
                + inviter
              </Text>
          }
        </TouchableOpacity>
      </View >
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
    marginHorizontal: metrics.marginApp,
  },
  text: {
    ...fonts.style.t16,
    ...fonts.style.mediumBold,
    color: colors.white,
  }
});
