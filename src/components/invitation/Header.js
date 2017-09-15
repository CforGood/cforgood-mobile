import PropTypes from 'prop-types'; import React, {  PureComponent, } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import Icon from '../common/Icon';
import Button from '../common/Button';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class Header extends PureComponent {

  static propTypes = {
    number: PropTypes.number,
    numberInvitaion: PropTypes.number,
    onPressSearch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    number: 0,
    numberInvitaion: 5,
  };

  render() {

    const {
      number,
      numberInvitaion,
    } = this.props;

    return (
      <View style={[
        style.container,
        styles.row,
        {
          alignItems: 'center',
          justifyContent: 'space-between',
        }
      ]}>
        <View style={{ flex: 4 }}>
          <View >
            <Text style={style.title}>
              Invitez vos amis
            </Text>
          </View>

          {
            number >= numberInvitaion ?
              <View style={[
                styles.row,
                {
                  alignItems: 'center',
                }
              ]}>
                <Text style={style.text}>
                  Génial!
                </Text>
                <View style={style.button}>
                  <Text style={style.text}>
                    3 mois offert
                  </Text>
                </View>

                <Icon
                  styleImage={{ width: 25, tintColor: colors.white }}
                  source={require('../../resources/icons/start.png')}
                  onPress={() => { }}
                />
              </View>
              :
              <View style={[
                styles.row,
                {
                  alignItems: 'center',
                }
              ]}>
                {
                  number > 0 &&
                  <Text style={style.smallText}>
                    Plus que
                  </Text>
                }
                <Text style={[
                  style.text, 
                ]}>
                  {numberInvitaion - number} invitations
                </Text>
                <Text style={style.smallText}>
                  {` à envoyer!`}
                </Text>
                <Image
                  style={{
                    marginLeft: 30,
                    width: 31,
                    height: 32,
                    tintColor: colors.white,
                  }}
                  resizeMode={'contain'}
                  source={require('../../resources/icons/flay.png')}
                />
              </View>
          }

        </View>
        <Icon
          styleImage={{ width: 23, height: 23 }}
          source={require('../../resources/icons/magnifying-glass.png')}
          onPress={() => this.props.onPressSearch()}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    ...fonts.style.t24,
    ...fonts.style.mediumBold,
    color: colors.white
  },
  smallText: {
    ...fonts.style.t13,
    ...fonts.style.bold,
    color: colors.white
  },
  text: {
    ...fonts.style.t15,
    ...fonts.style.bold,
    color: colors.white
  },
  button: {
    borderColor: colors.white,
    borderWidth: 2,
    paddingVertical: 3,
    paddingHorizontal: metrics.smallMargin,
    marginHorizontal: metrics.smallMargin,
  }
});                               