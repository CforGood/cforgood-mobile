import React, { PureComponent } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import OnboardingDetail from './OnboardingDetail';
import PopupVideo from './PopupVideo';
import ErrorView from '../common/ErrorView';

import {
  colors,
  fonts,
  metrics,
} from '../../themes';


class Association extends PureComponent {

  state = {
    visiblePopupVideo: false,
  };

  goToNextPage = () => {
    this.setState(
      { visiblePopupVideo: false },
      () => this.props.navigation.navigate('SignUpFirstname')
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ErrorView 
          message={this.state.error}
          removeError={() => this.setState({error: ''})}
        />
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
          cta={() => this.setState({ visiblePopupVideo: true })}
        />
        <PopupVideo
          visiblePopup={this.state.visiblePopupVideo}
          goToNextPage={this.goToNextPage}
        />

      </View>);
  }
}

var style = {
  text: {
    ...fonts.style.t20,
    textAlign: 'center',
  },
};
export default withNavigation(Association);

