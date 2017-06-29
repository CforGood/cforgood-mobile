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
  };

  static defaultProps = {
  };

  render() {

    return (
      <View style={[
        style.container,
        styles.row,
        { alignItems: 'center'}
      ]}>
        <View style={{ flex: 4 }}>
          <View >
            <Text style={style.text}>
              Invitez vos amis
            </Text>
          </View>
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
              styleButton={{
                backgroundColor: colors.transparent,
                borderRadius: 0,
                borderColor: colors.white,
                borderWidth: 2,
                height: 30,
                marginLeft: metrics.baseMargin
              }}
              styleText={style.text}
            />
            <IconImage
              width={30}
              image={require('../../resources/icons/invitation.png')}
              tintColor={colors.white}
              onPress={() => { }}
            />
          </View>
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
    fontSize: 20,
    color: colors.white
  }
});                               