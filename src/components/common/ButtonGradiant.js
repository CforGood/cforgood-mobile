import React, {
  PropTypes,
  PureComponent,
} from 'react';

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class ButtonGradient extends PureComponent {

  static propTypes = { 
    onPress: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    style: PropTypes.object,
    text: PropTypes.string.isRequired,
    styleButton: PropTypes.object,
    styleText: PropTypes.object,
    icon: PropTypes.number,
    iconGradient: PropTypes.number,
    borderRadius: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    onPress: () => {},
    type: '',
    text: 'Appliquer',
    icon: null,
    iconGradient: null,
    borderRadius:0,
    height: 60,
    width: null
  };

  render() {

    const {
      onPress,
      type,
      icon,
      iconGradient,
      borderRadius,
      height,
      width
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[
          {
            height: height,
            width: width
          },
          this.props.type === 'simple' ?
          {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: icon === null ? 'column' : 'row'
          }
          :
          null,
          this.props.style,
        ]}
      > 
        {
          icon
        }
        {
          type === 'simple' ?
          <Text style={[
              fonts.style.textButton,
              this.props.styleText,
            ]}
          >
            {this.props.text}
          </Text>
          :
          <LinearGradient
            start={{x: 0, y:0}} end={{x: 1, y:0}}
            colors={colors.gradientColor}
            style={[
              {
                flex: 1,
                justifyContent: 'space-around',
                alignItems: 'center',
                height: height,
                flexDirection: 'row',
                borderRadius: borderRadius,
              },
              this.props.styleButton
            ]}
          >
            <Text style={[
                fonts.style.textButton,
                this.props.styleText,
              ]}
            >
              {this.props.text}
            </Text>
            {
              iconGradient
            }

          </LinearGradient> 
        } 
      </TouchableOpacity>
    );
  }
}

const stylesButton = StyleSheet.create({ 
 
});                               