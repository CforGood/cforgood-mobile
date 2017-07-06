import React, {
  PropTypes,
  PureComponent,
} from 'react';

import {
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  styles,
} from '../../themes';

export default class Icon extends PureComponent {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    source: PropTypes.number.isRequired,
    style: PropTypes.object,
    styleImage: PropTypes.object
  };

  static defaultProps = {
    onPress: () => { },
    style: {},
    styleImage: {}
  };

  render() {

    const {
      onPress,
      style,
      styleImage,
    } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={style}
      >
        <Image
          resizeMode={'contain'}
          style={[styleImage || styles.imageContain]}
          source={this.props.source}
        />
      </TouchableOpacity>
    );
  }
}
