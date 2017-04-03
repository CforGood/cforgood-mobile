import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  ListView
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
import PerkDetailScreen from './PerkDetailScreen';

import {
  styles,
  colors,
  fonts,
  metrics, 
} from '../themes';

import {
  getCategory,
} from '../constants/categories';


const HEADER_SCROLL_DISTANCE = metrics.marginApp;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class PerksScreen extends PureComponent { 
  
  state = {
    perks: [],
    business: null,
    perk: null,
    filter: 'nearme',
    scrollY: new Animated.Value(0),
    count: 4,
    dataSource: ds.cloneWithRows([])

  };


  setFilter(filter) {
    this.setState({ filter });
  }

  setPerk(perk, business = null, category = null){
    if(perk && perk.usable_for_user) {
      this.setState({ perk, business, category });
    }
    else if(perk === null){
      this.setState({ perk });
    }
  }

  onValidate = () => {
    
    //this.props.navigation.navigate('MapScreen');
    this.setState({perk: null});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.perk !== null && this.props.perk === null){
      this.props.navigation.goBack();
    }
    if(nextProps.businesses !== this.props.businesses){
      this.loadPerks(nextProps.businesses);
    }
  }

  componentWillMount() {
    this.loadPerks(this.props.businesses);
  }

  loadPerks(businesses) {
    let perks = [];
    if(businesses){
      businesses.forEach(business => {

        const category = getCategory(business.business_category_id);
        business.perks.forEach((perk) => {
          perks.push({
            perk,
            business: {
              id: business.id,
              name: business.name,
              picture: business.picture,
              addresses: business.addresses,
              email: business.email,
              leader_first_name: business.leader_first_name
            },
            category 
          });
        })
      })

      
      this.setState({
        perks,
        dataSource: this.state.dataSource.cloneWithRows( perks ),
      });
      //perks.s.slice(0, this.state.count)
    }
    
  }

  loadMore() {
    
//    const count = this.state.count + 4;
//    if(count < this.state.perks.length){
//      this.setState({
//        count,
//        businesses: this.state.perks.slice(0, count),
//      });
//    }
    
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

  render() {
    const heightSeparator = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 3],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.screen.mainContainer}>
        <Header 
          module={'business'}
        />
        <View style={{flex:1}}>
          <PerkFilter />
          <View style={{flex:1}} >
            <Animated.ScrollView
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
              )}
            >
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                onEndReached={() => this.loadMore()}
                enableEmptySections={true}
              />
            </Animated.ScrollView>
            <Animated.View style={[
                style.header, 
                {
                  height: heightSeparator
                }
              ]}
            >
              <SeparatorColor />
            </Animated.View>
            <Filter 
              onPress={() => this.props.navigation.navigate('Filter')}
            />
          </View>  
        </View>
        {
          this.state.perk &&
          <PerkDetailScreen
            visible={true}
            onClose={() => this.setPerk(null)}
            perk={this.state.perk}
            business={this.state.business}
            category={this.state.category}
            onValidate={() => this.onValidate()}
          />
        }        
      </View>
    );
  }
}

const mapStateToProps = state => ({
  businesses: state.business.entities,
  perk: state.review.perk,
});


export default connect(mapStateToProps)(PerksScreen);



const style = {
  container: {
    
    height:153,
    flex: 1,
    marginVertical: metrics.baseMargin,
    paddingHorizontal: metrics.marginApp,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
}; 
