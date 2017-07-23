import React, { Component,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text, 
  StyleSheet
} from 'react-native';
 
import { 
  styles, 
  fonts, 
  colors,
  metrics
} from '../../themes';

import { associationType } from '../../types';

import ProfileImage from '../common/ProfileImage';
 
export default class BusinessLeader extends Component {

  static propTypes = {
    association: associationType.isRequired, 
  };

  render() {
    const { association } = this.props
    return (
      association.representative_testimonial ?
      <View > 
        <Text style={[
            fonts.style.bold,  
            {
              textAlign: 'center',
              fontFamily: fonts.type.base,
              fontSize: metrics.deviceWidth/25,
            }
          ]}>
          Quelques mots de { association.representative_first_name + ' ' + association.representative_last_name }
        </Text>
        <View style={{
            height: (metrics.deviceWidth/1.875/2) + 200,
            marginBottom: metrics.baseMargin
          }}
        >
          <View style={style.profileImage}>
            <ProfileImage 
              picture={ association.leader_picture }
              color={ colors.blueAssociation }
            /> 
          </View>
          <View style={style.profileDescription}  >  
            <Text style={fonts.style.normal}>
              { association.representative_testimonial }
            </Text>  
          </View>
        </View> 
      </View>
      :
      null
    );
  }
};
 
const style = { 
  profile:{ 
    flex:1,
    justifyContent: 'center', 
    alignItems: 'center',    
  },
  profileImage:{ 
    alignItems: 'center',
    zIndex: 3,
  },
  profileDescription:{
    backgroundColor: colors.blueBack,
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    top: (metrics.deviceWidth/1.875)/2,
    height: 200,
    zIndex: 2,
    padding: metrics.baseMargin,
    justifyContent: 'flex-end'
  },

}; 

