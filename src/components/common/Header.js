import React, {
  PropTypes,
  PureComponent,
} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

import Back from './Back';
import HeaderGradiant from './HeaderGradiant';

class Header extends PureComponent {

  static propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    back: PropTypes.string,
    left: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    titleStyle: PropTypes.object,
    style: PropTypes.object,
    type: PropTypes.string,
    leftElement: PropTypes.element,
  };

  static defaultProps = {
    left: true,
    text: '',
    color: 'transparent',
    type: 'simple',
    leftElement: null,
    style: {},
    titleStyle: {},
  };

  close() {
    if (this.props.onClose) {
      this.props.onClose()
    }
    else {
      this.props.navigation.goBack()
    }
  }

  render() {
    const {
      type,
      back,
      left,
      leftElement,
      rightElement,
      color,
    } = this.props;

    return (
      <HeaderGradiant
        style={{...style.container, ...this.props.style}}
        type={type}
      >
        {
          <View style={{ flex: 1 }}>
            {
              back &&
              <Back
                onPress={() => this.close()}
                rotate={back === '-90deg'}
              />
            }
            {leftElement}
          </View>
        }
        <View style={{
          flex: 4,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
          <View>
            <Text
              style={[
                fonts.style.bold,
                fonts.style.t24,
                {
                  zIndex: 1,
                },
                this.props.titleStyle,
                type === 'gradiant' ? { color: 'white' } : {},
              ]}
              numberOfLines={1}
            >
              {this.props.text}
            </Text>
            {
              type === 'simple' && color &&
              <View
                style={{
                  borderBottomWidth: 8,
                  borderBottomColor: color,
                  bottom: 8
                }}
              />
            }

          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          {
            this.props.close &&
            <Back
              close={true}
              onPress={() => this.close()}
            />
          }
        </View>
        {rightElement}
      </HeaderGradiant>
    );
  }
}

export default withNavigation(Header);

const style = {
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    height: metrics.navBarHeight,
    paddingHorizontal: metrics.marginApp,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
};