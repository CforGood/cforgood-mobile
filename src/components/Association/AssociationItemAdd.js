import React, { Component,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
 
import {
  styles, 
  fonts,
  metrics,
  colors,
} from '../../themes';
 
const WIDTH_WIDGET = (metrics.deviceWidth) / 2 
  - metrics.marginApp
  - metrics.smallMargin ;
 
export default class AssociationItemAdd extends Component {
 
  render() { 
    return ( 
      <View 
        style={styleAssociationItemAdd.container}
      >   
        <View>
          <Text style={[
              fonts.style.mediumBold,
              fonts.style.t13,
            ]}
          >
            {'Soutenir\nune autre association ?'}
          </Text>
        </View> 
        <Image
          source={require('../../resources/icons/add_association.png')}
          style={styleAssociationItemAdd.icon}
          resizeMode='contain'
        />     
        <View />  
      </View>
    );
  }
};

const styleAssociationItemAdd = StyleSheet.create({
  container: {
    borderColor: colors.separatorText,
    borderWidth:1,
    flex: 1, 
    width: WIDTH_WIDGET,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: metrics.baseMargin
  },
  ligne: {
    borderBottomWidth: 4,
    borderBottomColor: colors.white,
    width: 31,
  },
  icon: {
    width: 63,
    height: 63,
  },
});
