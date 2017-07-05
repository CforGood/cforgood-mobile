import React, { PureComponent } from 'react';
import {
  Text,
  View,
} from 'react-native';

import OnboardingDetail from './OnboardingDetail';

import {
  colors,
  fonts,
  metrics,
} from '../../themes';


export default class Member extends PureComponent {

  state = {
    index: 0,
  };

  render() {
    return (<OnboardingDetail
      index={3}
      currentIndex={this.state.index}
      source={require('../../resources/onboarding/4.png')}
      title={(<Text style={[style.text, fonts.style.mediumBold]}>Pour devenir membre ?</Text>)}
      text={(<View>
        <Text style={style.text}>
          Faites un <Text style={fonts.style.mediumBold}> don </Text> à une association
          </Text>
        <Text style={style.text}>
          ou <Text style={fonts.style.mediumBold}> invitez vos amis sur l’app ! </Text>
        </Text>
      </View>)}
      cta={() => this.props.scroll(true)}
    />);
  }
}

var style = {
  text: {
    ...fonts.style.t22,
    textAlign: 'center',
  },
};
