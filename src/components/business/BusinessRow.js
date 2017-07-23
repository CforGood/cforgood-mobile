import React, { PureComponent,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Separator from '../common/Separator';
import BusinessItem from './BusinessItem';
import PerkRow from '../perk/PerkRow';

import { businessType } from '../../types';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

import {
  getCategory,
} from '../../constants/categories';



class BusinessRow extends PureComponent {

  static propTypes = {
    business: businessType.isRequired,
    enableFooter: PropTypes.bool,
    setPerk: PropTypes.func.isRequired
  };

  static defaultProps = {
    enableFooter: true,
  };


  goDetailPerk(perk, business, category) {
    if (perk.usable_for_user) {
      this.props.setPerk(perk, business, category)
    }
  }

  render() {
    const { business, enableFooter, address } = this.props;

    const category = getCategory(business.business_category_id);
    return (
      <View style={{
        height: 112,
      }}
      >
        <ScrollView
          style={{
            height: 112,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <BusinessItem
            address={address}
            business={business}
            category={category}
          />
          <Separator
            type={'v'}
            margin={metrics.smallMargin}
          />
          {
            business.perks.map((perk, key) =>
              <TouchableOpacity
                key={key}
                onPress={() => this.goDetailPerk(perk, business, category)}
                style={{ flexDirection: 'row' }}
                activeOpacity={0.95}
              >
                <PerkRow
                  business={business}
                  perk={perk}
                  category={category}
                />
                <Separator
                  type={'v'}
                  margin={metrics.smallMargin}
                />
              </TouchableOpacity>
            )
          }
        </ScrollView>
        {
          enableFooter &&
          <View
            style={[
              BusinessStyle.footer,
              { backgroundColor: category.color }
            ]}
          />
        }
      </View>
    );
  }
}

export default BusinessRow;

const BusinessStyle = StyleSheet.create({
  footer: {
    height: 3,
    marginVertical: metrics.tinyMargin,
    width: metrics.deviceWidth / 1.354,
    marginLeft: metrics.baseMargin,
  },
});