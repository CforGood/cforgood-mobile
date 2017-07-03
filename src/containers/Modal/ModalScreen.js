import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import ModalSimple from '../../components/Modal/Simple';
import Background from '../../components/common/Background';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class ModalScreen extends Component {

  render() {

    return (
      <Background style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        {
          /*
          <ModalSimple
            title={
              <View>
              <Text style={[
                fonts.style.t20,
                { color: colors.white }
              ]}>
                'Au fait !'
              </Text>
              <Text style={[
                fonts.style.t20,
                { color: colors.white }
              ]}>
                {title}
              </Text>
            </View>
            }
            description={'Dans quellle ville êtes-vous actuellement ?'}
            image={require('../../resources/icons/start.png')}
          />
          */
        }

        {
          /*
          <ModalSimple
            title={
              <View style={styles.center}>
                <Text style={[
                  fonts.style.t20,
                  { color: colors.white }
                ]}>
                  Profitez des dernières
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[
                    fonts.style.t20,
                    { color: colors.white }
                  ]}>
                    découvertes et des
                </Text>
                  <Text style={[
                    fonts.style.t20,
                    fonts.style.bold,
                    {
                      color: colors.white,
                      marginLeft: metrics.smallMargin
                    }
                  ]}>
                    bons
                </Text>
                </View>
                <Text style={[
                  fonts.style.t20,
                  fonts.style.bold,
                  { color: colors.white }
                ]}>
                  plans flash !
              </Text>
              </View>
            }
            description={'Ça vous tente ?'}
            image={require('../../resources/icons/start.png')}
          />
          */
        }
      </Background>
    );
  }
}

export default ModalScreen;

const style = {
}; 
