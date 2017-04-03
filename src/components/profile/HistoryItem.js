import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text, 
  StyleSheet
} from 'react-native';
import moment from 'moment';

import { 
  styles, 
  fonts, 
  colors,
  metrics
} from '../../themes';
import Separator from '../common/Separator';

export default class HistoryItem extends PureComponent {

  static propTypes = {
    title:  PropTypes.string, 
    date:  PropTypes.string, 
    price:  PropTypes.string, 
    isLast: PropTypes.bool,
  }; 

  render() {
    return (
      <View style={styles.screen.mainContainer }>  
        <View style={[ 
            styles.spaceBetween,
            style.container,
          ]}
        >
          <View style={{flex:4}}>
            <Text 
              style={fonts.style.t15} 
            >
              {this.props.title} 
            </Text>
          </View>
          <View style={{flex:2}}>
            <Text
              style={[fonts.style.t15, {color: colors.grayDate}]} 
            >
              {moment(this.props.date).format('l')} 
            </Text>
          </View>
          <View style={{flex:1}}>
            <Text
              style={[
                fonts.style.t15,
                {textAlign: 'right'}
              ]} 
            >
              {this.props.price} 
            </Text>
          </View>     
        </View>
        {
          !this.props.isLast && <Separator color={colors.separatorText} />
        }
        
      </View> 
    );
  }
};

const style = StyleSheet.create({  
  container: { 
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center', 
    height: metrics.buttonHeight,
    marginHorizontal:  metrics.baseMargin,
  }
}); 

