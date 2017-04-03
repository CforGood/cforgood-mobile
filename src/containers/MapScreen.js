import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { goToAssociations } from '../redux/actions/association';
import { 
  styles,
  colors,
  metrics
} from '../themes';

import Filter from '../components/common/Filter';
import Header from '../components/common/HeaderApp';
import BusinessRow from '../components/business/BusinessRow';
import MapV from '../components/business/MapView';
import MapView from '../components/map/MapView';

import PerkDetailScreen from './PerkDetailScreen';

class MapScreen extends Component {
  
  state = {
    business: null,
    address: null,
    perk: null,
    color: null,
  };
  
  shouldComponentUpdate(nextProps , nextState){

    if(
      nextState.business !== this.state.business
      ||
      nextProps.businesses !== this.props.businesses
      ||
      nextState.perk !== this.state.perk
      ||
      nextProps.offer !== this.props.offer
      ||
      nextProps.goAssocation !== this.props.goAssocation
      ||
      nextProps.businessId !== this.props.businessId
    ){
      return true;
    }
    return false;
  }

  componentDidMount() {
    Permissions.getPermissionStatus('location', 'always')
      .then(response => {
        if (response !== 'authorized') {
          this._requestPermission();
        }
    });
    
  }
  
//  componentWillMount(){
//    this.nearMe(this.props.businesses);
//  }

  componentWillReceiveProps(nextProps){
    if(nextProps.goAssocation === true &&  this.props.goAssocation === false){
      this.props.goToAssociations(false);
      this.props.navigation.navigate('Association')
    }
    else if(nextProps.offer !== null && this.props.offer){
      this.setPerk(nextProps.offer.perk, nextProps.offer.business, nextProps.offer.category);
    }
  }

  _requestPermission = () => {
    Permissions.requestPermission('location', 'always')
      .then(response => {
        if (response !== 'authorized') {
          Permissions.openSettings
        }
      }).catch(e => console.log(e))
  }

//  nearMe(businesses){
//    if(businesses && businesses[0]){
//      const category = getCategory(businesses[0].business_category_id);//

//      this.setState({
//        business: businesses[0], 
//        address: businesses[0].addresses[0],
//        category
//      })
//    }
//  }

  showBusiness = (business, address) => {
    this.setState({ business, address });
  }

  setPerk = (perk, business, category) => {
    this.setState({ perk, category });
  }

  onValidate = () => {
    this.setState({ perk: null });
  }


  render() {

    return (
      <View style={styles.screen.container}>
        
        <Header module={'business'} />
        <View style={{flex: 1}}>
          {
            // need to fix map on android
            Platform.OS === 'android' &&
            this.props.businessId !== null
            ?
            null
            :
            <MapView
              showBusiness={this.showBusiness}
              businesses={this.props.businesses}
              business={this.state.business}
              address={this.state.address}
            />
          }
          

          <Filter 
            onPress={() => this.props.navigation.navigate(
              'Filter',
              {
                from: 'maps'
              }
            )}
            styleButton={{
              left: metrics.deviceWidth  > 320 ? (metrics.deviceWidth- 125)/2 : 80
            }}
          />
        </View>

        {
          this.state.business && 
          <View style={stylesMaps.BusinessRowContainer}>  
            <BusinessRow 
              business={this.state.business}
              address={this.state.address}
              setPerk={this.setPerk}
            />
          </View>
        }
        {
          this.state.perk &&
          <PerkDetailScreen
            visible={true}
            onClose={() => this.setPerk(null)}
            perk={this.state.perk}
            business={this.state.business}
            category={this.state.category}
            onValidate={() => this.onValidate()}
            animation={'vertical'}
          />
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  businessId: state.business.businessId,
  businesses: state.business.entities,
  goAssocation: state.association.go,
  offer: state.offer
});

const mapDispatchToProps = (dispatch) => ({
  goToAssociations: bindActionCreators(goToAssociations, dispatch),
});



export default connect(mapStateToProps,mapDispatchToProps)(MapScreen);
 
const stylesMaps = StyleSheet.create({ 
  BusinessRowContainer: {
    backgroundColor: 'white',
    height: metrics.rowHeight,
  }
}); 
