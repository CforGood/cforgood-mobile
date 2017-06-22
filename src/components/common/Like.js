import React, {
  PropTypes,
  PureComponent,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class Like extends PureComponent {

  static propTypes = { 
    onPress: PropTypes.func.isRequired,
    styleLike: PropTypes.any, 
    type : PropTypes.any, 
  };

  static defaultProps = {
    onPress: () => {},
    styleLike : {},  
  };

  render() { 
    return (
      <TouchableOpacity 
        onPress={this.props.onPress}
        style={{marginHorizontal: 22}}
      > 
        {
        this.props.type === 'color' ?
        <LinearGradient
          start={{x: 0, y:0}} end={{x: 1, y:0}} 
          colors={colors.gradientColor}
          style={stylesLike.ButtonGradiant}
        >
          <View style={stylesLike.button} >
            <Image
              resizeMode={'contain'}
              style={{ 
                width: 40,
                height: 40,
              }}
              source={require('../../resources/icons/like.png')}    
            />     
          </View> 
        </LinearGradient>
        :
        <View
          style={[
            stylesLike.ButtonGradiant
          ]}
        >
          <View style={stylesLike.button} >
            <Image 
             resizeMode={'contain'}
             style={{ 
                width: 40,
                height: 40
              }}
              source={require('../../resources/icons/unlike.png')}    
            />     
          </View> 
        </View>
        } 

      </TouchableOpacity>
    );
  }
}

const stylesLike = StyleSheet.create({ 
  ButtonGradiant:{    
    width:82,
    height:82,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 41,
    backgroundColor: '#818181',
  },
  button: {
    width:75,
    height:75,
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 37.5,
    backgroundColor: colors.white,
  }

});                               