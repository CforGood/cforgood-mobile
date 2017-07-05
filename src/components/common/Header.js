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
      close,
    } = this.props;

    return (
      <HeaderGradiant
        style={{ ...style.container, ...this.props.style }}
        type={type}
      >
        {  (leftElement || back || close) &&
          <View style={{ flex: 1 }}>
            {
              back &&
              <Back
                onPress={() => this.close()}
                rotate={back === '-90deg'}
                color={type === 'gradiant' ? 'white' : colors.darkGray}
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
                fonts.style.mediumBold,
                fonts.style.t22,
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
        {
          (this.props.close || back || rightElement) &&
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            {
              this.props.close &&
              <Back
                close={true}
                onPress={() => this.close()}
                color={type === 'gradiant' ? 'white' : colors.darkGray}
              />
            }
            {rightElement}
          </View>
        }

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