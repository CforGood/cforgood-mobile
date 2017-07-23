import React, { PureComponent,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Intercom from 'react-native-intercom';
import { withNavigation } from 'react-navigation';

import {
  styles,
  fonts,
  metrics,
  colors,
} from '../../themes';


import Icon from '../common/Icon';
import Back from '../common/Back';


class ProfileHeader extends PureComponent {

  render() {
    const { ambassador } = this.props;
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={colors.gradientColor}
        style={[
          styles.spaceBetween,
          styles.row,
          {
            paddingTop: Platform.OS === 'ios' ? 20 : 0,
            paddingHorizontal: metrics.marginApp
          },
        ]}
      >
        <View style={{ justifyContent: 'center' }}>
          <Back
            styleImage={{ tintColor: colors.white }}
            rotate={true}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          {
            ambassador &&
            <Icon
              source={require('../../resources/icons/ambassadeur.png')}
              style={{
                marginLeft: metrics.baseMargin,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              styleImage={{
                height: 36,
                width: 36,
              }}
              onPress={() => this.props.navigation.navigate(
                'WebView',
                {
                  url: 'https://app.cforgood.com/member/users/8/ambassador',
                  title: 'Ambassadeur'
                }
              )}
            />
          }

          <Icon
            onPress={() => Intercom.displayMessageComposer()}
            source={require('../../resources/icons/intercom.png')}
            style={{
              marginLeft: metrics.baseMargin,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            styleImage={{
              height: 36,
              width: 36,
            }}
          />
        </View>
      </LinearGradient>
    );
  }
}

export default withNavigation(ProfileHeader);
