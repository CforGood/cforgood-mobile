import React, {
  PropTypes,
  Component,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  
} from 'react-native';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

import FontMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';
import Separator from '../common/Separator';
import DateProfile from '../common/Date';


export default class ProfilForm extends Component {
  
  static propTypes = {
    onChangeDate: PropTypes.func.isRequired
  }
  

  render() { 
    
    const { user } = this.props;

    return (
      
      <View style={styles.screen.mainContainer }> 
      <Text
          style=
          {[ 
             fonts.style.t20, 
             style.boldCenter,
             { marginBottom:20 }
           ]}
        >
          Profil
      </Text>
        <Separator color={colors.separatorText} />
        <Kohana
          style={{ backgroundColor: colors.white  }}
          label={ 'Prénom' }
          iconClass={ FontMaterialIcons }
          iconName={'face'}
          iconColor={ colors.lightBlue }
          labelStyle={ fonts.style.textInput }
          inputStyle={{ color: colors.darkGray  }} 
          selectTextOnFocus={ true }
          value={user.first_name}
          onChangeText={
            (value) => this.props.setUserData({
              ...user, first_name: value
            })
          }
        />
        <Separator color={colors.separatorText} />
        <Kohana
          style={{ backgroundColor: colors.white  }}
          label={ 'Nom' }
          iconClass={ FontMaterialIcons }
          iconName={'face'}
          iconColor={ colors.lightBlue }
          labelStyle={ fonts.style.textInput }
          inputStyle={{ color: colors.darkGray  }} 
          selectTextOnFocus={ true }
          value={user.last_name}
          onChangeText={
            (value) => this.props.setUserData({
              ...user, last_name: value
            })
          }
        />
        <Separator color={colors.separatorText} />
        <Kohana
          style={{ backgroundColor: colors.white  }}
          label={ 'Email' }
          iconClass={ FontMaterialIcons }
          iconName={'email'}
          iconColor={ colors.lightBlue }
          labelStyle={ fonts.style.textInput }
          inputStyle={{ color: colors.darkGray  }} 
          selectTextOnFocus={ true }
          value={user.email}
          onChangeText={
            (value) => this.props.setUserData({
              ...user, email: value
            })
          }
        />
        <Separator color={colors.separatorText} />
        <DateProfile 
          text={'Date de naissance'}
          onDateChange={(date = null) => this.props.onChangeDate(date)}
          maximumDate={new Date(2005,1,1)}
          minimumDate={new Date(1910,1,1)}
          date={user.birthday || new Date()}
        />
        <Separator color={colors.separatorText} />
        <Kohana
          style={{ backgroundColor: colors.white  }}
          label={ 'Adresse' }
          iconClass={ FontMaterialIcons }
          iconName={'place'}
          iconColor={ colors.lightBlue }
          labelStyle={ fonts.style.textInput }
          inputStyle={{ color: colors.darkGray  }} 
          selectTextOnFocus={ true }
          value={user.street}
          onChangeText={
            (value) => this.props.setUserData({
              ...user, street: value
            })
          }
        />
        <Separator color={colors.separatorText} />
        <Kohana
          style={{ backgroundColor: colors.white  }}
          label={ 'Ville' }
          iconClass={ FontMaterialIcons }
          iconName={'location-city'}
          iconColor={ colors.lightBlue }
          labelStyle={ fonts.style.textInput }
          inputStyle={{ color: colors.darkGray  }} 
          selectTextOnFocus={ true }
          value={user.city}
          onChangeText={
            (value) => this.props.setUserData({
              ...user, city: value
            })
          }
        />
      </View>
    );
  }
}

const style= StyleSheet.create({ 
  formContainer: { 
    flex:1,  
  },
   boldCenter: {
    textAlign: 'center',
    marginVertical: metrics.baseMargin,
    fontWeight: 'bold',
  },
});