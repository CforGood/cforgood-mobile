import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import Button from '../components/common/ButtonGradient';
import Header from '../components/common/Header';
import Modal from '../components/Modal';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

class ReservedSpaceScreen extends Component { 

  props: {
    onClose: () => mixed,
    visible: false
  };

  render() {
    const {
      onClose,
      onValidate,
      visible,
      color,
      image,
    } = this.props;

    return (
      <Modal
        onClose={onClose}
        animationType={'slide'}
        blurType={'xlight'}
        blurAmount={10}
        visible={this.props.visible}
        image={image}
      > 
        <View style={styles.screen.container}> 
          <Header 
            close={true}
            onClose={onClose}
          />
          <View style={{
              flex:1, 
              margin: metrics.marginApp
            }}
          >
            <View style={[
                styles.center,
                {flex:1}
              ]}
            >
              <Image 
                style={{
                  height: metrics.images.logo * 0.9,
                  width: metrics.images.logo * 0.9,      
                }}
                source={require('../resources/images/logo.png')}
              />
              <Text style={[ 
                  fonts.style.h9, 
                  {
                    color: colors.darkGray,
                    marginVertical: metrics.baseMargin,
                  }
                ]}
              >
                Espace réservé aux abonnés
              </Text> 
            </View> 
 

            <View style={[
                styles.center,
                {flex:1}
              ]}
            >  
              <Text style={[ 
                  fonts.style.t22, 
                  {color: colors.darkGray,}
                ]}
              >
                Rejoignez la révolition positive
              </Text> 
              <Text style={[  
                  {
                    color: colors.darkGray,
                    fontFamily: fonts.type.base,
                    fontSize: fonts.size.regular,
                    marginVertical: metrics.baseMargin,
                    textAlign: 'center'
                  }
                ]}
              >  
                Je trouve de nouveaux commerçants responsables, des associations engagées et des événements enthousiasmant chez moi où dans les autres villes ou je me rends.
              </Text>  
            </View> 
          </View>
          <Button
            onPress={onValidate} 
            type={'simple'} 
            style={{
              backgroundColor: this.props.color
            }} 
            text={" Je m'inscris "} 
          />
        </View>
      </Modal>     
    );
  }
}

export default ReservedSpaceScreen;

const styleReservedSpaceScreen = { 
  button:{
    backgroundColor: colors.orange, 
  },
}; 
