import React, { PureComponent, } from 'react'; import PropTypes from 'prop-types';
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
    removeError: PropTypes.func,
    color: PropTypes.string,
  };

  static defaultProps = {
    message: '',
    removeError: null,
    color: '#ec5759',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== '') {
      this.setState({ showError: true });
    }
  }
  render() {

    return (
      this.state.showError &&
      this.props.message !== '' &&
      <View
        style={[
          {
            minHeight: (Platform.OS === 'ios' ? 80 : 60),
            backgroundColor: this.props.color,
            alignItems: 'center',
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            paddingVertical: metrics.baseMargin,
            zIndex: 20,
          },
          Platform.OS === 'ios' ? { paddingTop: 20 } : {}
        ]}
      >
        {this.props.removeError && <View style={{ flex: 1 }} />}
        <View
          style={{
            flex: 10,
            ...styles.center,
          }}
        >
          <Text
            style={[
              fonts.style.t17,
              fonts.style.textWhite,
              {
                textAlign: 'center',
              }
            ]}
          >
            {this.props.message}
          </Text>
        </View>
        {
          this.props.removeError &&
          <Close
            source={require('../../resources/icons/close-white.png')}
            onPress={() => {
              this.props.removeError();
              this.setState({ showError: false });
            }}
            styleImage={{
              height: 15,
              width: 15
            }}
            style={{
              padding: metrics.baseMargin,
            }}
          />
        }

      </View>
    );
  }
}

export default (ErrorView);
