import React, { Component, PropTypes} from 'react';
import {
  View,
  Text, 
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';


import Checkmark from '../common/Icon';

import {
  styles, 
  fonts,
  metrics,
  colors
} from '../../themes';

class  Welcome extends Component{
  static propTypes = {
    message: PropTypes.string.isRequired,
    onValidate: PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    message: ''
  };

  render() {
    const { user, message } = this.props;
    return (
      <View style={[
          {
            flex: 3,
          }
        ]}
      >
        <View style={{flex: 1}} />
        <View
          style={{
            flex: 2,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={[
                fonts.style.t20,
                fonts.style.textWhite,
                stylesWelcome.text,
              ]}
            > 
              Votre Compte est maintenant créé.
            </Text>
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
          <TouchableOpacity 
            style={{
              borderColor: colors.association,
              borderWidth: 2,
              borderRadius: 5,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.props.onValidate}
          >
            <Text style={[
                fonts.style.t20,
                fonts.style.textWhite,
                {
                  fontWeight: 'bold'
                }
              ]}
            > 
              Commencer
            </Text>
          </TouchableOpacity>
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
