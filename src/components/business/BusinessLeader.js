import React, { Component,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text, 
  StyleSheet,
  ScrollView
} from 'react-native';
 
import { 
  styles, 
  fonts, 
  colors,
  metrics
} from '../../themes';

import { businessType } from '../../types';

import ProfileImage from '../common/ProfileImage';
 
export default class BusinessLeader extends Component {

  static propTypes = {
    business: businessType.isRequired,
    color: PropTypes.string.isRequired
  };

  render() {
    const { business, color } = this.props
    return (
      <View style={{marginBottom: 10}}> 
        <Text 
          style={[
            fonts.style.bold,
            fonts.style.t17, 
            {textAlign: 'center'}
          ]}
        >
          { //Qui se cache derrière ? 
          }
          { business.leader_first_name } { business.leader_last_name }
        </Text>
        <View style={{
            minHeight: 350,
            marginBottom: metrics.baseMargin
          }}
        >
          <View style={style.profileImage}>
            <ProfileImage 
              picture={ business.leader_picture }
              color={ color }
            /> 
          </View>
          {
            business.leader_description ?
            <View
              style={style.profileDescription}
            >  
              <Text style={fonts.style.normal}>
                { business.leader_description }
              </Text>  
              
            </View>
            :
            null
          }
          
        </View>
      </View>
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
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    top: (metrics.deviceWidth/1.875)/2,
    zIndex: 2,
    padding: metrics.baseMargin,
    paddingTop: 110,
    justifyContent: 'flex-end'
  },

}; 

