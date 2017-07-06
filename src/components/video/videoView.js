import React, {
  PureComponent
} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import { withNavigation } from 'react-navigation';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';
import Icon from '../common/Icon';
import { URL_VIDEO } from '../../constants';

const marginLeft = (metrics.deviceHeight - metrics.deviceWidth) / 2;
const marginFooter = metrics.images.logo
  +
  (metrics.deviceHeight - metrics.images.logo) / 8
  +
  metrics.deviceHeight / 16;

class VideoView extends PureComponent {

  state = {
    played: true,
    canPlay: false,
    loaded: false,
    topVideo: 0,
    widthVideo: metrics.deviceWidth,

  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.play !== this.props.play) {
      this.setState({ canPlay: nextProps.play });
      if (nextProps.play) {
        Orientation.unlockAllOrientations();
      }
    }
  }

  componentWillMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) => {
    //alert(orientation)
    if (orientation == 'LANDSCAPE') {

      this.setState({
        topVideo: - ((metrics.deviceHeight) / 2),
        widthVideo: metrics.deviceHeight
      })
    } else {
      //do something with portrait layout
      this.setState({
        topVideo: 0,
        widthVideo: metrics.deviceWidth
      });
    }
  }

  loadStart = () => {
    this.setState({ loaded: !this.state.loaded });
  }


  onEnd = () => {
   
    this.loadStart();
  }

  stopPlay = () => {
    this.props.stopPlay();
    Orientation.lockToPortrait();
  }

  render() {
    return (
      this.state.canPlay &&
      <View style={[
        styles.screen.overlay,
        stylesHome.videoContainer,
        {
          zIndex: 5,
          width: this.state.widthVideo,
        }
      ]}
      >
        <Icon
          source={require('../../resources/icons/close-white.png')}
          onPress={() => this.stopPlay()}
          style={{
            zIndex: 6,
            height: 26,
            width: 26,
            marginLeft: metrics.marginApp,
            marginTop: metrics.marginApp + (Platform.OS === 'ios' ? 22 : 0),
          }}
          styleImage={{
            height: 26,
            width: 26
          }}
        />
        <Video
          resizeMode='contain'
          source={{ uri: URL_VIDEO }}
          style={[
            styles.screen.overlay,
            {
              top: this.state.topVideo,
            }
          ]}
          paused={false}
          repeat={true}
          onLoadStart={this.loadStart}     // Callback when video starts to load
          onLoad={this.loadStart}          // Callback when video loads
        //onEnd={this.onEnd}             // Callback when playback finishes 
        />
      </View>
    );
  }
};


const stylesHome = StyleSheet.create({
  videoContainer: {
    backgroundColor: colors.black,
  },
});

export default withNavigation(VideoView);
