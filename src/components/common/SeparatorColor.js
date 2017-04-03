import React, { PureComponent } from 'react';

import LinearGradient from 'react-native-linear-gradient';

import {
  colors,
} from '../../themes';

class Separator extends PureComponent {
  render() {
    return (
      <LinearGradient
        start={{x: 0, y:0}} end={{x: 1, y:0}}
        colors={colors.gradientColor}
        style={[
          {
            height: 3,
          }
        ]}
      />
    );
  }
}

export default Separator;
