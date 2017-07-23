import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import {
  styles,
  fonts,
  colors,
  metrics
} from '../../themes';

import StateBusiness from './State';
import BusinessTitle from './BusinessTitle';
import CategoryInfo from '../category/CategoryInfo';
import BusinessAddress from './BusinessAddress';

export default class BusinessHeader extends Component {

  static propTypes = {
    category: PropTypes.any.isRequired,
    online: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  };

  static defaultProps = {
    online: false,
  };

  render() {
    const { category, online, name, address } = this.props
    return (
      <View>
        <View style={{ flex: 1 }} >
          {
            // <StateBusiness
            //   state={online ? 'Ouvert' : 'Fermé'}
            //   color={online ? colors.online : colors.lightGray}
            // />
          }

          <BusinessTitle
            name={name}
            style={fonts.style.t26}
          />
        </View>
        <View style={[
          styles.row,
          styles.spaceBetween,
          { marginTop: metrics.baseMargin }
        ]}
        >
          <CategoryInfo
            category={category}
          />
          <BusinessAddress
            address={address}
            color={category.color}
          />
        </View>
      </View>
    );
  }
};

