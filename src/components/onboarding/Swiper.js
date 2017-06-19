import React, { PureComponent } from 'react';
import {
  Text,
  Platform,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';


import OnboardingDetail from './OnboardingDetail';

import {
  colors,
  fonts,
  styles,
  metrics,
} from '../../themes';


class OnboardingSwiper extends PureComponent {

  state = {
    index: 0,
  };

  onMomentumScrollEnd = (e, state, context) => {
    this.setState({ index: state.index });
  }


  render() {
    return (
      <Swiper
        loop={false}
        showsButtons={true}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        buttonWrapperStyle={
          style.buttonWrapperStyle
        }
        nextButton={(
          <View />
        )}
        prevButton={(
          <View />
        )}
        dotColor={colors.lightGray}
        activeDotColor={colors.grey}
        dotStyle={style.dotStyle}
        activeDotStyle={style.activeDotStyle}
      >
        {/* First screen */}
        <OnboardingDetail
          index={0}
          styleImage={{
            width: metrics.deviceWidth
          }}
          currentIndex={this.state.index}
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


        />
        {/* Second screen */}
        <OnboardingDetail
          styleImage={{
            width: metrics.deviceWidth / 1.802
          }}
          index={1}
          currentIndex={this.state.index}
          source={require('../../resources/onboarding/2.png')}
          icon={require('../../resources/onboarding/bons_plan.png')}
          text={(<View>
            <Text style={style.text}>
              Bénéficiez des <Text style={fonts.style.mediumBold}>bons plans</Text>
            </Text>
            <Text style={style.text}>
              qu’ils proposent ...
            </Text>
          </View>)}
          textButton={'M’informer'}

        />
        {/* Third screen */}
        <OnboardingDetail
          styleImage={{
            width: metrics.deviceWidth / 2.07
          }}
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
          cta={() => { }}

        />
        {/* Four screen */}
        <OnboardingDetail
          styleImage={{
            width: metrics.deviceWidth / 2,
            height: metrics.deviceWidth / 2,
          }}
          index={3}
          currentIndex={this.state.index}
          source={require('../../resources/onboarding/4.png')}
          title={(<Text style={[style.text, fonts.style.mediumBold]}>Pour devenir membre ?</Text>)}
          text={(<View>
            <Text style={style.text}>
              Faites un <Text style={fonts.style.mediumBold}> don </Text> à l’association
            </Text>
            <Text style={style.text}>
              de votre choix !
            </Text>
          </View>)}
          cta={() => { }}
        />
      </Swiper>
    );
  }
}

export default OnboardingSwiper;

var style = {
  buttonWrapperStyle: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: Platform.OS === 'android' ? metrics.doubleBaseMargin + metrics.baseMargin : metrics.baseMargin
  },
  dotStyle: {
    marginLeft: metrics.smallMargin,
    marginRight: metrics.smallMargin,
    top: -metrics.deviceHeight + 80,
    zIndex: 10,
  },
  activeDotStyle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginLeft: metrics.smallMargin,
    marginRight: metrics.smallMargin,
    top: -metrics.deviceHeight + 80,
    zIndex: 10,
  },
  text: {
    ...fonts.style.t22,
    textAlign: 'center',
  },
};
