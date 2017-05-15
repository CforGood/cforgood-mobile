import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
 
import {
  styles, 
  fonts,
  metrics,
  colors,
} from '../../themes';

export default class Commitment extends PureComponent {

  static propTypes = {
    name: PropTypes.string,
    index: PropTypes.number,
    picture: PropTypes.string,

  };

  renderImage(image) {
    switch (image) {
      case 'labels/animation_culturelle.svg':
        return require('../../resources/labels/animation_culturelle.png');
      case 'labels/energies_renouvelables.svg':
        return require('../../resources/labels/energies_renouvelables.png');
      case 'labels/zero_dechet.svg':
        return require('../../resources/labels/zero_dechet.png');
      case 'labels/produits_eco-responsables.svg':
        return require('../../resources/labels/produits_eco-responsables.png');
      case 'labels/politique_anti-gaspillage.svg':
        return require('../../resources/labels/politique_anti-gaspillage.png');
      case 'labels/monnaie_locale.svg':
        return require('../../resources/labels/monnaie_locale.png');
      case 'labels/modele_collaboratif-participatif.svg':
        return require('../../resources/labels/modele_collaboratif-participatif.png');
      case 'labels/engagement_social.svg':
        return require('../../resources/labels/engagement_social.png');
      case 'labels/circuit_court.svg':
        return require('../../resources/labels/circuit_court.png');
      case 'labels/action_locale.svg':
        return require('../../resources/labels/action_locale.png');
      default:
        return require('../../resources/labels/action_locale.png');
    } 
  }
 
  render() {
    return (
      <View style={[
          styleCommitment.container,
          {justifyContent: this.props.index%2 ? 'flex-end' : 'flex-start'}
        ]}
      > 
        <Image
          resizeMode='contain'
          style={styleCommitment.image} 
          source={this.renderImage(this.props.picture)}
        />  
        <Text 
          style={[
            fonts.style.bold,
            fonts.style.normal,
          ]}
        >
          {this.props.name} 
        </Text> 
      </View> 
    );
  }
};

const styleCommitment = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (metrics.deviceWidth )/2  - metrics.marginApp,
    marginVertical: metrics.smallMargin,
    paddingLeft: metrics.smallMargin,
  },
  image: {
    height: metrics.deviceWidth/20,
    width: metrics.deviceWidth/20, 
    marginRight: metrics.smallMargin,
    tintColor: colors.darkGray
  }
});
