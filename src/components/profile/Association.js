import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { goToAssociations } from '../../redux/actions/association';

import {
  styles,
  fonts,
  metrics,
  colors,
} from '../../themes';

import Histories from './Histories';
import AssociationItem from '../Association/AssociationItem';
import AssociationItemAdd from '../Association/AssociationItemAdd';
import Separator from '../common/Separator';

class Association extends PureComponent {
  
  goToAssociations(){
    this.props.navigation.goBack();
    this.props.goToAssociations(true);
  }
  render() {
    const { user } =  this.props;
    return (
      <View>
         <Text
           style=
           {[ 
              fonts.style.t20, 
              style.boldCenter,
              {marginBottom: 30}
            ]}
         >
           Associations
         </Text>
        <View style={{
             flexDirection:'row' , 
             flexWrap: 'wrap',
           }}
         >
          {
            user.cause_attributes &&
            <TouchableOpacity
              style={[
                style.associationContainer,
                { 
                  alignItems: 'flex-start'
                }
              ]}
              onPress={() => this.props.navigation.navigate(
                'AssociationDetail',
                { association: user.cause_attributes }
              )}
            >
              <AssociationItem association={user.cause_attributes}/>
            </TouchableOpacity>

          }
          
          <TouchableOpacity
            onPress={() => {}}
            style={[
              style.associationContainer,
              { 
                alignItems: 'flex-end'
              }
            ]}
            onPress={() => this.goToAssociations()}
          >
            <AssociationItemAdd />
          </TouchableOpacity>
         </View>
         <Separator color={colors.separatorLine} style={{marginVertical: 20}} />
          <Text
            style=
            {[ 
              fonts.style.t16, 
              style.boldCenter
            ]}
          >
           Historique des dons
          </Text>
          <Histories 
            user={user}
            type={'donation'}
          />
      </View>
    );
  }
};


const mapDispatchToProps = (dispatch) => ({
  goToAssociations: bindActionCreators(goToAssociations, dispatch),
});

export default connect(null,mapDispatchToProps)(withNavigation(Association));

const style = StyleSheet.create({
  profileBar: {
    height: 85, 
    width: metrics.deviceWidth, 
    position: 'absolute'
  },
  info:{
    height: 200,
    marginTop: 50
  },
  profileForm:{
    flex: 1, 
    paddingVertical: metrics.baseMargin
  },
  boldCenter: {
    textAlign: 'center',
    marginVertical: metrics.baseMargin,
    fontWeight: 'bold',
  },
  associationContainer: {  
    width: metrics.deviceWidth/2 - metrics.marginApp,
    height: 229,
    marginVertical: metrics.smallMargin,
    backgroundColor: 'transparent',
  },
});


