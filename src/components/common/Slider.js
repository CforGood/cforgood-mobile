import 
  React, 
  { PureComponent, PropTypes } 
from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder
} from 'react-native';

import {
  fonts,
  colors,
  metrics
} from '../../themes';

import Circle from './Circle'

export default class Slider extends PureComponent {

  static propTypes = {
    left: PropTypes.number.isRequired,
    setPosition: PropTypes.func.isRequired,
    updatePosition: PropTypes.func.isRequired,
  };

  static defaultProps = {
    left: 0,
    updatePosition: () => {}
  };

  state = {
    _previousLeft: 0,
    left: 0
  };

  componentWillMount() {
    this.setState({
      left: this.props.left,
      _previousLeft: this.props.left,
    });

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {

      },
      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
      
    });

  }
  
  _handlePanResponderEnd = (e: Object, gestureState: Object) => {
    const _previousLeft = this.state._previousLeft + gestureState.dx;

    this.setState({ _previousLeft }, () => {
      this.props.updatePosition(_previousLeft);
    });

  }

  _handlePanResponderMove = (e: Object, gestureState: Object) => {

    let left = this.state._previousLeft + gestureState.dx;
    if(left > 0 && left < (metrics.deviceWidth - metrics.marginApp*2 - 25)){
      this.setState({ left }, () => {
        this.props.setPosition(left);
      });
    }
    
    
  }

  render() {
    return (  
      <View style={styleBar.container}> 
        <Circle 
          bigCircle={styleBar.bigCircle} 
          smallCircle={styleBar.smallCircle} 
        />
        <Animated.View
          style={{
            left: this.state.left,
            position: 'absolute'
          }}
          {...this._panResponder.panHandlers}
        >
          <Circle />
        </Animated.View>   
      </View>  
    );
  }
};

const styleBar = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    marginTop: metrics.baseMargin
  }, 
  bigCircle: {
    width: metrics.deviceWidth - metrics.marginApp*2,
    height: 5,
    borderRadius: 5 /2,
  },
  smallCircle: {
    width: 0,
    height: 0,
    borderRadius: 0, 
  },

}); 

