import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text, 
  StyleSheet
} from 'react-native';
 
import {  
  fonts, 
  colors,
  metrics
} from '../../themes';

 
export default class Detail extends PureComponent {

  static propTypes = {
    title:  PropTypes.string,
    description:  PropTypes.string,
    colorTitle: PropTypes.string,
  };

  static defaultProps = { 
    colorTitle: colors.darkGray,
  };

  render() {
    return (
      <View style={{flex:1}} >  
        <Text 
          style={[

            fonts.style.t17,
            fonts.style.bold,
            {  
              color: this.props.colorTitle, 
              marginBottom: metrics.doubleBaseMargin,
            }, 
          ]}
          numberOfLines={2}
        >
          {this.props.title} 
        </Text>
        {
          this.props.description && 
          <Text 
            style={[ 
              {  
                color: this.props.color,
                lineHeight: 20, 
              },
              fonts.style.normal,  
            ]}
          >
            {this.props.description} 
          </Text>  
        }
      </View> 
    );
  }
};


