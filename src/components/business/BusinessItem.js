import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CategoryInfo from '../category/CategoryInfo';
import BusinessTitle from './BusinessTitle';
import BusinessAddress from './BusinessAddress';
import Separator from '../common/Separator';

import { businessType, categoryType } from '../../types';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class BusinessItem extends PureComponent {

  static propTypes = {
    business: businessType.isRequired,
    category: categoryType.isRequired,
    address: PropTypes.any
  };

  navigateToBusiness() {
    this.props.navigation.navigate('BusinessDetail',
      { business: this.props.business, address: this.props.address }
    );
    //this.props.showBusiness(this.props.business.id)
  }

  render() {
    const { business, category, address } = this.props;
    return (
      <TouchableOpacity
        style={style.container}
        activeOpacity={0.95}
        onPress={() => this.navigateToBusiness()}
      >
        <View
          style={{
            width: 134,
            height: 107,
          }}
        >
          <Image
            resizeMode={'cover'}
            source={{ uri: business.picture }}
            style={{ flex: 1 }}
          />
        </View>
        <View style={[
          styles.spaceBetween,
          style.infoContainer,
        ]}
        >
          <View style={{ height: 21, marginBottom: 12 }}>
            <CategoryInfo
              category={category}
            />
          </View>
          <BusinessTitle
            name={business.name}
            activity={business.activity}
            color={colors.darkGray}
          />
          <BusinessAddress
            address={address}
            color={category.color}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(BusinessItem);

const style = StyleSheet.create({
  container: {
    marginTop: metrics.smallMargin,
    marginHorizontal: metrics.baseMargin,
    flex: 1,
    width: metrics.deviceWidth / 1.354,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  infoContainer: {
    flex: 1,
    marginLeft: metrics.smallMargin
  }
});