import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
  
import {
  colors,
  fonts,
  metrics,
} from '../../themes';
 
export default class OfferView extends PureComponent {
  static propTypes = {
    offer:  PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  };

  render() {        
    return (
      <View style={[
          style.OfferContainer,
          {
            backgroundColor: this.props.color,
          }
        ]}
      >
        <View style={style.Offer} >
          <Text 
            style={[ 
              style.text,
              fonts.style.regular,
              fonts.style.bold,
            ]}
            numberOfLines={1}
          >
            {this.props.offer} 
          </Text>  
        </View>
      </View>
    );
  }
}
 
const style = StyleSheet.create({
  OfferContainer:{
    borderTopLeftRadius: 18.5 ,
    borderTopRightRadius: 18.5,
    paddingLeft: 5,
    paddingRight: 5,
    width: 75 + 5,
    height: 16 + 5,
  },
  Offer: { 
    borderTopLeftRadius: 13.5,
    borderTopRightRadius: 13.5,
    backgroundColor: colors.white,
    flex: 1,
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    bottom: 0,
  },
  text: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    bottom: 2,

  }
});
