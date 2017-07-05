import React, { PureComponent } from 'react';
import {
  Text,
  Platform,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';


import Business from './Business';
import Perk from './Perk';
import Member from './Member';
import Association from './Association';

import {
  colors,
  fonts,
  styles,
  metrics,
} from '../../themes';


class OnboardingSwiper extends PureComponent {

  state = {
    visiblePopupVideo: false,
  };

  scroll = (last = null) => {
    this.swipe.scrollBy(1);
  }

  render() {
    return (
      <Swiper
        ref={swipe => { this.swipe = swipe; }}
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
        <Business scroll={this.scroll} />
        <Perk scroll={this.scroll} />
        <Member scroll={this.scroll} />
        <Association scroll={this.scroll} />
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
};
