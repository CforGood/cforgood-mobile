import { StyleSheet } from 'react-native';
import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: metrics.baseMargin,
    paddingVertical: metrics.baseMargin,
    paddingTop: metrics.doubleBaseMargin
  },
  title: {
    color: colors.white,
    fontSize: 25,
  },
  text: {
    color: colors.white,
    fontSize: 18,
  },
  button: {
    backgroundColor: colors.transparent,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: metrics.buttonHeight / 2,
    height: metrics.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: metrics.baseMargin,
    marginHorizontal: metrics.doubleBaseMargin * 2
  },
  textButton: {
    color: colors.white,
    fontSize: 14,
  },
  icon: {
    tintColor: colors.bleu90,
    width: 40
  },
  textInput: {
    width: 200,
    borderRadius: 0,
    backgroundColor: colors.transparent,
  },
  styleText: {
    color: colors.bleu80,
  },

});
