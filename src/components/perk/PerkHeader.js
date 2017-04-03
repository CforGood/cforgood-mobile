import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Text,
} from 'react-native';

import {
  styles,
  colors,
  fonts,
} from '../../themes';


class PerkHeader extends PureComponent {
  static propTypes = {
    text: PropTypes.any, 
    color: PropTypes.any
  };

  render() {
    return (
      <View>
        <Text style={[ 
            fonts.style.t18, 
            {
              color: colors.darkGray,
              fontWeight: 'bold',
            } 
          ]}
        >
          {this.props.text}
        </Text>
        <View
          style={{
            borderBottomWidth: 8,
            borderBottomColor: this.props.color,
            bottom: 8
          }}
        />
      </View>
    ); 
  }

}

export default PerkHeader;
