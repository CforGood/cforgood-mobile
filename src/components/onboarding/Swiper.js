import React, { PureComponent } from 'react';
import { Text, Platform, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import Business from './Business';
import Perk from './Perk';
import Member from './Member';
import Association from './Association';

import { colors, fonts, styles, metrics } from '../../themes';

class OnboardingSwiper extends PureComponent {
  state = {
    activeSlide: 0
  };

  scroll = () => {
    this._carousel.snapToNext();
  };

  pagination = () => {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={4}
        activeDotIndex={activeSlide}
        containerStyle={{
          paddingVertical: 0,
          backgroundColor: 'rgba(0, 0, 0, 0)'
        }}
        dotStyle={style.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.5}
      />
    );
  };

  _renderItem = ({ item, index }) => {
    switch (index) {
      case 0:
        return <Business scroll={this.scroll} />;
      case 1:
        return <Perk scroll={this.scroll} />;
      case 2:
        return <Member scroll={this.scroll} />;
      default:
        return <Association scroll={this.scroll} />;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.pagination()}
        <Carousel
          ref={ref => {
            this._carousel = ref;
          }}
          data={[{}, {}, {}, {}]}
          renderItem={this._renderItem}
          sliderWidth={metrics.deviceWidth}
          itemWidth={metrics.deviceWidth}
          slideStyle={{
            width: metrics.deviceWidth
          }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          onSnapToItem={index => this.setState({ activeSlide: index })}
        />
      </View>
    );
  }
}

export default OnboardingSwiper;

var style = {
  dotStyle: {
    marginLeft: metrics.smallMargin,
    marginRight: metrics.smallMargin,
    top: metrics.doubleBaseMargin,
  }
};
