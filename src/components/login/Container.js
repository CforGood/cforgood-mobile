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

import TextInput from '../common/TextInput';
import IconImage from '../common/IconImage';
import Button from '../common/Button';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';


export default class Container extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    firstText: PropTypes.string,
    button: PropTypes.string,
    textInput: PropTypes.string,
    onPress: PropTypes.func,
    nextStep: PropTypes.func.isRequired,
    subtitle: PropTypes.string,
    secureTextEntry: PropTypes.bool,
  };

  static defaultProps = {
    title: null,
    firstText: null,
    secondText: null,
    textInput: null,
    button: null,
    subtitle: null,
    subButton: null,
    onPress: () => { },
    secureTextEntry: false
  };

  render() {

    const {
      title,
      textInput,
      firstText,
      secondText,
      button,
      onFirstPress,
      nextStep,
      subtitle,
      subButton,
      secureTextEntry
    } = this.props;

    return (
      <View style={[
        styles.center,
        { flex: 8 }
      ]}>
        <Text style={style.title}>
          {title}
        </Text>
        <Text style={style.textSub}>
          {subtitle}
        </Text>
        <TextInput
          placeholder={textInput}
          styleTextInput={style.textInput}
          textAlign={'left'}
          styleText={style.styleText}
          secureTextEntry={secureTextEntry}
        />
        <Text style={[
          style.text,
          { marginVertical: metrics.doubleBaseMargin }
        ]}>
          {firstText}
        </Text>
        {
          button != null &&
          <Button
            styleButton={style.button}
            styleText={style.textButton}
            text={button}
            onPress={onFirstPress}
          />
        }
        <Text style={[
          style.text,
          { marginVertical: metrics.baseMargin }
        ]}>
          {secondText}
        </Text>
        <View style={{ flex: 1}}>
          <IconImage
            width={60}
            tintColor={'rgba(255,255,255,0.4)'}
            image={require('../../resources/icons/arrow-right.png')}
            onPress={nextStep}
            borderColor={colors.transparent}
          />
          <Text style={style.textSub}>
            {subButton}
          </Text>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: 25,
  },
  text: {
    color: colors.white,
  },
  textInput: {
    width: 200,
    borderRadius: 0,
    backgroundColor: colors.transparent,
    marginVertical: metrics.baseMargin
  },
  styleText: {
    color: colors.bleu80,
  },
  textButton: {
    color: colors.white,
    fontSize: 15,
  },
  button: {
    backgroundColor: colors.transparent,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: metrics.buttonHeight / 2,
    height: metrics.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: metrics.baseMargin,
    marginHorizontal: metrics.doubleBaseMargin * 2,
    marginVertical: metrics.baseMargin
  },
  textSub: {
    color: colors.white,
    fontSize: 15,
    marginVertical: metrics.baseMargin
  }
});                               