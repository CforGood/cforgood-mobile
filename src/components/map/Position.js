import React, {  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';
 
export default class Position extends React.Component {

  static propTypes = { 
    icon: PropTypes.any,
    text: PropTypes.any,   
  };

  static defaultProps = {  
    icon: null,
    text: '', 
  };

  render() {
    const { onPress } = this.props;
    return (  
      <View style={[
          styles.row,
          stylesPosition.containerIcon
        ]}
      >
        <Icon
          name={this.props.icon}
          color={colors.white}
          size={20} 
        /> 
        <View style={stylesPosition.containerText}>
          <Text style={stylesPosition.text}>
            {this.props.text}
          </Text>
        </View>
      </View>
    );
  }
}

const stylesPosition = StyleSheet.create({ 
  containerIcon: {
    flex:1, 
    alignItems: 'center'
  },
  containerText: {
    flex: 1,
    height:40, 
    backgroundColor: '#689df6', 
    justifyContent: 'center', 
    marginHorizontal: metrics.baseMargin
  },
  text: {
    color: colors.white, 
    marginLeft: metrics.baseMargin
  }
});                               