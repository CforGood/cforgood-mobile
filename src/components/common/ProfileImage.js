import React, { PropTypes } from 'react';
import { View, Image, StyleSheet, } from 'react-native'; 
 
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class ProfileImage extends React.Component {

  static propTypes = {
    picture: PropTypes.any,
    color: PropTypes.string,
    styleBorder: PropTypes.any,
    stylePicture: PropTypes.any,
  };

  static defaultProps = {
    color: 'white'
  };

  render() { 
    return ( 
      <View style={{ alignItems: 'center' }}>
        <View style={[
            stylesProfile.imageContainer,
            this.props.styleBorder,
          ]}
        > 
        
        <Image
          resizeMode={'cover'}
          style={[
            stylesProfile.image,
            {
              borderColor: this.props.color
            },
            this.props.stylePicture,
          ]} 
          source={{uri: this.props.picture || 'http://userproplugin.com/userpro/wp-content/plugins/userpro/img/default_avatar_male.jpg'}}
        />
            
        </View>
      </View>
    );
  }
}
 
const stylesProfile = StyleSheet.create({ 
  image:{
    width: metrics.deviceWidth/2.679,
    height: metrics.deviceWidth/2.679, 
    borderRadius: (metrics.deviceWidth/2.679)/2 ,
    borderWidth: 1,  
  }, 
  imageContainer:{
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: metrics.deviceWidth/1.875,
    height:metrics.deviceWidth/1.875, 
    borderRadius: (metrics.deviceWidth/1.875)/2,
  },
});