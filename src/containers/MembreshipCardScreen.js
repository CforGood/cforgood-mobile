import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  BackAndroid,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NavigationActions } from 'react-navigation';

import Button from '../components/common/ButtonGradient';
import Card from '../components/profile/Card';
import Modal from '../components/Modal';

import { use } from '../redux/actions/review';
import { setBusiness } from '../redux/actions/business';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

class MembreshipCardScreen extends PureComponent {

  onValidate = () => {
    const { business, perk } = this.props.navigation.state.params;

    this.props.use(perk, business, true);

    if (Platform.OS === 'android') {
      this.props.setBusiness(null);
    }

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Maps' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
  }

  handleBackAndroid = () => {
    return true;
  }



  render() {
    const { business, perk } = this.props.navigation.state.params;

    return (
      <View style={styles.screen.mainContainer}>
        <View style={{
          flex: 1,
          margin: metrics.marginApp
        }}
        >
          <View style={[
            styles.center,
            {
              flex: 1,
              marginVertical: metrics.baseMargin,
            }
          ]}
          >
            <Text style={[
              fonts.style.t18,
              { fontWeight: 'bold' }
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
          <View style={{ height: 213 }}>
            <Card />
          </View>
          <View style={[
            styles.center,
            { flex: 2 }
          ]}
          >
            <Text style={styleMembreshipCardScreen.description} >
              ” La carte de membre doit être montrée au commerçant après la prise de commande,
              cliquez ensuite sur
              <Text style={[styleMembreshipCardScreen.description, { fontWeight: 'bold' }]} >{" << Terminer >> "}</Text>
              pour valider votre bon plan ”
            </Text>
          </View>
        </View>
        <Button
          onPress={this.onValidate}
          text={"Terminer"}
        />
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  use: bindActionCreators(use, dispatch),
  setBusiness: bindActionCreators(setBusiness, dispatch),
});

export default connect(null, mapDispatchToProps)(MembreshipCardScreen);

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
