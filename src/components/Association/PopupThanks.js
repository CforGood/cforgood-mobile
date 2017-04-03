import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import Button from '../common/Button';
import Back from '../common/Back';
import Modal from '../Modal/WidthRNModal';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class PopupThanks extends PureComponent { 
  props: {
    onClose: () => mixed,
    visible: false
  };

  render() {
    const { onClose, onValidate, visible, association } = this.props;

    return (
      <Modal
        onClose={onClose}
        animationType={'fade'}
        blurType={'light'}
        visible={visible}
      >  
        <Image 
          style={styleValidation.popup}
          source={require('../../resources/images/popup.png')}    
        > 
          <View 
            style={[ 
              styleValidation.container
            ]}     
          >  
            <Text style={styleValidation.tThanks}>
              Merci !
            </Text>
            <Image
              resizeMode='contain' 
              source={require('../../resources/icons/in-love.png')}
              style={{
                height: 186,
                width: 173
              }}
            />
            <View style={styles.screen.container}>
              <Text style={styleValidation.tNew}>
                Vous soutenez maintenant
              </Text>
              <Text style={styleValidation.tFoundation}>
                {association.name} !
              </Text> 
            </View>
          </View>
        </Image>
      </Modal>
    );
  }
}

export default PopupThanks;

const styleValidation = {  
  popup: {
    width: metrics.deviceWidth - metrics.marginApp*2, 
    height: metrics.deviceHeight/1.69,
    left: metrics.marginApp,
  },
  container: {
    flex: 1,   
    borderColor: colors.blueAssociation,
    borderWidth: 2, 
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tThanks: {
    fontFamily: fonts.type.base,
    fontSize: 24,
    marginVertical: metrics.baseMargin,
    textAlign: 'center',
    color: colors.blueAssociation,
  },
  tNew: {
    fontFamily: fonts.type.base,
    fontSize: 20,
    marginVertical: metrics.baseMargin,
    textAlign: 'center',
    color: colors.blueAssociation,
  },
  tFoundation: {
    fontFamily: fonts.type.base,
    fontSize: 24,
    marginVertical: metrics.baseMargin,
    textAlign: 'center',
    fontWeight: '300'
  }, 
}; 
