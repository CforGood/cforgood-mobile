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

import ApiHandler from '../../utils/api';
import { setBusiness } from '../../redux/actions/business';
import Separator from '../../components/common/Separator';
import Button from '../../components/common/ButtonGradiant';
import PerkFullRow from '../../components/perk/PerkFullRow';
import PerkHeader from '../../components/perk/PerkHeader';
import Header from '../../components/common/Header';
import ReviewsScreen from './ReviewsScreen';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

const HEADER_SCROLL_DISTANCE = metrics.marginApp;

class PerkListScreen extends PureComponent {

  state = {
    scrollY: new Animated.Value(0),
    review: false,
    perks: []
  };

  componentWillMoun() {
    const { business } = this.props.navigation.state.params;

    this.setState({
      perks: business.perks.sort((a, b) => {
        return a.usable_for_user !== null && b.usable_for_user === null
      })
    });
  }

  setPerk = async (perk) => {
    const { business, category } = this.props.navigation.state.params;

    if (perk && business) {
      let perkDetail = perk;
      let addressId = business.address ?
        business.address.id
        :
        business.addresses[0].id;



      ApiHandler.perkDetail(perk.id)
        .then(response => {
          if (!response.error) {
            this.props.navigation.navigate('PerkDetail', {
              business,
              category,
              perk: response,
            });
          }
        }).catch(message => {
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.perk !== null && this.props.perk === null) {
      this.goBack();
    }
  }

  goBack() {
    //probleme with map 
    if (Platform.OS === 'android') {
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

    const { business, category } = this.props.navigation.state.params;


    return (
      <View style={styles.screen.mainContainer}>
        <Header
          close={true}
          color={category.color}
          text={'Les bons plans'}
        />
        <View style={{ flex: 1 }} >
          <Animated.ScrollView
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{
                nativeEvent: { contentOffset: { y: this.state.scrollY } }
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  perk: state.review.perk
});

const mapDispatchToProps = (dispatch) => ({
  setBusiness: bindActionCreators(setBusiness, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PerkListScreen);

const stylePerkListScreen = {
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
}; 
