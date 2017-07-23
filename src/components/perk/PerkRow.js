import React, { PureComponent,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
 

import PerkImage from './PerkImage';

import { perkType, categoryType } from '../../types';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class PerkRow extends PureComponent {
  static propTypes = {
    perk: perkType.isRequired,
    category: categoryType.isRequired
  };

  render() {
    const { perk, category, business } = this.props;      
    return (
      <View style={style.container}>
        
        <View style={[
            styles.screen.container,
            style.perkContainer,
          ]}
        >  
          <View style={style.headerContainer}>  
            <PerkImage 
              business={business}
              perk={perk}
              category={category}
              offerOnRight={false}
            />
          </View>  
          <View style={[
              styles.center,
              {
                flex: 32,
                backgroundColor: 'white'
              }
            ]} 
          > 
            <Text 
              style={[ 
                {   
                  textAlign: 'center',
                }, 
                fonts.style.normal
              ]}
            >
              {perk.name && perk.name.toLowerCase()}
            </Text>
          </View> 
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container:{
    marginTop: metrics.smallMargin,
    marginHorizontal: metrics.baseMargin,
    flex: 1,
    width: metrics.deviceWidth/1.354,
  },
  headerContainer: {  
    flex: 80,
  },
  perkContainer: {
    borderColor: colors.lightGray,
    borderWidth: metrics.borderWidth,
    //backgroundColor: colors.backgroundOpacity,
  }
});
