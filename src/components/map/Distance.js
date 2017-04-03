import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';
 
export default class Distance extends Component {

  static propTypes = {  
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.any,
    active: PropTypes.bool,
  };

  static defaultProps = {
    onPress: () => {},  
    icon: null,
    active: false,
  };

  render() {
    const { onPress } = this.props;
    return (  
      <TouchableOpacity
        onPress={onPress}
        style={[ 
           stylesDistance.button,
           this.props.active ? stylesDistance.buttonActive : {}
        ]}
      > 
        {
          this.props.icon && 
          <Icon 
            name={this.props.icon} 
            size={15}
            color={this.props.active === false ? colors.white : '#4285f4' }  
          /> 
        }  
        <Text
          style={this.props.active? stylesDistance.textActive : stylesDistance.text}
        >  
          {this.props.text}
        </Text>
      </TouchableOpacity> 
    );
  }
}

const stylesDistance = StyleSheet.create({

  button:{    
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: metrics.baseMargin, 
    borderRadius: 15 ,
    marginHorizontal: metrics.smallMargin,
    width: 70,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    textAlign: 'left',
    fontSize: fonts.size.tiny,
  },
  textActive: {
    textAlign: 'left',
    fontSize: fonts.size.tiny,
    color: '#4285f4',
  },
  buttonActive:{    
    backgroundColor: colors.white,
  },
});                               