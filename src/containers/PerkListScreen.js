import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setBusiness } from '../redux/actions/business'; 
import Separator from '../components/common/Separator'; 
import Button from '../components/common/ButtonGradient';
import PerkFullRow from '../components/perk/PerkFullRow';
import PerkHeader from '../components/perk/PerkHeader';
import Header from '../components/common/Header';
import PerkDetailScreen from './PerkDetailScreen';
import ReviewsScreen from './ReviewsScreen';

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

class PerkListScreen extends PureComponent { 
  
  state = {
    scrollY: new Animated.Value(0),
    perk: null,
    review: false,
  };
  

  setPerk(perk){
    if(perk && perk.usable_for_user) {
      this.setState({ perk });
    }
    else if(perk === null){
      this.setState({ perk });
    }
  }

  onValidate = () => {
    this.goBack();

    this.setPerk(null);
  }

  goBack() {
    //probleme with map 
    if(Platform.OS === 'android') {
      this.props.setBusiness(null);
    }

    this.props.navigation.goBack();
  }

  render() {
    const heightSeparator = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 3],
      extrapolate: 'clamp',
    });

    const { business } = this.props.navigation.state.params;
    
    const category = getCategory(business.business_category_id);

    return (
      <View style={styles.screen.mainContainer}>
        <Header
          close={true}
          color={category.color}
          text={'Les bons plans'}
        />

        <View style={{flex:1}} >
          <Animated.ScrollView
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{
                nativeEvent: {contentOffset: {y: this.state.scrollY}}
              }]
            )}
          >
            {
              business.perks.map((perk, key) => (
                <TouchableOpacity 
                  key={key}
                  onPress={() => this.setPerk(perk)}
                  style={{
                    height: 170,
                    marginHorizontal: metrics.marginApp,
                    marginTop: 20
                  }}
                  activeOpacity={0.95}
                >
                  <PerkFullRow
                    business={business}
                    goToPerk={this.goToPerk}
                    perk={perk}
                    category={category}
                  />
                </TouchableOpacity>
              ))
            }
          </Animated.ScrollView>
          <Animated.View 
            style={[stylePerkListScreen.header, 
              {
                height: heightSeparator,
                backgroundColor: category.color,
              }
            ]} 
          />
        </View>
        {
          this.state.perk &&
          <PerkDetailScreen
            visible={true}
            onClose={() => this.setPerk(null)}
            perk={this.state.perk}
            business={business}
            category={category}
            onValidate={() => this.onValidate()}
          />
        }
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setBusiness: bindActionCreators(setBusiness, dispatch),
});

export default connect(null, mapDispatchToProps)(PerkListScreen);

const stylePerkListScreen = {
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  }, 
}; 
