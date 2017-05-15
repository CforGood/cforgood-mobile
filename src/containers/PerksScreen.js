import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  ListView,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';

import Filter from '../components/common/Filter';
import Separator from '../components/common/Separator';
import ButtonGradient from '../components/common/ButtonGradient';
import SeparatorColor from '../components/common/SeparatorColor';
import Header from '../components/common/HeaderApp';
import PerkAddressRow from '../components/perk/PerkAddressRow';
import PerkFilter from '../components/perk/PerkFilter';
import ReviewsScreen from './ReviewsScreen';

import { distance } from '../helpers/distance';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

import {
  getCategory,
} from '../constants/categories';


const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class PerksScreen extends Component {

  state = {
    sort: 'nearme',
    more: false,
    perks: [],
    popularPerk: [],
    business: null,
    filter: 'nearme',
    count: 4,
    dataSource: ds.cloneWithRows([])

  };

  setFilter(filter) {
    this.setState({ filter });
  }


  setPerk = (perk, business, category) => {
    if (perk && business) {
      this.props.navigation.navigate('PerkDetail',
        {
          perkId: perk.id,
          businessId: business.id,
          addressId: (
            business.address ?
              business.address.id
              :
              business.addresses[0].id
          ),
        }
      );
    }
  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.businesses !== this.props.businesses
      ||
      nextProps.categories !== this.props.categories
    ) {
      this.loadPerks(nextProps.businesses, nextProps.categories);
    }
  }

  componentWillMount() {
    this.loadPerks(this.props.businesses, this.props.categories);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.sort !== this.state.sort) {

      this._onRefresh(nextState.sort);
    }
  }


  loadPerks(businesses, categories) {
    let perks = [];

    let results = businesses;
    if (categories.length > 0) {
      results = businesses.filter(obj =>
        categories.indexOf(parseInt(obj.business_category_id)) !== -1
        ||
        (categories.indexOf(13) !== -1 && obj.online === true)
      )
    }


    if (businesses) {
      results.forEach(business => {

        const category = getCategory(business.business_category_id);
        business.perks.forEach((perk) => {
          if (perk.usable_for_user) {
            perks.push({
              perk,
              business: {
                id: business.id,
                name: business.name,
                picture: business.picture,
                addresses: business.addresses,
                email: business.email,
                url: business.url,
                leader_first_name: business.leader_first_name
              },
              category
            });
          }

        })
      })


      this.setState({
        perks,
        popularPerk: perks.slice(0).sort((a, b) => { return b.perk.nb_views - a.perk.nb_views }),
        dataSource: this.state.dataSource.cloneWithRows(perks.slice(0, 4)),
      });
    }

  }

  loadMore() {
    const count = this.state.count + 4;
    if (count < this.state.perks.length) {

      this.setState({
        more: true,
        count,
        dataSource: this.state.dataSource.cloneWithRows(
          this.state.sort === 'nearme' ? this.state.perks.slice(0, count) : this.state.popularPerk.slice(0, count)
        ),
      });
    }

  }

  _renderRow = (obj) => {
    return (
      <TouchableOpacity
        onPress={() => this.setPerk(obj.perk, obj.business, obj.category)}
        style={style.container}
        activeOpacity={0.95}
      >
        <PerkAddressRow
          business={obj.business}
          perk={obj.perk}
          category={obj.category}
        />
      </TouchableOpacity>
    )
  }

  _onRefresh = (sort) => {
    this.setState({
      more: false,
      count: 4,
      dataSource: this.state.dataSource.cloneWithRows(
        sort === 'nearme' ? this.state.perks.slice(0, 4) : this.state.popularPerk.slice(0, 4)
      ),
    });
  }

  sortBy = (sortType) => {
    this.setState({
      sort: sortType,
    });
  }

  render() {


    return (
      <View style={styles.screen.mainContainer}>
        <Header
          module={'business'}
        />
        <View style={{ flex: 1 }}>
          <PerkFilter sortBy={this.sortBy} />
          <View style={{ flex: 1 }} >
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}

              enableEmptySections={true}
              onEndReachedThreshold={4}
              initialListSize={4}
              onEndReached={() => this.loadMore()}
              refreshControl={<RefreshControl
                refreshing={false}
                onRefresh={() => this._onRefresh(this.state.sort)}
                tintColor={colors.commerce}
                colors={colors.gradientColor}
                progressBackgroundColor="#ffffff"
              />
              }
            />
            {
              this.state.more &&
              <View style={style.header} >
                <SeparatorColor />
              </View>
            }

            <Filter
              onPress={() => this.props.navigation.navigate('Filter', { from: 'perk' })}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  businesses: state.business.entities,
  categories: state.filters.categoriesPerks,
  perk: state.review.perk,
  location: state.location.latlng,
});


export default connect(mapStateToProps)(PerksScreen);



const style = {
  container: {

    height: 153,
    flex: 1,
    marginVertical: metrics.baseMargin,
    paddingHorizontal: metrics.marginApp,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    overflow: 'hidden',
  },
}; 
