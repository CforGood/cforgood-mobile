import PropTypes from 'prop-types'; import React, {  PureComponent, } from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class TabItem extends PureComponent {

  static propTypes = {     
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    selectedItem: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    onPress: () => {}, 
    text: 'vide',
    selectedItem: false
  };

  renderImage(){

    switch (this.props.text) {
      case 'profile' : 
        return require('../../resources/icons/boy-broad-smile.png')
        break;
      case 'Association' : 
        return require('../../resources/icons/profils_association.png')
        break;
      case 'Abonnement' : 
        return require('../../resources/icons/profils_participation.png')
        break;
      case 'Settings' : 
        return require('../../resources/icons/profils_settings.png')
        break;
      default: 
        break;  
    }

  }

  render() {
    const { onPress, selectedItem } = this.props;
    return (
      <View 
        style={[
          stylesTab.tab,
          selectedItem === true ? stylesTab.tabSelected : {} 
        ]}
      >
        <TouchableOpacity onPress={onPress} >
          <Image 
            source={this.renderImage()}
            style={{height: 25}}
            resizeMode="contain"
          />

        </TouchableOpacity>
      </View>
    );
  }
}

const stylesTab = StyleSheet.create({
  tab: {
    flex:1,
    backgroundColor: colors.white,  
    height: metrics.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.baseMargin, 
    marginBottom: 2,
  },
  tabSelected: {
    marginBottom: 0,
    marginTop: 2,
    marginHorizontal: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  textSelected: { 
    fontFamily: fonts.type.base, 
    fontSize: fonts.size.regular,
    color: colors.darkGray, 
    textAlign: 'center', 
    fontWeight: 'bold', 
  },
});