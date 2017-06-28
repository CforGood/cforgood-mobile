import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';


import Close from './Icon';

class ErrorView extends PureComponent {
  state = {
    showError: false
  };

  static propTypes = {
    message: PropTypes.string,
  };

  static defaultProps = {
    message: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== "") {
      this.setState({ showError: true });
    }
  }
  render() {

    return (
      this.state.showError &&
      <View
        style={[
          {
            minHeight: 60,
            backgroundColor: '#ec5759',
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: metrics.baseMargin
          },
          Platform.OS === 'ios' ? { paddingTop: 20 } : {}
        ]}
      >
        <View style={{ flex: 1 }} />
        <View
          style={{
            flex: 5,
            justifyContent: 'center'
          }}
        >
          <Text
            style={[
              fonts.style.t17,
              fonts.style.textWhite,
            ]}
          >
            {
              this.props.message
            }
          </Text>
        </View>
        <View style={[{ flex: 1 }, styles.center]}>
          <Close
            source={require('../../resources/icons/close-white.png')}
            onPress={() => this.setState({ showError: false })}
            style={{
              height: 15,
              width: 15,
            }}
            styleImage={{
              height: 15,
              width: 15
            }}
          />
        </View>
      </View>
    );
  }
}

export default (ErrorView);
