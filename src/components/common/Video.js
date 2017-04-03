import React, { PureComponent, PropTypes } from 'react';
import {
  View, 
  WebView
} from 'react-native';
 
import {    
  metrics
} from '../../themes';
  
export default class Video extends PureComponent {

  static propTypes = { 
    link: PropTypes.string.isRequired,
  };

  render() { 
    return (
      <View style={{
          height: 150,
          marginVertical: metrics.baseMargin,
        }}
      >
        <WebView source={{uri: this.props.link}} />
      </View> 
    );
  }
};