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
import TextInput from '../common/TextInput';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class HeaderTextInput extends PureComponent {

  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: "",
  };

  render() {

    const {
      text,
    } = this.props;

    return (
      <View style={[
        style.container,
        styles.row,
        { alignItems: 'center' }
      ]}>
        <View style={{ flex: 0.5 }}>
          <IconImage
            width={20}
            image={require('../../resources/icons/arrow-left.png')}
            tintColor={colors.white}
            onPress={() => { }}
          />
        </View>
        <View style={{ flex: 4 }}>
          <TextInput
            placeholder={text}
            selectionColor={colors.white}
            placeholderTextColor={colors.white}
            textAlign={'left'}
            styleTextInput={style.containerTextInput}
            styleText={{ fontSize: 18 }}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <IconImage
            width={12}
            image={require('../../resources/icons/close.png')}
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
  },
  containerTextInput: {
    backgroundColor: colors.transparent,
    borderBottomWidth: 2,
    borderBottomColor: colors.white
  }
});                               