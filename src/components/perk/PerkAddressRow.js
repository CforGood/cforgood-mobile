import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
 
import PerkImage from './PerkImage';
import BusinessAddress from '../business/BusinessAddress';

import { perkType, categoryType , businessType } from '../../types';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';
 
export default class PerkAddressRow extends PureComponent {
  static propTypes = {
    perk: perkType.isRequired,
    category: categoryType.isRequired,
    business: businessType.isRequired,
  };

  render() {
    const { perk, category, business } = this.props;      
    return (
      <View style={styles.screen.container}>
        <View style={{ flex: 3 }}>
          <PerkImage
            business={business}
            perk={perk}
            category={category}
            offerOnRight={true}
          />
        </View>
        <View style={styles.row}> 
          <View
            style={{
              flex: 3,
              justifyContent: 'flex-end'
            }}
          >
            <Text
              style={fonts.style.normal}
              numberOfLines={1}
            >
              {perk.name.charAt(0).toUpperCase() + perk.name.slice(1).toLowerCase()}
            </Text>
          </View>
          <View 
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <BusinessAddress 
              address={ business.address || business.addresses[0]  }
              color={ category.color }
            />
          </View>
        </View> 
      </View>
    );
  }
}
