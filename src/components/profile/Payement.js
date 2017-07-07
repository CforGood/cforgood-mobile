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

import ButtonGradiantRadius from '../../components/common/ButtonGradiantRadius';
import ButtonUpdate from '../../components/common/Button';

import Item from './Item';
import Amount from './Amount';



class Payement extends PureComponent {

  render() {
    const { user } = this.props;

    if (user.supervisor_attributes && user.supervisor_attributes.supervisor_name) {
      return null;
    }
    return (
      <View>
        <View style={{
          ...style.center,
          marginBottom: metrics.doubleBaseMargin
        }}
        >
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
            Choisissez le rythme et le montant de votre participation, libre et sans engagement.
          </Text>
          <Text
            style={{
              ...fonts.style.t13, color: colors.textinput
            }}
          >
            "C'est notre seule source de revenu : )"
          </Text>
        </View>
        <Amount {...this.props} />
      </View>

    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  updateUserData: bindActionCreators(updateUserData, dispatch),
});

export default connect(null, mapDispatchToProps)(withNavigation(Payement));

const style = StyleSheet.create({
  title: {
    color: colors.darkGray,
    fontFamily: fonts.type.base,
    fontSize: fonts.size.t16,
    textAlign: 'center',
    fontWeight: fonts.fontWeight.f500,
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
    marginHorizontal: metrics.doubleBaseMargin,
    marginVertical: metrics.doubleBaseMargin,
  },
  Separator: {
    height: metrics.deviceWidth / 3,
    paddingHorizontal: 5,
    backgroundColor: '#979797',
  },
  SlideContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  partner: {
    backgroundColor: colors.code_partenaire,
    borderWidth: 2,
    height: 50,
    width: 199,
    borderRadius: 5,
    borderColor: colors.textinput,
    justifyContent: 'center',
  },
  textPartner: {
    textAlign: 'center',
    color: colors.darkGray,
    flex: 1,
  }
});

