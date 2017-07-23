import React, { PureComponent } from 'react'; import PropTypes from 'prop-types';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TextInput,
  Animated,
  Easing
} from 'react-native';
import _ from 'lodash';

import {
  colors,
  metrics,
  styles,
} from '../../themes';

import { colorsTab } from '../../constants';

export default class Points extends PureComponent {

  static propTypes = {
    index: PropTypes.number.isRequired,
  };

  static defaultProps = {
    index: 0,
  };
  
  state = {
    offset: new Animated.ValueXY({
      x: this.getRandomArbitrary(metrics.deviceWidth),
      y: this.getRandomArbitrary(metrics.deviceHeight),
    }),
  };

  componentDidMount() {
    this.animate();
  }
  
  shouldComponentUpdate(){
    return false;
  }

  animate () {
    //this.state.offset.setValue(0)
    Animated.timing(
      this.state.offset,
      {
        toValue: {
          x: this.getRandomArbitrary(metrics.deviceWidth),
          y: this.getRandomArbitrary(metrics.deviceHeight),
        },
        duration: 10000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }



  getRandomArbitrary(max) {
    return Math.random() * (max);
  }



  render() {

    const rayon = this.getRandomArbitrary(15);
    
    return (
      <Animated.View
        style={{
          opacity: 0.7,
          zIndex: 1,
          height: rayon,
          width: rayon,
          borderRadius: rayon/2,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.white,
          transform: [
            {
              translateX: this.state.offset.x
            },
            {
              translateY: this.state.offset.y,
            },      
          ]
        }}
      >
        <View
          style={{
            height: rayon-2,
            width: rayon-2,
            borderRadius: (rayon-2/4),
            backgroundColor:  colorsTab[this.props.index],
          }}
        />
      </Animated.View>
    );
  }
}
