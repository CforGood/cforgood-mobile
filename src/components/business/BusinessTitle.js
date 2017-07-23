import React, { PureComponent,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';

import { categoryType } from '../../types';
import {
  fonts,
  colors,
} from '../../themes';


export default class BusinessTitle extends PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    activity: PropTypes.string,
    style: PropTypes.any,
  };

  static defaultProps = {
    activity: ''
  };

  render() {
    return (
      <View style={{ flex: 1 }} >
        <Text
          style={[
            {
              color: this.props.color,
            },
            fonts.style.bold,
            fonts.style.t16,
            this.props.style,
          ]}
          numberOfLines={this.props.activity ? 1 : 2}
        >
          {this.props.name}
        </Text>
        <Text
          style={[
            {
              color: 'this.props.color',
            },
            fonts.style.normal,
            this.props.style,
          ]}
          numberOfLines={1}
        >
          {this.props.activity}
        </Text>

      </View>
    );
  }
};
