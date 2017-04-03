import { Platform } from 'react-native';

const colors = {
  background: '#f5f5f5',
  backgroundOpacity: (Platform.OS === 'ios') ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)',
  black: 'black',
  
  online: '#7ed321',
  darkGray: '#404040',
  gray: '#818181',
  grayDate: '#666666',
  transparent: 'transparent',
  white: 'white',
  orange: '#EDAA05',
  red: '#DE004A',
  lightBlue: '#00c9e5',
  lightGray: '#d7d7d7',
  buttonColor: '#00c9e5',
  facebook: '#3d5a96',
  separator: '#e1e1e1',
  blue: '#4285f4',
  blueAssociation: '#29B6F6', 
  blueBack: '#d3f1f7',
  green: '#33CC66',
  red_review: '#D80027',
  
  textOnboarding: '#2E2E2E',
  textinput: '#AAAAAA',
  separatorText: '#D5D5D5',
  separatorLine: '#979797',
  
  bar: '#8A7967',
  coffee: '#913D88',
  development: '#55bcc3',
  health: '#ce4381',
  shopping: '#ff6666',
  house: '#26c281',
  hobbies: '#f9690e',
  beauty: '#97a9de',
  association: '#64B9EA',
  event: '#e00b6c',
  markets: '#eeaa06',
  commerce: '#33CC66',
  code_partenaire: '#F7F7F7',

  
  ThirtGradientColor: '#64B9EA',
  secondGradientColor: '#36D7B7',
  firstGradientColor: '#33CC66',

  gradientColor: ['#64B9EA', '#36D7B7', '#33CC66'],
  inverseGradientColor: ['#33CC66', '#36D7B7', '#64B9EA'],

};

export default colors;
