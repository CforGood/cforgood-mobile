import 
  React, 
  { PureComponent, PropTypes } 
from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing
} from 'react-native';

import {
  styles,
  fonts,
  colors,
  metrics
} from '../../themes';

import Circle from './Circle'

export default class Switch extends PureComponent {

  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    checked: false
  };

  state = {
    left: new Animated.Value(this.props.checked ? 72 - 25 : 0),
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.checked !== this.props.checked){
      this.animate(nextProps.checked);
    }
  }

  animate(checked) {

    Animated.timing(
      this.state.left,
      {
        toValue: checked ? 72 - 25 : 0,
        duration: 200,
        easing: Easing.linear
      }
    ).start();
      
  }
  

  render() {
    return ( 
      <TouchableOpacity
        style={[
          styles.center,
          {
            height: 32,
            width: 80,
          }
        ]}
        activeOpacity={1}
        onPress={() => this.props.onChange(!this.props.checked)}
      > 
        <Circle 
          bigCircle={styleCircle.baseBig} 
          smallCircle={styleCircle.baseSmall} 
        />
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: this.state.left
            },
          ]}
        >
          <Circle />
        </Animated.View>
      </TouchableOpacity> 
    );
  }
};

const styleCircle = StyleSheet.create({
  baseBig: {
    width: 74,
    height: 23,
    borderRadius: 23 /2,
  },
  baseSmall: {
    width: 70,
    height: 20,
    borderRadius: 20 /2,
    backgroundColor: colors.white,
  }

}); 

