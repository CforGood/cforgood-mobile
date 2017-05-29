import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text, 
  StyleSheet
} from 'react-native';

import { categoryType } from '../../types';
import {
  styles, 
  fonts,
  metrics,
  colors,
} from '../../themes';
 
 export default class CategoryInfo extends PureComponent {

  static propTypes = {
    category: categoryType.isRequired,
  };
 
  render() {
    return (
      <View style={styles.row}>  
        <View
          style={[ 
            { backgroundColor: this.props.category.color },
            CategoryInfoStyle.smallCircle,
          ]}
        />
        <View
          style={{ 
            flex: 1,
          }}>
          <Text 
            style={[ 
              fonts.style.normal,
              { 
                fontWeight: '700',
              }
            ]}
            numberOfLines={2}
          >
            {this.props.category.name}
          </Text>
        </View>
      </View>

    );
  }
} 

const CategoryInfoStyle = StyleSheet.create({  
  smallCircle:{
    height: 18,
    width: 18,
    borderRadius: 9,
    marginRight: 5
  }
});