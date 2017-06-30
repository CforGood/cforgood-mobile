import React, { PropTypes, PureComponent } from 'react';

import {
  View,
} from 'react-native';

import {
  colors,
  metrics,
} from '../../themes';

class SeparatorInvitation extends PureComponent {

  static propTypes = {  
  };

  static defaultProps = { 
  };

  render() {
    return (
      <View style={{
        height: 3, 
        backgroundColor: colors.green80
      }}
      >
        <View style={{
          flex: 1,
          backgroundColor: colors.yellow,
          width: 200
        }}
        />
      </View>
    );
  }
}

export default SeparatorInvitation;
