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
import Modal from '../Modal';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class PopupValidation extends PureComponent { 
  props: {
    onClose: () => mixed,
    onValidate: () => mixed,
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
            <View style={styles.center}>
              <Image
                resizeMode='contain'  
                source={{uri: association.logo}}
                style={{
                  width: 169,
                  height: 135
                }}
              />
            </View>
            <View 
              style={[
                styles.screen.container,
                {
                  padding: metrics.baseMargin,
                  justifyContent: 'space-around',
                }
              ]}
            >
              <Text 
                style={[
                  fonts.style.t20,
                  fonts.style.mediumBold,
                  styleValidation.center
                ]}
              >
                Vous allez faire quelque chose de chouette !
              </Text>
              <Text style={[
                  fonts.style.normal,
                  fonts.style.mediumBold,
                  styleValidation.center
                ]}
              >
                {`En validant votre choix, vous allez soutenir ${association.name}.`}
              </Text>
              <Button
                text={" Valider "}
                styleButton={styleValidation.button}
                onPress={onValidate}
              />
            </View>
            <Back 
              close={true} 
              style={styleValidation.black}
              onPress={onClose}
            />
          </View>
        </Image>
      </Modal>
    );
  }
}

export default PopupValidation;

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
    backgroundColor: 'white'
  },
  black: {
    position: 'absolute',
    right: metrics.baseMargin,
    top: metrics.baseMargin,
  },
  center: {
    textAlign: 'center' 
  },
  button: {
    marginBottom: metrics.baseMargin,
    borderRadius: metrics.buttonHeight / 2,
    height: metrics.buttonHeight, 
  }

}; 
