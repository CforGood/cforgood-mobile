import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  styles,
  metrics,
  fonts
} from '../themes';

import { setBusiness } from '../redux/actions/business';
import SearchBar from '../components/common/SearchBar';
import BusinessList from '../components/business/BusinessList';
import AssociationList from '../components/Association/AssociationList';

class SearchScreen extends Component {

  state = {
    list: [],
    textSearch: '',
    module: '',
    keyborad: false
  };

  componentWillMount() {
    const { module } = this.props.navigation.state.params;
    this.setState({ module })
  }

  componentWillUnMount() {
    this.setState({ list: [] })
  }

  goBack() {
    //probleme with map 
    if (Platform.OS === 'android') {
      this.props.setBusiness(null);
    }//
    this.props.navigation.goBack();
  }

  filter = (textSearch) => {

    let list = [];

    if (textSearch.length > 2 &&
      (
        (this.props.businesses && this.state.module === "business")
        ||
        (this.props.businesses_perks && this.state.module === "perks")
        ||
        (this.props.associations && this.state.module === "association")
      )
    ) {

      switch (this.state.module) {
        case 'business':
          list = this.props.businesses.filter(business =>
            business.name.toLowerCase().includes(textSearch.toLowerCase())
            ||
            business.labels.find(label => label.name.toLowerCase().includes(textSearch.toLowerCase()))
            ||
            business.perks.find(perk => perk.name.toLowerCase().includes(textSearch.toLowerCase()))
          );
          break;
        case 'perks':
          list = this.props.businesses_perks.filter(business =>
            business.name.toLowerCase().includes(textSearch.toLowerCase())
            ||
            business.labels.find(label => label.name.toLowerCase().includes(textSearch.toLowerCase()))
            ||
            business.perks.find(perk => perk.name.toLowerCase().includes(textSearch.toLowerCase()))
          );
          break;
        case 'association':
          list = this.props.associations.filter(association =>
            association.name.toLowerCase().includes(textSearch.toLowerCase())
          );
          break;
      }
    }

    this.setState({
      list,
      textSearch,
      keyborad: true
    });

  }

  renderList() {

    switch (this.state.module) {
      case 'business' || 'perks':
        return <BusinessList
          businesses={this.state.list}
        />
        break;
      case 'association':
        return <AssociationList
          associations={this.state.list}
        />
        break;
    }

  }

  renderText() {
    if (this.state.textSearch.length <= 2) {

      return (
        <Text
          style={[
            fonts.style.medium,
            {
              textAlign: 'center',
              fontSize: 22,
              color: '#8B8B8B',
              marginTop: 40,
              marginHorizontal: metrics.marginApp
            }
          ]}
        >
          {
            this.state.module === 'business' || this.state.module === 'perks' ?
              "”  Entrez le nom d'un bon plan ou d'un commerçant ”"
              :
              "”  Entrez le nom de l’association ”"
          }
        </Text>
      )

    }


    return null;

  }

  renderImage() {

    let resource = require('../resources/images/map-of-roads.png');
    if (this.state.module === 'association') {
      resource = require('../resources/images/handshake.png');
    }

    return (
      <View
        style={[
          styles.screen.overlay,
          styles.center
        ]}
      >

        <Image
          resizeMode={'contain'}
          source={resource}
          style={{
            width: metrics.deviceWidth / 1.5
          }}
        />
      </View>
    )
  }



  render() {
    return (

      <View style={styles.screen.mainContainer}>
        {
          this.renderImage()
        }
        <SearchBar
          filter={this.filter}
          goBack={() => this.goBack()}
        />
        {
          this.renderText()
        }
        {
          this.renderList()
        }


      </View>
    );
  }
}

const mapStateToProps = state => ({
  associations: state.association.entities,
  businesses: state.business.entities,
  businesses_perks: state.business.entities,
});

const mapDispatchToProps = (dispatch) => ({
  setBusiness: bindActionCreators(setBusiness, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

