import React, { PureComponent } from 'react';
import {
  WebView,
  Image,
  View
} from 'react-native';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

import Header from '../components/common/Header';

class WebViewScreen extends PureComponent {
  
  state = {
    url: '',
    title: '',
  };

  componentWillMount() {

    const params = this.props.navigation.state.params;
    this.setState({
      uri: params.url,
      title: params.title
    });
  }

  render() {        
    return (
      <View style={styles.screen.mainContainer}> 
        <Header
          close={true}
          color={colors.blueAssociation}
          text={this.state.title} 
          left={false}
          titleStyle={{fontSize:20}}
        />
        <WebView 
          source={{uri: this.state.uri}} 
          style={{flex: 1}}
        />
      </View>
    );
  }
}

export default WebViewScreen;
