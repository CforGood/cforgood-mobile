import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const deviceWidth = width < height ? width : height;
const deviceHeight = width < height ? height : width;

// Dynamique value for responsive elemenet ( margin , Radius , sizeImage .....)
const metrics = {
  deviceWidth,
  deviceHeight,
  base: deviceWidth/10, 
  tinyMargin: deviceWidth/120,
  marginApp: deviceWidth/20,
  smallMargin: deviceWidth/60,
  baseMargin: deviceWidth/30,
  doubleBaseMargin: deviceWidth/15,
  navBarHeight: (Platform.OS === 'ios') ? 72 : 50,
  radius: deviceWidth/70,
  border: deviceHeight/200,
  buttonHeight: deviceHeight/14,
  buttonHeightLarge: deviceHeight/12,
  inputHeight: deviceHeight/14,
  borderWidth: 1,  
  rowHeight: 112,
  icons: {
    tiny: deviceWidth/20,
    small: deviceWidth/10,
    medium: deviceWidth/8,
    lm: deviceWidth/5,
    large: deviceWidth/3,
    xl: deviceWidth/2,
  },
  images: {
    tiny: deviceWidth/15,
    small: deviceWidth/10,
    medium: deviceWidth/8,
    large: deviceWidth/6,
    xl: deviceWidth/3,
    logo: deviceHeight/3.5478,
    flex: deviceWidth,
  },
};

export default metrics;
