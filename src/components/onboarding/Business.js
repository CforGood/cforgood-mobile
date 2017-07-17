import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Alert,
  Image,
} from 'react-native';
import Permissions from 'react-native-permissions';

import OnboardingDetail from './OnboardingDetail';
import ConfirmPopup from '../Modal/ConfirmPopup';
import WarningPopup from '../Modal/WarningPopup';
import AuthorizeLocation from '../authorize/Location';
import ErrorView from '../common/ErrorView';


import {
  colors,
  fonts,
  metrics,
} from '../../themes';

class Business extends PureComponent {

  state = {
    error: '',
    verify: false,
  };

  handleError = (error) => {
    this.setState({ error });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
        <AuthorizeLocation
          nextStep={() => this.props.scroll()}
          verify={this.state.verify}
          handleError={this.handleError}
        />
        <OnboardingDetail
          source={require('../../resources/onboarding/1.png')}
          icon={require('../../resources/onboarding/commerce.png')}
          text={(<View>
            <Text style={style.text}>
              Trouvez les <Text style={fonts.style.mediumBold}>meilleurs</Text>
            </Text>
            <Text style={style.text}>
              <Text style={fonts.style.mediumBold}>commerces</Text> autour de vous
            </Text>
          </View>)}
          textButton={'Me localiser'}
          onPress={() => this.setState({ verify: true })}
        />

      </View>
    );
  }
}


export default (Business);

const style = {
  text: {
    ...fonts.style.t20,
    textAlign: 'center',
  },
  message: {
    ...fonts.style.t16,
    color: colors.textPoppup,
    textAlign: 'center',
  }
};
