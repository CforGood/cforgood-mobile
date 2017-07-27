import React, { PureComponent } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import OnboardingDetail from './OnboardingDetail';
import PopupVideo from './PopupVideo';
import ErrorView from '../common/ErrorView';
import Background from '../common/Background';

import {
  colors,
  fonts,
  metrics,
} from '../../themes';


class Association extends PureComponent {

  state = {
    visiblePopupVideo: false,
    play: false,
  };

  goToNextPage = () => {
    this.setState(
      { visiblePopupVideo: false },
      () => this.props.navigation.navigate('Home')
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
        <OnboardingDetail
          index={3}
          source={require('../../resources/onboarding/4.png')}
          title={(<Background
            style={{
              padding: 3,
            }}
          ><Text style={[style.text, fonts.style.mediumBold]}>Pour devenir membre ?</Text></Background>)}
          text={(<View>
            <Text style={style.text}>
              Faites un<Text style={fonts.style.mediumBold}> don </Text>à une association
          </Text>
            <Text style={style.text}>
              ou<Text style={fonts.style.mediumBold}> invitez vos amis sur l’app ! </Text>
            </Text>
          </View>)}
          cta={() => this.setState({ visiblePopupVideo: true })}
        />
        <PopupVideo
          visiblePopup={
            this.state.visiblePopupVideo
            &&
            !this.state.play
          }
          goToNextPage={this.goToNextPage}
          play={() => this.setState({ play: true })}
        />
      </View>);
  }
}

var style = {
  text: {
    ...fonts.style.t20,
    textAlign: 'center',
    backgroundColor: 'white',
    paddingVertical: 4,
    paddingHorizontal: metrics.baseMargin,
  },
};
export default withNavigation(Association);

