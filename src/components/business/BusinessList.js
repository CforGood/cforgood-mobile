import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import { withNavigation, NavigationActions } from 'react-navigation';


import ApiHandler from '../../utils/api';
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

  setPerk = async (perk, business, category) => {
    if (perk && business) {
      let businessDetail = business;
      let perkDetail = perk;
      let addressId = business.addresses[0].id;

      await ApiHandler.businessDetail(business.id, addressId)
        .then(response => {
          if (!response.error) {
            businessDetail = response;
          }
        }).
        catch(error => {

        });

      ApiHandler.perkDetail(perk.id)
        .then(response => {
          if (!response.error) {
            this.props.navigation.navigate('PerkDetail', {
              business: businessDetail,
              category: category,
              perk: response,
            });
          }
        }).catch(message => {
        });
    }
  }


  renderRow = (business, key) => (
    <View
      key={key}
      style={{
        backgroundColor: 'white'
      }}
    >
      <View style={{ marginVertical: metrics.deviceHeight / 50 }}>
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
