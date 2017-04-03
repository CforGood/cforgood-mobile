import React, { Component, PropTypes} from 'react';
import {
  View,
  Text, 
  StyleSheet,
  TextInput,
  Image
} from 'react-native';
import { connect } from 'react-redux';


import Checkmark from '../common/Icon';

import {
  styles, 
  fonts,
  metrics,
} from '../../themes';

class  Welcome extends Component{
  static propTypes = {
    message: PropTypes.string.isRequired,
  };
  static defaultProps = {
    message: ''
  };

  render() {
    const { user, message } = this.props;
    return (
      <View style={[
          styles.center,
          {flex: 3}
        ]}
      >
        <Text style={[
            fonts.style.t20,
            fonts.style.textWhite,
            stylesWelcome.text,
          ]}
        > 
          {
            message 
            ||
            (user && user.first_name ? 'Bienvenue ' + user.first_name  + ' ! ' : null)
            
          }
        </Text>
        <View style={[styles.center]}>
          <Image
            source={require('../../resources/icons/checked.png')}
            style={{
              height: 64,
              width: 64,
            }}
            resizeMode={'contain'}
          />
        </View>
      </View>
    )
  }
};



const mapStateToProps = state => ({
  user: state.user.data,
});

export default connect(mapStateToProps)(Welcome);

const stylesWelcome= StyleSheet.create({ 
  text: {
    marginBottom: metrics.doubleBaseMargin,
    textAlign: 'center'
  }
});
