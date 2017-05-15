import React, { Component, PropTypes } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import { withNavigation , NavigationActions } from 'react-navigation';

import { 
  styles,
  fonts,
  metrics
} from '../../themes';
import { businessType, categoryType } from '../../types';

import { 
  businesses
} from '../../dummyData';

import BusinessRow from './BusinessRow';
import Separator from '../common/Separator';
 
class BusinessesList extends Component { 
  
  state = {
    perk: null,
    business: null,
    category: null,
  };

  static propTypes = {
    businesses: PropTypes.arrayOf(businessType).isRequired,
  };

  setPerk = (perk, business, category) => {
    if(perk && business) {
      this.props.navigation.navigate('PerkDetail',
        {
          perkId: perk.id,
          businessId: business.id,
          addressId: business.addresses[0].id,
        }
      );
    }
  }
  

  renderRow = (business, key) => (
    <View
      key={key}
      style={{
        backgroundColor: 'white'
      }}
    >
      <View style={{ marginVertical: metrics.deviceHeight/50 }}>
        <BusinessRow 
          business={business}
          address={business.addresses[0]}
          enableFooter={false}
          setPerk={this.setPerk}
        />
      </View>
      <View style={{ marginTop: metrics.smallMargin }}>
        <Separator margin={metrics.baseMargin} />
      </View>
    </View>
  );
  
  render() {

    return (
      <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps='always'>
        {
          this.props.businesses.map((business, key) => 
            this.renderRow(business, key)
          ) 
        }
        </ScrollView>
        
        
      </View>
    );
  }
}

export default withNavigation(BusinessesList);
