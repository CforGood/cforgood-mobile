import React, {
  PropTypes,
  PureComponent,
} from 'react';

import {
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import RNShare from 'react-native-share';

import {
  styles,
  fonts,
  colors,
  metrics
} from '../../themes';

import {
  site
} from '../../config.json';

export default class Share extends PureComponent {

  static propTypes = {
    onPress: PropTypes.func.isRequired, 
    style: PropTypes.any,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
  };

  static defaultProps = {
    onPress: () => {},
  };

  render() {
    const {
      onPress,
      style, styleImage, url, title, message } = this.props;
    return (
      <TouchableOpacity 
        onPress={() => RNShare.open({
          url: (site+url),
          title: title,
          message: message
        })}
        style={[
          styles.row,
          style
        ]}
      > 
        <Text style={styleShare.text}>
          Partager sur 
        </Text>
        <Image
          resizeMode='contain'
          style={styleShare.icon}
          source={require('../../resources/icons/share-2.png')}
        />
      </TouchableOpacity>
    );
  }
}


const styleShare = {
  text: {
    fontSize: metrics.deviceWidth/23,
    fontFamily: fonts.type.base,
    color: colors.white,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  icon:{  
    width: 25,
    height: 25,  
    tintColor: colors.white,
    marginHorizontal: metrics.baseMargin,
  },
}; 

