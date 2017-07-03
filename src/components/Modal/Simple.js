import React, {
  PropTypes,
  PureComponent,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import IconImage from '../common/IconImage';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

export default class Simple extends PureComponent {

  static propTypes = {
    title: PropTypes.element,
    description: PropTypes.string,
    image: PropTypes.any,
    onPress: PropTypes.func
  };

  static defaultProps = {
    title: null,
    description: '',
    image: null,
    onPress: () => { },
  };

  render() {

    const {
      title,
      description,
      image,
      onPress
    } = this.props;

    return (
      <View style={[
        styles.center,
        { flex: 1 }
      ]}> 
          {title} 
        <IconImage
          width={100}
          tintColor={colors.white}
          image={image}
          iconStyle={{ marginVertical: metrics.doubleBaseMargin *2}}
        />
        <Text style={[
          fonts.style.t20,
          { 
            color: colors.white,
            textAlign: 'center'
           }
        ]}>
          {description}
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({

});                               