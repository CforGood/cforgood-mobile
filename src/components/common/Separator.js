import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  View,
} from 'react-native';

import {
  colors,
  metrics,
} from '../../themes';

class Separator extends PureComponent {

  static propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    margin: PropTypes.number.isRequired,
  };

  static defaultProps = {
    type: 'horizontal',
    color: colors.separator,
    margin: 0
  };

  render() {
    return (
      <View style={[
          this.props.type === 'horizontal' ?
          { 
            height: 1, 
            paddingHorizontal: this.props.margin,  
          }
          :
          { 
            width: 1, 
            paddingTop: this.props.margin, 
          },
          this.props.style
        ]}
      >
        <View style={{
            flex: 1,
            backgroundColor: this.props.color
          }}
        />
      </View>
    );
  }
}

export default Separator;
