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

export default class PerkDetailItem extends PureComponent {
  static propTypes = {
    perk: perkType.isRequired,
    category: categoryType.isRequired,
    availableOnLeft: PropTypes.bool,
    detail: PropTypes.bool
  };

  static defaultProps = {
    availableOnLeft: false,
    detail: false,
  };

  render() {
    const {
      perk,
      category,
      availableOnLeft,
      business,
      detail
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <PerkImage
          business={business}
          perk={perk}
          category={category}
          offerOnRight={true}
          availableOnLeft={availableOnLeft}
          largeTitle={true}
          smallTitle={false}
        />
        <View style={[
          {
            height: 60,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
        >
          <Text style={[
            !detail ? fonts.style.bold : fonts.style.mediumBold,
            !detail ? fonts.style.t18 : fonts.style.t20,
            {
              textAlign: 'center'
            }
          ]}
          >
            {perk.name.charAt(0).toUpperCase() + perk.name.slice(1).toLowerCase()}
          </Text>
        </View>
      </View>
    );
  }
};