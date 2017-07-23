import PropTypes from 'prop-types'; import React, {  PureComponent, } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import { 
  colors, 
  metrics,
  styles,
  fonts,
} from '../../themes';

const WIDTH_WIDGET = (metrics.deviceWidth) /3;
let WIDTH_CIRCLE = metrics.deviceWidth / 5;

const HEIGHT_CONTAINER = metrics.deviceHeight
  - 
  60 // Hight Button
  - 
  metrics.navBarHeight
  -
  metrics.doubleBaseMargin*3;

//WIDTH_CIRCLE = Math.min(HEIGHT_CONTAINER/4, WIDTH_CIRCLE);


import { categoryType } from '../../types';

export default class CategoryItem extends PureComponent {
  render(){
    const { category:{ icon, name, color }, selectCategory , index, selected} = this.props;
    return (
      <TouchableOpacity onPress={selectCategory}>
        <View style={[
            CategoryItemCircleStyle.container,
            { opacity: selected ? 1 : 0.4 }
          ]}
        >
          <View style={[
              CategoryItemCircleStyle.imageContainer,
              {
                borderColor: selected 
                ? 
                color 
                : 
                CategoryItemCircleStyle.inactif
              }
            ]}
          >
            <Image
              resizeMode='contain'
              style={styles.imageContain} 
              source={icon}
            />
          </View> 
          <Text style={CategoryItemCircleStyle.textCategory}>
            {name}
          </Text>  
        </View>
      </TouchableOpacity> 
    )
  }
};

CategoryItem.propTypes = {  
  category: categoryType.isRequired,
};


const CategoryItemCircleStyle = StyleSheet.create({ 
  container: {
    width: WIDTH_WIDGET,
    height: HEIGHT_CONTAINER/ 4,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: (WIDTH_CIRCLE)/2 ,
    borderColor: colors.lightGray,
    borderWidth: 2,
    width: WIDTH_CIRCLE , 
    height: WIDTH_CIRCLE,
    padding: 15,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  textCategory:{
    fontFamily: fonts.type.base,
    fontSize: fonts.size.tiny,
    color: colors.darkGray,
    textAlign: 'center',
    paddingTop: metrics.smallMargin,
  },
  inactif: {
    borderColor: '#D9D9D9'
  }
});
