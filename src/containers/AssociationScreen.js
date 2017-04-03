import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import {
  styles,
  colors,
  fonts,
  metrics, 
} from '../themes';


import AssociationList from '../components/Association/AssociationList';
import Header from '../components/common/HeaderApp';
import ButtonAdd from '../components/common/ButtonAdd';


const HEADER_SCROLL_DISTANCE = metrics.marginApp;

class AssociationScreen extends Component { 
  
  state = {
    scrollY: new Animated.Value(0),
  };

  render() {
    const heightSeparator = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 3],
      extrapolate: 'clamp',
    });

    return (  
      <View style={styles.screen.mainContainer}>
        <Header module={'association'} />

        <ButtonAdd
          styleButton={style.styleButton}
          styleText={style.text}
          text={' Proposer une association '} 
          onPress={() => this.props.navigation.navigate('AssociationForm')}
        /> 
        
        <AssociationList
          associations={this.props.associations}
        />
        
      </View>  
    );
  }
}

const mapStateToProps = state => ({
  associations: state.association.entities,
});


export default connect(mapStateToProps)(AssociationScreen);

const style = {   
  associationContainer: {  
    width: metrics.deviceWidth/2 - metrics.marginApp,
    height: 229,
    marginVertical: metrics.smallMargin,
    backgroundColor: 'transparent',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: colors.blueAssociation,
  },
  styleButton:{    
    backgroundColor: colors.white,
    borderColor: colors.blueAssociation,
    borderWidth: 2,
    borderRadius: 22,
    height: 44, 
    marginVertical: 13,
    marginHorizontal: metrics.marginApp , 
  },
  text: [
    fonts.style.t18,
    {
      color: colors.blueAssociation,
      textAlign: 'center',
      fontWeight: 'bold',
    } 
  ]
}; 
