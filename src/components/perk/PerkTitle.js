import React, { PureComponent,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text, 
} from 'react-native';

import { categoryType } from '../../types';
import {  
  fonts, 
  colors,
} from '../../themes';

 
export default class PerkTitle extends PureComponent {

  static propTypes = {
    name:  PropTypes.string.isRequired,
  };

  render() {
    return (
      <View style={{flex:1}} >   
        <Text 
          style={[
            fonts.style.bold,
            fonts.style.t16,
            {  
              color: this.props.color,
            },
          ]}
        >
          { this.props.name ? 
            this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1).toLowerCase()
            :
            ""
          } 
        </Text>
        {
          this.props.activity !== ""
          &&
          <Text 
            style={[
              fonts.style.t16,
              {  
                color: this.props.color,
              },
            ]}
          >
            {
              this.props.activity &&
              this.props.activity != "" &&
              this.props.activity.toLowerCase()
            } 
          </Text>

        }
        
      </View> 
    );
  }
}
 
