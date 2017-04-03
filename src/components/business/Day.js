import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text, 
  StyleSheet
} from 'react-native';
 
import { 
  styles, 
  fonts, 
  colors,
  metrics
} from '../../themes';

 
export default class Day extends PureComponent {

  static propTypes = {
    day:  PropTypes.string,
    start_at:  PropTypes.string,
    end_at:  PropTypes.string,
  };

  render() {
    return (
      <View style={[
          styles.row,
          {
            marginBottom: 2
          }
        ]} 
      >  
        <Text style={styleDay.day} > {this.props.day} - </Text>
        <Text style={styleDay.hours} > {this.props.start_at} | {this.props.end_at}</Text>
      </View> 
    );
  }
};


const styleDay = {   
  day: [
    fonts.style.bold,
    fonts.style.normal,
  ],
  hours: [ 
    fonts.style.normal,
  ],
}; 

