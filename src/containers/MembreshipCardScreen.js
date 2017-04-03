import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
  
import Button from '../components/common/ButtonGradient'; 
import Header from '../components/common/Header';
import Card from '../components/profile/Card';
import Modal from '../components/Modal';

import { businessType, perkType } from '../types';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

class MembreshipCardScreen extends PureComponent { 

  static propTypes = {
    visible:  PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    business: businessType.isRequired,
    perk: perkType.isRequired
  };


  static defaultProps = { 
    visible: true,
  };


  render() {
    const { onClose, onValidate, visible, business, perk } = this.props;

    return (
      <Modal
        onClose={onClose}
        animationType={'none'}
        blurType={'xlight'}
        visible={visible}
      > 
        <View style={styles.screen.mainContainer}>
          
          <View style={{
              flex:1, 
              margin: metrics.marginApp
            }}
          > 
            <View style={[
                styles.center,
                { 
                  flex:1,
                  marginVertical: metrics.baseMargin,
                }
              ]}
            > 
              <Text style={[ 
                  fonts.style.t18,  
                  {fontWeight: 'bold'}
                ]}
              >
                {business.name}
              </Text> 
              <Text style={[ 
                  fonts.style.h9,  
                ]}
              >
                {perk.name.toLowerCase()}
              </Text> 
            </View>  
            <View style={{height: 213}}>
              <Card /> 
            </View>
            <View style={[
                styles.center,
                {flex:2}
              ]}
            >   
              <Text style={styleMembreshipCardScreen.description} >  
                ” La carte de membre doit être montrée au commerçant après la prise de commande, 
                cliquez ensuite sur Terminer pour valider votre bon plan ”
              </Text>  
            </View> 
          </View>
          <Button 
            onPress={onValidate} 
            text={"Terminer"} 
          />
        </View>      
      </Modal>
    );
  }
}

export default MembreshipCardScreen;

const styleMembreshipCardScreen = { 
  marginVertical: {
    marginVertical: metrics.doubleBaseMargin,
  },  
  description: { 
    color: colors.darkGray,
    fontFamily: fonts.type.base,
    fontSize: fonts.size.regular,
    marginVertical: metrics.baseMargin,
    textAlign: 'center' 
  }
}; 
