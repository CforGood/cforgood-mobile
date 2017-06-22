import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  styles,
  fonts,
  metrics,
  colors,
} from '../themes';
import { updateUserData } from '../redux/actions/user';

import Header from '../components/common/Header';
import Button from '../components/common/ButtonGradiant';
import ButtonGradiantRadius from '../components/common/ButtonGradiantRadius';
import CreditCardInput from '../modules/CreditCardInput';
//API
import ApiHandler from '../utils/api';

class ProfileCreditCardScreen extends Component {

  state = {
  };

  componentWillMount() {
  }

  render() {
    const { user } = this.state;
    return (
      <View style={styles.screen.mainContainer}>
        <Header type={'simple'} title={'Ajouter une CB'} />
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[
              fonts.style.t20,
              fonts.style.mediumBold,
              { marginBottom: 10 }
            ]}
            >
              Renseignez vos données bancaires
            </Text>
            <Text style={[
              fonts.style.t15,
              { color: colors.textLightGray, marginBottom: 10 }
            ]}>
              Participation choisie de
              <Text style={fonts.style.mediumBold}>{' 85 € mensuel'}</Text>
            </Text>
          </View>
          <View style={{ flex: 5 }}>
            <CreditCardInput
              onChange={this._onChange}
              cardImageFront={require('../resources/bg.jpg')}
              cardImageBack={require('../resources/bg.jpg')}
              cardFontFamily={fonts.type.base}
              labelStyle={fonts.style.t16}
              inputStyle={[fonts.style.t15, { color: colors.ignore }]}
              inputContainerStyle={{
                borderBottomColor: colors.ignore,
                borderBottomWidth: 2,
                flex: 1,
                marginHorizontal: metrics.marginApp,
              }}
              labels={{
                name: "CARDHOLDER'S NAME",
                number: "Numéro de carte",
                expiry: "Date d’expiration",
                cvc: "Cryptogramme visuel",
                postalCode: "Code postal",
              }}
              placeholders={{
                name: "Full Name",
                number: "**** **** **** ****",
                expiry: "MM/YY",
                cvc: "123",
                postalCode: "34567",
              }}
              placeholderColor={'white'}
            />
            <View style={styles.center}>
              <Text style={[
                fonts.style.t15,
                { color: colors.info, marginBottom: 20 }
              ]}
              >
                Informations légales
              </Text>
            </View>

          </View>
        </ScrollView>
        <View style={[{ height: 60 }, styles.center]}>

          <ButtonGradiantRadius
            onPress={() => { }}
            text={'Valider'}
          />
        </View>
        <Button
          onPress={() => {}}
          type={'simple'}
          style={{
            backgroundColor: 'white'
          }}
          styleText={{
            color: colors.ignore,
            ...fonts.style.t15,
          }}
          text={'Passer'}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: bindActionCreators(updateUserData, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileCreditCardScreen);

const style = StyleSheet.create({
  profileheader: {
    height: metrics.navBarHeight,
    justifyContent: 'center',
  },
  info: {
    height: 200,
    marginTop: metrics.baseMargin
  },
  profileForm: {
    flex: 1,
    paddingVertical: metrics.baseMargin
  },
  boldCenter: {
    textAlign: 'center',
    marginVertical: metrics.baseMargin,
    fontWeight: 'bold',
  },
});