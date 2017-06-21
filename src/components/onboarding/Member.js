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
      index={2}
      currentIndex={this.state.index}
      source={require('../../resources/onboarding/3.png')}
      icon={require('../../resources/onboarding/member.png')}
      text={(<View>
        <Text style={style.text}>
          ... Simplement en montrant
        </Text>
        <Text style={style.text}>
          votre
          <Text style={fonts.style.mediumBold}> carte de membre</Text>
        </Text>
      </View>)}
      textButton={null}
      cta={() => this.props.scroll()}

    />);
  }
}

var style = {
  text: {
    ...fonts.style.t22,
    textAlign: 'center',
  },
};
