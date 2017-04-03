import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { withNavigation } from 'react-navigation';
 
import PerkTitle from './PerkTitle';
import OfferView from './OfferView';
import AvailableView from './AvailableView';
 
import { perkType, categoryType, businessType } from '../../types';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';
 
class PerkImage extends PureComponent {
  static propTypes = {
    business: businessType.isRequired,
    perk: perkType.isRequired,
    category: categoryType.isRequired,
    offerOnRight: PropTypes.bool,
    smallTitle: PropTypes.bool,
    largeTitle: PropTypes.bool,
    availableOnLeft: PropTypes.bool,

  };

  static defaultProps = {
    smallTitle: true,
    largeTitle: false,
    availableOnLeft: false
  };

  render() {
    const {
      business,
      perk,
      category,
      smallTitle,
      largeTitle,
      offerOnRight,
      availableOnLeft
    } = this.props;
    
    let source = require('../../resources/images/logo.png');
    if(perk.picture || business.picture){
      source = {uri: perk.picture || business.picture} 
    }
    
    return (
      <Image 
        style={{flex: 1}}
        source={source}
        resizeMode={"cover"}
      >
        <View 
          style={[
            style.headerContainer,
            {
              backgroundColor: perk.usable_for_user ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.7)'
            }
          ]}
        >
          <View 
            style={{
              flexDirection: 'row',
              flex: 1
            }}
          > 
            {
              smallTitle &&
              <PerkTitle  
                name={perk.usable_for_user ? business.name: "Bon plan épuisé"}
                activity={business.activity}
                code={perk.perk_code}
                color={colors.white}
              />
            }
            <View 
              style={{
                alignItems: !availableOnLeft ? 'flex-end' : 'flex-start' 
              }}
            >
              <AvailableView 
                color={category.color}
                flash={perk.flash}
                times_remaining={perk.times_remaining}
              />
            </View>
          </View>
          {
            largeTitle &&
            <View
              style={{
                flex: 1,
                alignItems: 'center'
              }}
            >
              <Text 
                style={[
                  fonts.style.bold,
                  fonts.style.t20,
                  {  
                    color: colors.white,
                    textAlign: 'center'
                  }, 
                ]}
              >
                {
                  perk.usable_for_user ? 
                  business.name.charAt(0).toUpperCase() + business.name.slice(1).toLowerCase()
                  :
                  "Bon plan épuisé"
                } 
              </Text>
            </View>
          }
          <View style={{ alignItems: offerOnRight ? 'flex-end' : 'flex-start' }}>
            <OfferView 
              color={category.color}
              offer={perk.offer}
            />
          </View>
        </View>  
      </Image>
    );
  }
}

export default withNavigation(PerkImage);

const style = StyleSheet.create({
  headerContainer: {  
    paddingHorizontal: metrics.smallMargin,
    paddingTop: metrics.tinyMargin,
    flex: 80,
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundOpacity,
  },
  perkContainer: {
    borderColor: colors.lightGray,
    borderWidth: metrics.borderWidth, 
  }
});
