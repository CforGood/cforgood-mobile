import React, { PropTypes, PureComponent } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

export default class MarkerView extends PureComponent {

  static propTypes = {
    color: PropTypes.string.isRequired,
    directionMap: PropTypes.func.isRequired,
  };
  
  shouldComponentUpdate(){
    return false;
  }

  render() {

    const rayon = 21;
    
    return (
      <TouchableOpacity
        style={{
          height: rayon,
          width: rayon,
          borderRadius: rayon/2,
          borderColor: 'white',
          borderWidth: 2,
          backgroundColor: this.props.color,
        }}
        onPress={this.props.directionMap}
      >
        <View/>
      </TouchableOpacity>
    );
  }
}
