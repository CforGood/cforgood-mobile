/* @flow */

import React, {
  PropTypes,
  PureComponent,
} from 'react';

import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

import {
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class CustomTextInput extends PureComponent {

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    returnKeyType: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keyboardType: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
    secureTextEntry: PropTypes.bool.isRequired,
    blurOnSubmit: PropTypes.bool.isRequired,
    styleTextInput: PropTypes.any,
    styleText: PropTypes.any
  };

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
    styleText: {}
  };


  inputRef() {
    return this.refs.input;
  }

  focus() {
    this.inputRef().focus();
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.inputRef().clear();
  }

  render() {

    const {
      placeholder,
      secureTextEntry,
      value,
      onChangeText,
      returnKeyType,
      blurOnSubmit,
      onSubmitEditing,
      multiline,
      numberOfLines,
      styleTextInput,
      textAlign,
      textAlignVertical,
      styleText,
    } = this.props;

    return (
      <View style={[
        style.container,
        { height: multiline ? null : metrics.inputHeight }
      ]}>
        <View style={[
          style.containerForm,
          { borderRadius: multiline ? 10 : metrics.inputHeight / 2 - 2 },
          styleTextInput
        ]}>
          <TextInput
            ref='input'
            {...this.props}
            style={[
              fonts.style.t17,
              {
                flex: 1,
                textAlign: textAlign,
              },
              styleText
            ]}
            placeholderTextColor="#999"
            placeholder={placeholder}
            underlineColorAndroid='transparent'
            secureTextEntry={secureTextEntry}
            selectionColor={colors.black}
            value={value}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType}
            blurOnSubmit={blurOnSubmit}
            onSubmitEditing={onSubmitEditing}
            ref='input'
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={textAlignVertical}
          />
        </View>
      </View >
    );
  }
}

const style = StyleSheet.create({
  container: {
    marginVertical: 0,
    paddingHorizontal: metrics.doubleBaseMargin,
    marginHorizontal: metrics.doubleBaseMargin,
  },
  containerForm: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 0,
    marginHorizontal: 1,
    marginTop: 1,
    marginBottom: 1.5,
  },
});