import React, {
  PropTypes,
  PureComponent,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import IconImage from '../common/IconImage';
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
    offert: PropTypes.number,
  };

  static defaultProps = {
    number: 0,
    offert: 0,
  };

  render() {

    const {
      number,
      offert
    } = this.props;

    return (
      <View style={[
        style.container,
        styles.row,
        { alignItems: 'center' }
      ]}>
        <View style={{ flex: 4 }}>
          <View >
            <Text style={style.text}>
              Invitez vos amis
            </Text>
          </View>

          {
            number !== 0 ?
              <View style={[
                styles.row,
                {
                  alignItems: 'center',
                }
              ]}>
                <Text style={style.text}>
                  Génial!
              </Text>
                <Button
                  text={'3 mois offert'}
                  styleButton={style.button}
                  styleText={style.text}
                />
                <IconImage
                  width={25}
                  image={require('../../resources/icons/invitation.png')}
                  tintColor={colors.white}
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
                <Text style={style.text}>
                  Plus que
              </Text>
                <Text style={[
                  style.text,
                  { marginHorizontal: metrics.smallMargin }
                ]}>
                  2
              </Text>
                <Text style={style.text}>
                  invitations à envoyer!
              </Text>
                <IconImage
                  width={25}
                  image={require('../../resources/icons/invitation.png')}
                  tintColor={colors.white}
                  onPress={() => { }}
                />
              </View>
          }
          
        </View>
        <View style={{ flex: 1 }}>
          <IconImage
            width={30}
            image={require('../../resources/icons/search.png')}
            tintColor={colors.white}
            onPress={() => { }}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 15,
    color: colors.white
  },
  button: {
    backgroundColor: colors.transparent,
    borderRadius: 0,
    borderColor: colors.white,
    borderWidth: 2,
    height: 25,
    marginLeft: metrics.baseMargin
  }
});                               