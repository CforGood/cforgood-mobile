import metrics from './metrics';
import colors from './colors';

const type = {
  base: 'Avenir',
};

const size = {
  h1: metrics.deviceWidth/10,
  h2: 35,
  h8: 22,
  h9: 19,
  input: 15,
  regular: 16,
  medium: 14,
  small: 12,
  tiny: 10,
  t16: 16,
  t17: 17
};

const fontWeight = {
  normal: 'normal', 
  bold: 'bold', 
  f100: '100', 
  f200: '200', 
  f300: '300', 
  f400: '400', 
  f500: '500',
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
  },
  h2: {
    fontSize: size.h2,
    fontFamily: type.base,
    color: colors.darkGray,
  },
  t10: {
    fontFamily: type.base,
    fontSize: 10,
    color: colors.grayDate,
  },
  t13: {
    fontFamily: type.base,
    fontSize: 13,
    color: colors.grayDate,
    textAlign: 'center',
  },
  normal: {
    fontFamily: type.base,
    fontSize: 14,
    color: colors.darkGray,
  },
  t15: {
    fontFamily: type.base,
    fontSize: 15,
    color: colors.darkGray,
  },
  t16: {
    fontFamily: type.base,
    fontSize: 16,
    color: colors.darkGray,
  },
  t17: {
    fontFamily: type.base,
    fontSize: 17,
    color: colors.darkGray,
  },
  t18: {
    fontFamily: type.base,
    fontSize: 18,
    color: colors.darkGray,
  },
  h9: {
    fontFamily: type.base,
    fontSize: 19,
  },
  t20: {
    fontFamily: type.base,
    fontSize: 20,
    color: colors.darkGray,
  },
  t22: {
    fontFamily: type.base,
    fontSize: 22,
    color: colors.darkGray,
  },
  t24: {
    fontFamily: type.base,
    fontSize: 24,
    color: colors.darkGray,
  },
  t25: {
    fontFamily: type.base,
    fontSize: 25,//size.medium,
    color: colors.darkGray,
  },
  t26: {
    fontFamily: type.base,
    fontSize: 26,
    color: colors.darkGray,
  },
  small: {
    fontFamily: type.base,
    fontSize: size.small,
  },
  tiny: {
    fontFamily: type.base,
    fontSize: size.tiny,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
  textButton:{
    fontFamily: type.base,
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },
  textWhite: {
    color: colors.white,
    fontFamily: type.base,
  },
  textBlack: {
    color: colors.black,
    fontFamily: type.base,
  },
  bold: {
    fontWeight: 'bold',
    fontFamily: type.base,
  },
  mediumBold: {
    fontWeight: '500'
  },
  textInput: {
    color: colors.textinput, 
    fontSize: 15,
    fontWeight: fontWeight.normal,
    height: metrics.inputHeight,
    fontFamily: type.base,
  },
  DateInput: {
    color: colors.textinput, 
    fontSize: 17,
    fontWeight: fontWeight.normal,
    fontFamily: type.base,
  },
  errorTextInput: {
    color: colors.red, 
    fontSize: size.medium, 
    fontWeight: fontWeight.normal,
    height: metrics.inputHeight,
    fontFamily: type.base,
  },
  activateText: { 
    color: colors.lightBlue,
    fontFamily: type.base,
    fontSize: size.h8,
  },
  title: {
    fontFamily: type.base,
    fontSize: 24,
    color: colors.darkGray,
    fontWeight: 'bold',
  }
};

export default {
  type,
  size,
  style,
  fontWeight, 
};
