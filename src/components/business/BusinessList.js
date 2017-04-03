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

import PerkDetailScreen from '../../containers/PerkDetailScreen';
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
  
  setPerk = (perk, business = null, category= null) => {
    this.setState({ perk, business, category });
  };

  onValidate = () => {

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Maps'})
      ]
    })
    this.props.navigation.dispatch(resetAction)

    this.setState({ perk: null });
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
        {
          this.state.perk &&
          <PerkDetailScreen
            visible={true}
            onClose={() => this.setPerk(null)}
            perk={this.state.perk}
            business={this.state.business}
            category={this.state.category}
            onValidate={() => this.onValidate()}
          />
        }
        
      </View>
    );
  }
}

export default withNavigation(BusinessesList);
