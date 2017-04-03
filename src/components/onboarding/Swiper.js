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
    this.setState({index: state.index});
  }


  componentWillUpdate(nextProps, nextState){
    if(this.state.index === 2 && nextState.index === 3){
      this.props.setLastPage(true);
    }
    else if(this.state.index === 3 && nextState.index === 2){
      this.props.setLastPage(false);
    }
  }


  render() {
    return (
      <Swiper
        loop={false}
        showsButtons={true}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        buttonWrapperStyle={
          styleOnboardingSwiper.buttonWrapperStyle
        }
        nextButton={(
          <Text 
            style={[
              fonts.style.activateText,
              { fontWeight: 'bold' }
            ]}
          >
            {'Suivant'}
          </Text>
        )}
        prevButton={(
          <View/>
        )}
        dotColor={colors.lightGray}
        activeDotColor={colors.lightBlue}
        dotStyle={styleOnboardingSwiper.dotStyle}
        activeDotStyle={styleOnboardingSwiper.activeDotStyle}
      >
        {/* First screen */} 
        <OnboardingDetail
          index={0}
          styleImage={{
            width: metrics.deviceWidth
          }}
          currentIndex={this.state.index}
          source={require('../../resources/images/map.png')} 
          firstText={'Je découvre ma ville autrement en'}
          firstText1={'localisant les commerces responsables'}
          firstText2={'autour de moi.'}
        /> 
        {/* Second screen */}
        <OnboardingDetail
          styleImage={{
            width: metrics.deviceWidth / 1.802
          }}
          index={1}
          currentIndex={this.state.index}
          source={require('../../resources/images/plan.png')}
          firstText={'Je profite de bons plans et réductions'}
          firstText1={'chez chacun d’eux, grâce à ma carte'}
          firstText2={'CforGood.'}
        />
        {/* Third screen */}
        <OnboardingDetail
          styleImage={{
            width: metrics.deviceWidth / 2.07
          }}
          index={2}
          currentIndex={this.state.index}
          source={require('../../resources/images/association.png')} 
          firstText={'Je soutiens l’association de mon choix'}
          firstText1={'à travers ma participation libre.'}
        />
        {/* Four screen */}
        <OnboardingDetail
          styleImage={{
            width: metrics.deviceWidth/2,
            height: metrics.deviceWidth/2,
          }}
          index={3}
          currentIndex={this.state.index}
          source={require('../../resources/images/circle.png')} 
          firstText={'Je participe à une dynamique qui'}
          firstText1={'profite à tous.'}
          secondText={'Ensemble, nous sommes une'}
          thirdText={'Révolution Positive !'}
        />
      </Swiper>
    );
  }
}

export default OnboardingSwiper;

var styleOnboardingSwiper = {  
  buttonWrapperStyle: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: Platform.OS === 'android' ? metrics.doubleBaseMargin + metrics.baseMargin : metrics.baseMargin
  },
  dotStyle:{
    marginBottom: (Platform.OS === 'android' ? 2 : 1) * metrics.doubleBaseMargin,
    marginLeft: metrics.smallMargin,
    marginRight: metrics.smallMargin,
  },
  activeDotStyle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginBottom: (Platform.OS === 'android' ? 2 : 1) * metrics.doubleBaseMargin ,
    marginLeft: metrics.smallMargin,
    marginRight: metrics.smallMargin,
  }
};
