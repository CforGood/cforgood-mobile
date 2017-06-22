import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import Button from '../components/common/ButtonGradiant';
import Header from '../components/common/Header';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

class ReservedSpaceScreen extends Component {

  render() {

    return (
      <View style={styles.screen.mainContainer}>
        <Header
          close={true}
        />
        <View style={{
          flex: 1,
          marginHorizontal: metrics.marginApp
        }}
        >
          <View style={[
            {
              flex: 1,
              alignItems: 'center',
            }
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
                marginVertical: metrics.baseMargin,
                color: colors.darkGray
              }
            ]}
            >

            </Text>
          </View>
          <View style={[
            styles.center,
            { flex: 1 }
          ]}
          >
            <Text style={[
              fonts.style.t22,
              fonts.style.bold,
              { textAlign: 'center' }
            ]}
            >
              Rejoignez la révolition positive
            </Text>
            <Text style={[
              fonts.style.t15,
              styleReservedSpaceScreen.desc
            ]}
            >
              Je trouve de nouveaux commerçants responsables, des associations engagées et
              des événements enthousiasmant chez moi ou dans les autres villes où je me rends.
            </Text>
          </View>
        </View>
        <Button
          onPress={() => this.props.navigation.navigate('Profile', {
            'tab': 'Abonnement'
          })}
          text={"Je deviens membre "}
        />
      </View>
    );
  }
}

export default ReservedSpaceScreen;

const styleReservedSpaceScreen = {
  button: {
    backgroundColor: colors.orange,
  },
  desc: {
    marginVertical: metrics.baseMargin,
    textAlign: 'center',
    lineHeight: 30
  }
}; 
