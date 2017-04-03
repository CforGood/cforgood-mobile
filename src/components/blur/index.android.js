/**
 *  Android  / react-native-blur
 */
'use strict';
import React, { Component , PropTypes } from 'react';
import {
  Image,
  findNodeHandle,
  StyleSheet,
} from 'react-native';

import { BlurView } from 'react-native-blur';

class BlurAndroid extends Component {
  
  static propTypes = {
    image: PropTypes.any.isRequired,
    blurBlurType: PropTypes.string.isRequired,
    overlayColor: PropTypes.string.isRequired,
  };

  static defaultProps = {
    blurBlurType: 'dark',
  };

  state = {
    viewRef: 0,
  }

  imageLoaded = () => {
    this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
  }

  render() {
    return (
      <Image
        source={this.props.image}
        style={styles.container}
        ref={'backgroundImage'}
        onLoadEnd={this.imageLoaded}
      >
        <BlurView
          blurAmount={10000 }
          blurRadius={25}
          downsampleFactor={5}
          overlayColor={this.props.overlayColor}
          style={styles.blurView}
          viewRef={this.state.viewRef}
        />
        {
          this.props.children
        }
      </Image>
    );
  }
}

export default BlurAndroid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.24)',
    resizeMode: 'cover',
    width: null,
    height: null,
  },
  blurView: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
});