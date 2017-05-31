import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ApiHandler from '../utils/api';
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

  state = {
    businesses: [],
    business: null,
    address: null,
    perk: null,
    color: null,
    offer: null
  };

  shouldComponentUpdate(nextProps, nextState) {

    if (
      nextProps.categories !== this.props.categories
      ||
      nextState.business !== this.state.business
      ||
      nextProps.businesses !== this.props.businesses
      ||
      nextState.perk !== this.state.perk
      ||
      nextState.offer !== this.state.offer
      ||
      nextProps.offer !== this.props.offer
      ||
      nextProps.goAssocation !== this.props.goAssocation
      ||
      nextProps.businessId !== this.props.businessId
    ) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    Permissions.getPermissionStatus('location')
      .then(response => {
        if (response !== 'authorized') {
          this._requestPermission();
        }
      }).catch(e => this.notifyAutorize());

  }

  componentWillMount() {
    this.updateListBusiness(this.props.businesses, this.props.categories);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.goAssocation === true && this.props.goAssocation === false) {
      this.props.goToAssociations(false);
      this.props.navigation.navigate('Association')
    }
    else if (nextProps.offer !== null && this.props.offer && nextProps.offer != this.props.offer) {
      const { perk, business, category } = nextProps.offer;
      this.setPerk(perk, business, category);

    }
    else if (nextProps.categories !== this.props.categories
      ||
      nextProps.businesses !== this.props.businesses
      &&
      nextProps.businesses
    ) {
      this.updateListBusiness(nextProps.businesses, nextProps.categories);
    }

  }

  _requestPermission = () => {

    Permissions.requestPermission('location')
      .then(response => {

        if (String(response) !== 'authorized') {
          Permissions.openSettings
          this.notifyAutorize();
        }
      }).catch(e => this.notifyAutorize())
  }

  notifyAutorize() {
    Alert.alert(
      'Erreur',
      "la géolocalisation n'est pas activée, malheureusement sans elle aucun commerce ne peut apparaître !",
      [
        { text: 'Fermer', onPress: () => { } },
      ]
    );
  }

  showBusiness = (business, address) => {
    this.setState({ business, address });
  }


  setPerk = async (perk, business, category) => {
    if (perk && business) {
      let businessDetail = business;
      let perkDetail = perk;
      let addressId = this.state.address ?
        this.state.address.id
        :
        this.state.addresses[0].id;

      await ApiHandler.businessDetail(business.id, addressId)
        .then(response => {
          if (!response.error) {
            const category = getCategory(response.business_category_id);
            businessDetail = response;
          }
        }).
        catch(error => {

        });

      ApiHandler.perkDetail(perk.id)
        .then(response => {
          if (!response.error) {
            this.props.navigation.navigate('PerkDetail', {
              business: businessDetail,
              category: category,
              perk: response
            });
          }
        }).catch(message => {
        });

    }
  }

  updateListBusiness(businesses, categories) {
    if (businesses.length > 0) {
      if (categories.length > 0 && businesses) {
        this.setState({
          businesses: businesses
            .filter(obj =>
              categories.indexOf(parseInt(obj.business_category_id)) !== -1
            // &&
            // obj.online === false
            )
        });
      }
      else {
        this.setState({ businesses });
      }
    }


  }

  render() {
    return (
      <View style={styles.screen.container}>
        <Header module={'business'} />
        <View style={[
          Platform.OS === 'android' &&
            this.props.businessId ?
            { height: 1 }
            :
            { flex: 1 }
        ]}
        >
          <MapView
            showBusiness={this.showBusiness}
            businesses={this.state.businesses}
            business={this.state.business}
            address={this.state.address}
          />
          <Filter
            onPress={() => this.props.navigation.navigate(
              'Filter',
              {
                from: 'maps'
              }
            )}
            styleButton={{
              left: metrics.deviceWidth > 320 ? (metrics.deviceWidth - 125) / 2 : 80
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  businesses: state.business.entities,
  categories: state.filters.categories,
  goAssocation: state.association.go,
  offer: state.offer,
  businessId: state.business.businessId,
});

const mapDispatchToProps = (dispatch) => ({
  goToAssociations: bindActionCreators(goToAssociations, dispatch),
});



export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

const stylesMaps = StyleSheet.create({
  BusinessRowContainer: {
    backgroundColor: 'white',
    height: metrics.rowHeight,
  }
}); 
