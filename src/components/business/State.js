import PropTypes from 'prop-types'; import React, {  PureComponent, } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class State extends PureComponent {

  static propTypes = {
    state: PropTypes.any,
    color: PropTypes.any,
  };

  render() {
    const { onPress } = this.props;
    return ( 
      <View style={[ 
          styles.row,
          {    
            justifyContent: 'flex-start',
            alignItems: 'center',
          }
        ]}
      >  
        <View
          style={[ 
            {
              backgroundColor: this.props.color
            },
            stylesState.smallCircle,
          ]}
        />
        <View style={{ alignItems: 'center' }}>
          <Text 
            style={[ 
              fonts.style.normal,
              fonts.style.bold,
              { 
                color: colors.darkGray,
                marginLeft: metrics.tinyMargin
              }
            ]}
          >
            {this.props.state}
          </Text>
        </View>
      </View> 
    );
  }
}

const stylesState = StyleSheet.create({ 
  smallCircle:{
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: metrics.tinyMargin
  }
});                               