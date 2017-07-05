import React, { PureComponent } from 'react';
import {
  Text,
  View,
} from 'react-native';

import OnboardingDetail from './OnboardingDetail';
import PopupVideo from './PopupVideo';

import {
  colors,
  fonts,
  metrics,
} from '../../themes';


export default class Member extends PureComponent {

  state = {
    visiblePopupVideo: false,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>

        <OnboardingDetail
          index={3}
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
          cta={() => this.setState({visiblePopupVideo: true})}
        />
        <PopupVideo visiblePopup={this.state.visiblePopupVideo} />

      </View>);
  }
}

var style = {
  text: {
    ...fonts.style.t22,
    textAlign: 'center',
  },
};
