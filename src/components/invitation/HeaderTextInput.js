import React, {
  PropTypes,
  PureComponent,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
} from 'react-native';

import Icon from '../common/Icon';
import Button from '../common/Button';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class HeaderTextInput extends PureComponent {

  static propTypes = {
    value: PropTypes.string,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: "",
  };

  render() {
    return (
      <View style={[
        style.container,
        styles.row,
        { 
          alignItems: 'center',
          justifyContent: 'space-between',
        }
      ]}>
        <View>
          <Icon
            styleImage={{ 
              width: 20,
              height: 20,
              tintColor: colors.white,
              marginRight: metrics.baseMargin,
            }}
            source={require('../../resources/icons/arrow-left.png')}
            onPress={() => { }}
          />
        </View>
        <View style={[
          style.containerTextInput,
          {
            borderBottomColor: this.props.value ? 'white' : 'rgba(255,255,255,0.3)'
          }

        ]}>
          <TextInput
            placeholder={'Chercher par nom …'}
            selectionColor={colors.white}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid='transparent'
            value={this.props.value}
            onChangeText={(text) => this.props.onChangeText(text)}
            style={[
              this.props.value !== '' ? fonts.style.t18 : fonts.style.t22,
              {
                color: this.props.value !== '' ? 'white' : 'rgba(255,255,255,0.3)',
              },
              Platform.OS === 'android' ? { height: 50 } : { height: 20 },
            ]}
          />

        </View>
        <View>
          <Icon
            styleImage={{ 
              width: 12,
              height: 12,
              tintColor: colors.white,
              marginLeft: metrics.baseMargin,
            }}
            source={require('../../resources/icons/close.png')}
            onPress={() => this.props.onClose()}
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
    ...fonts.style.t15,
    color: colors.white
  },
  button: {
    backgroundColor: colors.transparent,
    borderRadius: 0,
    borderColor: colors.white,
    borderWidth: 2,
    height: 25,
    marginLeft: metrics.baseMargin
  },
  containerTextInput: {
    backgroundColor: colors.transparent,
    borderBottomWidth: 2,
    flex: 1,
    borderBottomColor: colors.white,
    paddingBottom: metrics.baseMargin,
  }
});                               