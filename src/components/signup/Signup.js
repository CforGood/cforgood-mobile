import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Animated,
  Easing,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';

import ButtonConnect from '../common/Button';
import Separator from '../common/Separator';
import Button from '../common/Button';
import GooglePlaces from './GooglePlaces';


import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class Signup extends Component {
  
  state = {
    user: this.props.user,
    failed: false,
    animatedValue:  new Animated.Value(0),
    chooseCity: false
  };

  signup() {

    if(this.state.validForm){  
      this.props.signup(this.state.user);
    }
  }

  focusNextField = (field) => {
    field.focus();
  }

  setCity = (address) => {
    

    const postal_code = address.address_components.find(a => a.types && 
      a.types.includes('postal_code')
    )
    const city = address.address_components.find(a => a.types.includes('locality'));

    if(city && postal_code){
      this.setState((prevState) => ({
        user: {
          ...prevState.user,
          zipcode: postal_code && postal_code.short_name,
          city: city.long_name,
        },
        chooseCity: false,
      }))
    }
    else {
      Alert.alert(
        'Erreur',
        'Pas de code postal avec la ville sélectionné',
        [
          {text: 'Fermer', onPress: () => this.setState({chooseCity: false})},
        ]
      );
    }
  }
  
  componentWillUpdate(nextProps, nextState) {
    if(
        nextState.user.email &&
        nextState.user.password &&
        nextState.user.last_name &&
        nextState.user.first_name &&
        nextState.user.zipcode &&
        !nextState.validForm
      )
    {
      this.setValidForm(true);
    }
  }

  setValidForm = (valid) => {
    this.setState({validForm: valid})
  }

  componentDidMount() {
    this.focusNextField(this.first_name);
    this.animated();
  }

  animated = () => {
    
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }
    ).start();
  }

  render() {

    const marginTop = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        (metrics.deviceHeight)/5, 
        0
      ]
    });

    return (
      <Animated.View 
        style={[
          styles.screen.container,
          {
            marginTop
          }
        ]}
      > 
        <Text style={[
            fonts.style.textWhite,
            style.text,
            fonts.style.h9
          ]}
        > 
          Créer votre compte :
        </Text>
        <View style={style.formContainer }>
          
          <Kohana
            style={{ backgroundColor: colors.white  }}
            label={ 'Prénom' }
            iconClass={ FontMaterialIcons }
            iconName={'face'}
            iconColor={ colors.lightBlue }
            labelStyle={ fonts.style.textInput }
            inputStyle={{ color: colors.darkGray  }}
            selectTextOnFocus={ true }
            onSubmitEditing={() => this.focusNextField(this.last_name)}
            ref={ref => { this.first_name = ref }}
            value={ this.state.user.first_name }
            onChangeText={(first_name) => 
              this.setState((prevState) => ({
                user: {...prevState.user , first_name}
              }))
            }
          />
          <Separator 
            color={this.state.user.last_name ? colors.lightBlue : colors.separatorText}
            margin={metrics.smallMargin}
          />
          <Kohana
            style={{ backgroundColor: colors.white  }}
            label={ 'Nom' }
            iconClass={ FontMaterialIcons }
            iconName={'face'}
            iconColor={ colors.lightBlue }
            labelStyle={ fonts.style.textInput }
            inputStyle={{ color: colors.darkGray  }}
            onChangeText={(last_name) => 
              this.setState((prevState) => ({
                user: {...prevState.user , last_name}
              }))
            }
            selectTextOnFocus={ true }
            onSubmitEditing={() => this.focusNextField(this.email)}
            ref={ref => { this.last_name = ref }}
            value={ this.state.user.last_name }
          />
          
          <Separator
            color={
              this.state.user.first_name
              ? colors.lightBlue
              : colors.separatorText
            }
            margin={metrics.smallMargin}
          />
          <Kohana
            style={{ backgroundColor: colors.white  }}
            label={ 'Email' }
            iconClass={ FontMaterialIcons }
            iconName={'email'}
            iconColor={ colors.lightBlue }
            labelStyle={ fonts.style.textInput }
            inputStyle={{ color: colors.darkGray  }}
            selectTextOnFocus={ true }
            onSubmitEditing={() => this.focusNextField(this.password)}
            ref={ref => { this.email = ref }}
            value={ this.state.user
              &&
              this.state.user.email
              && this.state.user.email.toLowerCase() }
            onChangeText={(email) => 
              this.setState((prevState) => ({
                user: {...prevState.user , email}
              }))
            }
          />
          <Separator
            color={this.state.user.email ? colors.lightBlue : colors.separatorText}
            margin={metrics.smallMargin}
          />
          <Kohana
            ref={ref => { this.password = ref }}
            style={{ backgroundColor: colors.white }}
            label={ 'Mot de passe'}
            iconClass={ FontMaterialIcons }
            iconName={'lock'}
            iconColor={ colors.lightBlue }
            labelStyle={ fonts.style.textInput }
            inputStyle={{ color: colors.darkGray  }}

            secureTextEntry={ true }
            value={ 
              this.state.user.password
            }
            onSubmitEditing={() => this.focusNextField(this.code_partner)}
            onChangeText={(password) => 
              this.setState((prevState) => ({
                user: {...prevState.user , password}
              }))
            }
          />
          <Separator
            color={this.state.user.password ? colors.lightBlue : colors.separatorText}
            margin={metrics.smallMargin}
          />
          <Kohana
            style={{ backgroundColor: colors.white  }}
            label={ 'Code partenaire ' }
            iconClass={ FontMaterialIcons }
            iconName={'code'}
            iconColor={ colors.lightBlue }
            labelStyle={ fonts.style.textInput }
            inputStyle={{ color: colors.darkGray  }}
            selectTextOnFocus={ true }
            onSubmitEditing={() => this.signup()}
            ref={ref => { this.code_partner = ref }}
            value={ 
              this.state.user.code_partner
              &&
              this.state.user.code_partner.toUpperCase()
            }
            onChangeText={(code_partner) => 
              this.setState((prevState) => ({
                user: {...prevState.user , code_partner}
              }))
            }
          />
          <Separator
            color={this.state.user.code_partner ? colors.lightBlue : colors.separatorText}
            margin={metrics.smallMargin}
          />
          <Button
            styleButton={{
              backgroundColor: colors.white,
              justifyContent: 'center',
              height: metrics.inputHeight
            }}
            styleText={[
              fonts.style.DateInput,
              {
                textAlign: 'left',
              },
              this.state.user.city ? { color: colors.darkGray } : {}
            ]}
            text={this.state.user.city ?
             (this.state.user.zipcode + ' ' + this.state.user.city)
             :
             'Code Postal'
            }
            onPress={() => this.setState({chooseCity: true})}
          />
        </View>
        <View 
          style={{
            marginTop: metrics.doubleBaseMargin*2
          }}
        >  
          <ButtonConnect  
            text={'S\'inscrire'}
            onPress={() => this.signup()}
            styleButton={{
              backgroundColor: 
              (
                this.state.validForm ?
                colors.lightBlue
                :
                colors.lightGray
              )
            }}
            styleText={{fontWeight: 'normal'}}
          />   
        </View>
        <GooglePlaces
          onClose={() => this.setState({chooseCity: false})}
          onSelectCity={(address) => this.setCity(address)}
          visible={this.state.chooseCity}
        />
      </Animated.View>
    )
  }
}

const style = StyleSheet.create({ 
  text: { 
    marginBottom: metrics.baseMargin,
    textAlign: 'center',
  },
  input: {
    height: metrics.buttonHeight,
    borderRadius: metrics.radius,
    borderColor:colors.white, 
    backgroundColor:colors.white ,  
    borderWidth: metrics.borderWidth,
  },
  formContainer: { 
    height: ( 
      metrics.inputHeight 
    ) * 7 + 1,
    backgroundColor: colors.white, 
    borderRadius: metrics.radius ,     
    borderWidth:metrics.borderWidth,
    borderColor: colors.white,
    paddingHorizontal: metrics.smallMargin
  },
});
const mapStateToProps = state => ({
  LoggedIn: state.auth.LoggedIn,
  failure: state.auth.failure,
});

export default connect(mapStateToProps)(Signup);
