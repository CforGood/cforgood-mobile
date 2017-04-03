import React, {
  PropTypes,
  PureComponent,
} from 'react';

import {
  TouchableOpacity,
  Image,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import {
  styles,
  colors
} from '../../themes';
import Icon from './Icon';

class Back extends PureComponent {
  
  static propTypes = {
    close: PropTypes.bool,
    style: PropTypes.any,
    onPress: PropTypes.func
  };

  static defaultProps = {
    close: false
  };

  close() {
    if(this.props.onPress){
      this.props.onPress()
    }
    else{
      this.props.navigation.goBack()
    }
  }

  render() {
    const { rotate, close, onPress } = this.props;
    return (
      <Icon
        onPress={() => this.close()}
        source={
          !close ? 
          require('../../resources/icons/back-arrow-circular-symbol.png')
          :
          require('../../resources/icons/close-circular-button-of-a-cross-white.png')

        }
        style={[
          {  
            backgroundColor: 'transparent',
            height: 36,
            width: 36,
          },
          this.props.style
        ]}

        styleImage={[
          {
            height: 36,
            width: 36,
            tintColor: colors.darkGray,
            transform:[{rotate: rotate ? '-90deg' : '0deg'}],
          },
          this.props.styleImage
        ]}
      />
    );
  }
}

export default  withNavigation(Back);

