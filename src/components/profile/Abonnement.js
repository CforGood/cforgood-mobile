import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';

import {
  styles,
  fonts,
  metrics,
  colors,
} from '../../themes';

import { updateUserData } from '../../redux/actions/user';

import Separator from '../../components/common/Separator';
import ButtonUpdate from '../../components/common/Button';

import Item from './Item';
import Amount from './Amount'; 
import Histories from './Histories'; 


const monthlyMinAmount = 1;
const monthlyMaxAmount = 50;
const yearlyMinAmount = 30;
const yearlyMaxAmount = 500;
const minLeft = 1;
const maxLeft = (metrics.deviceWidth - metrics.marginApp*2 - 25);
const realAmountPercent = 0.34;

class Abonnement extends PureComponent {

  updateMember(){
    this.props.updateUserData(this.props.user.id, {subscritpion: 'X'});
  }

  OpenMember() {
    this.props.navigation.navigate(
      'WebView',
      { 
        url: `https://app.cforgood.com/member/users/${this.props.user.id}/profile#subscription`, 
        title: 'Mettre à jour CB'
      }
    )
  }

  render() {
    const { user } =  this.props;

    if(user.supervisor_attributes && user.supervisor_attributes.supervisor_name){
      return null;
    }
    return (
      <View style={styles.screen.mainContainer}>
        <Text
          style=
          {[ 
             fonts.style.t20, 
             style.boldCenter,
           ]}
        >
          Participation
        </Text>
        <Text style={style.title} >
          Choisissez le rythme et le montant de votre participation
        </Text>

        <Amount
          setUserData={this.props.setUserData}
          user={user}
        />
 
        <Separator color={colors.separatorLine} />
        <Text 
           style={[ 
             fonts.style.t16, 
             style.boldCenter
            ]} 
        >
          Historique des paiements
        </Text>

        <Histories 
          user={user}
          type='amount'
        />

        <Separator color={colors.separatorLine} style ={{marginVertical : 20}} /> 
        <Text 
           style={[ 
             fonts.style.t16, 
             style.boldCenter
            ]} 
        >
          Code promo
        </Text>
       
        <View style ={[styles.center, styles.row]}>
          <View style={{flex: 1}} />
          <View style={style.partner}>
            <Text style={style.textPartner} >
              {user.code_partner} 
            </Text>
          </View>
          
          <View style={{flex: 1}} />
        </View>
       
        <Separator color={colors.separatorLine} style ={{marginVertical : 20}} /> 
        <Text style={style.boldCenter} >
          Coordonnées bancaires
        </Text> 
        <ButtonUpdate 
          text={'Mettre à jour CB'}
          styleButton={style.update}
          styleText={[fonts.style.textButton , { color : colors.darkGray } ]}
          onPress={() => this.OpenMember()}

        /> 
        <TouchableOpacity 
          onPress={() => this.updateMember()}
        >
          <Text
            style={[fonts.style.t16, { textAlign: 'center'}]}
          >
            Je me désabonne
          </Text>
        </TouchableOpacity>
       
  
      </View>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  updateUserData: bindActionCreators(updateUserData, dispatch),
});

export default connect(null,mapDispatchToProps)(withNavigation(Abonnement));

const style = StyleSheet.create({  
  title: {    
    color: colors.darkGray,
    fontFamily: fonts.type.base,
    fontSize: fonts.size.t17, 
    textAlign: 'center',
    fontWeight: 'bold', 
    marginVertical: metrics.baseMargin,
  },
  boldCenter: {
    textAlign: 'center',
    marginVertical: metrics.baseMargin,
    fontWeight: 'bold',
  },
  update: {
    backgroundColor: colors.white, 
    borderRadius: metrics.buttonHeight / 2,
    height: metrics.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: metrics.baseMargin,
    borderWidth: 1,
    borderColor: colors.grayDate,
    marginHorizontal: metrics.doubleBaseMargin ,
    marginVertical: metrics.doubleBaseMargin,
  },
  Separator: {
    height:metrics.deviceWidth /3, 
    paddingHorizontal: 5, 
    backgroundColor: '#979797',
  },
  SlideContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  partner: {
    backgroundColor : colors.code_partenaire, 
    borderWidth : 2, 
    height: 50,
    width: 199,
    borderRadius : 5,
    borderColor : colors.textinput,
    justifyContent: 'center',
  },
  textPartner: {
    textAlign: 'center',
    color: colors.darkGray
  }
}); 

