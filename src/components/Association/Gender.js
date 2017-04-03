import React, {
  PropTypes,
  PureComponent,
} from 'react';
import {
  View, 
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

import Radio from '../common/Radio';

import { 
  fonts,
  styles,
  metrics,
  colors,
} from '../../themes';

export default class Gender extends PureComponent {
 
  state = {
  	selectedGender: 'M'
  };

  changeGender(g) {
  	this.setState({selectedGender: g});
    this.props.onChange(g === 'M' ? 1: 2)
  }

  render() { 
    return ( 
      <View style={[
      	  styles.screen.mainContainer,
      	  styles.row,
      	]}
      >
        <View style={[
            styles.row, 
            { 
              alignItems: 'center', 
            }
          ]}
        >  
          <Text style={[ 
              fonts.style.normal,
              stylesGender.text,
            ]}
          >  
            M  
          </Text> 
          <Radio 
            checked={this.state.selectedGender === 'M'}
            onPress={() => this.changeGender('M')}
          />
        </View> 
        <View style={[
            styles.row, 
            { 
              alignItems: 'center', 
            }
          ]}
        >  
          <Text style={[ 
              fonts.style.normal,
              stylesGender.text, 
            ]}
          >  
            Mme  
          </Text> 
          <Radio 
            checked={this.state.selectedGender === 'F'}
            onPress={() => this.changeGender('F')}
           />
        </View> 
      </View>
    );
  }
}

const stylesGender = StyleSheet.create({  
 text: {
   color: colors.darkGray,
   marginLeft: metrics.smallMargin, 
 }
});                               