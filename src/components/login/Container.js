import PropTypes from 'prop-types';
import React, { PureComponent, } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Icon from '../common/Icon';
import Button from '../common/Button';
import ButtonFacebook from './Facebook';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';


export default class Container extends PureComponent {


  static defaultProps = {
    placeholder: '',
    secureTextEntry: false,
    returnKeyType: 'done',
    keyboardType: 'default',
    onSubmitEditing: () => { },
    onChangeText: () => { },
    blurOnSubmit: false,
    value: '',
    multiline: false,
    numberOfLines: 1,
    styleTextInput: {},
    textAlign: 'center',
    textAlignVertical: null,
    title: null,
    firstText: null,
    secondText: null,
    facebook: false,
    subtitle: null,
    subButton: null,
    onPress: () => { },
    style: {},
    typeAuth: 'SignUp',
    canHandleNextStep: false,
    setErrorFacebook: () => { },
    setLoadedFacebook: () => { },
  };

  static propTypes = {
    title: PropTypes.string,
    firstText: PropTypes.string,
    facebook: PropTypes.bool,
    textInput: PropTypes.string,
    onPress: PropTypes.func,
    nextStep: PropTypes.func.isRequired,
    subtitle: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    returnKeyType: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keyboardType: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
    secureTextEntry: PropTypes.bool.isRequired,
    blurOnSubmit: PropTypes.bool.isRequired,
    styleTextInput: PropTypes.object,
    style: PropTypes.object,
    typeAuth: PropTypes.string,
    canHandleNextStep: PropTypes.bool,
    setErrorFacebook: PropTypes.func,
    setLoadedFacebook: PropTypes.func,
  };

  componentDidMount() {
    this.input.focus();
  }

  render() {
    const {
      title,
      textInput,
      firstText,
      secondText,
      facebook,
      onPress,
      nextStep,
      subtitle,
      subButton,
      secureTextEntry,
      styleTextInput,
      placeholder,
      value,
      onChangeText,
      returnKeyType,
      blurOnSubmit,
      onSubmitEditing,
      multiline,
      numberOfLines,
      textAlign,
      textAlignVertical,
      styleContainer,
      typeAuth,
      canHandleNextStep,
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          ...styleContainer,
        }}
      >
        <View style={{ alignItems: 'center', }}>
          <Text style={style.title}>
            {title}
          </Text>
          <Text style={style.textSub}>
            {subtitle}
          </Text>
        </View>
        <View>
          <TextInput
            ref={(input) => { this.input = input; }}
            style={[
              value !== '' ? fonts.style.t18 : fonts.style.t22,
              {
                textAlign: textAlign,
                color: 'white',
                width: metrics.deviceWidth - metrics.marginApp
              },
              Platform.OS === 'android' ? { height: 40 } : { height: 20 },
              styleTextInput
            ]}
            placeholderTextColor={'rgba(255,255,255,0.3)'}
            placeholder={placeholder}
            underlineColorAndroid='transparent'
            secureTextEntry={secureTextEntry}
            selectionColor={'white'}
            value={value}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType}
            blurOnSubmit={blurOnSubmit}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={textAlignVertical}
            returnKeyType='done'
            onSubmitEditing={() => nextStep()}
          />
        </View>
        <Text style={[
          style.text,
          { marginVertical: metrics.baseMargin }
        ]}>
          {firstText}
        </Text>
        {
          facebook &&
          <ButtonFacebook
            setLoaded={this.props.setLoadedFacebook}
            setError={this.props.setErrorFacebook}
            typeAuth={typeAuth}
          />
        }
        <TouchableOpacity onPress={onPress}>
          <Text style={[
            style.text,
            { marginVertical: metrics.baseMargin }
          ]}>
            {secondText}
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Icon
            styleImage={{
              width: 60,
              height: 60,
              tintColor: value !== '' || canHandleNextStep ? 'white' : 'rgba(255,255,255,0.4)'
            }}
            source={require('../../resources/icons/arrow-right.png')}
            onPress={() => nextStep()}
            borderColor={colors.transparent}
          />
          <Text style={style.textSub}>
            {subButton}
          </Text>
        </View>
        <KeyboardSpacer
          onToggle={() => null}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  title: {
    ...fonts.style.t15,
    color: colors.white,
    fontSize: 25,
  },
  text: {
    ...fonts.style.t15,
    color: colors.white,
  },
  textInput: {
    borderRadius: 0,
    backgroundColor: colors.transparent,
  },
  styleText: {
    ...fonts.style.t15,
    color: colors.bleu80,
  },
  textButton: {
    ...fonts.style.t15,
    color: colors.white,
    marginHorizontal: metrics.baseMargin,
  },
  button: {
    backgroundColor: colors.transparent,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: metrics.buttonHeight / 2,
    height: metrics.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: metrics.baseMargin,
  },
  textSub: {
    ...fonts.style.t15,
    color: colors.white,
    marginVertical: metrics.baseMargin,
    textAlign: 'center',
  }
});                               