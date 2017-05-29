import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  Linking,
  TouchableOpacity,
  Platform,
  BackAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Communications from 'react-native-communications';
import moment from 'moment';

import ApiHandler from '../utils/api';
import { use } from '../redux/actions/review';
import { setBusiness } from '../redux/actions/business';

import Separator from '../components/common/Separator';
import Button from '../components/common/ButtonGradient';
import PerkFullRow from '../components/perk/PerkFullRow';
import Header from '../components/common/Header';
import Modal from '../components/Modal';

import ReservedSpaceScreen from './ReservedSpaceScreen';
import MembreshipCardScreen from './MembreshipCardScreen';
import MapPerkScreen from './MapPerkScreen';

import PopupProfile from '../components/profile/Popup';

import {
  getCategory,
} from '../constants/categories';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

const HEADER_SCROLL_DISTANCE = metrics.marginApp;

class PerkDetailScreen extends Component {

  static propTypes = {
    onClose: PropTypes.func,
    animation: PropTypes.string.isRequired,
  };

  static defaultProps = {
    animation: 'horizontal'
  };


  state = {
    scrollY: new Animated.Value(0),
    map: false,
    perk: null,
    business: null,
    category: null,
  };

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.backHandler);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.backHandler);
  }

  backHandler = () => {
    this.props.setBusiness(null);
  }


  async componentWillMount() {

    const params = this.props.navigation.state.params;


    if (params.businessId) {

      if (Platform.OS === 'android') {
        this.props.setBusiness(params.businessId);
      }

      this.props.setBusiness(params.businessId);
      this.getDetailBusiness(params.businessId, params.addressId);
      this.getDetail(params.perkId);


    }
    else {
      const { perk, business, category } = params;
      if (Platform.OS === 'android') {
        this.props.setBusiness(business.id);
      }


      this.setState({ perk, business, category })
      this.getDetail(perk.id);

    }
  }

  goBack() {
    //probleme with map 
    if (Platform.OS === 'android') {
      this.props.setBusiness(null);
    }

    this.props.navigation.goBack();
  }

  getDetailBusiness(businessId, addressId) {

    return ApiHandler.businessDetail(businessId, addressId)
      .then(response => {
        if (!response.error) {
          const category = getCategory(response.business_category_id);

          this.setState({ business: response, category });
        }
      }).
      catch(error => {

      });
  }

  getDetail(id) {
    ApiHandler.perkDetail(id)
      .then(response => {
        if (!response.error) {
          this.setState({ perk: response });
        }
        else {
          this.props.navigation.goBack();
        }
      }).catch(message => {
        this.props.navigation.goBack();
      });;
  }

  componentWillUnMount() {
    this.setState({ perk: null });
  }


  goToMemberShip() {

    const {
      user,
    } = this.props;

    const {
      perk,
      business,
    } = this.state;


    if (user.member || (
      user.first_perk_offer_attributes
      &&
      user.first_perk_offer_attributes.business_id === business.id
    )) {

      this.props.navigation.navigate('Member', { business, perk });
    }
    else {
      this.props.navigation.navigate('Reserved');
    }

  }


  setMap(flag) {
    this.setState({ map: flag });
  }



  getTextButton() {
    const { perk } = this.state;
    //perk.perk_detail_id
    if (perk.perk_detail_id === 1) {
      return 'Afficher ma carte de membre';
      //( seulement chez le commerçant )
    } else if (perk.perk_detail_id === 2) {
      return 'Nous écrire';
    } else if (perk.perk_detail_id === 3) {
      return 'Obtenir le code promo';
    }
    else {
      return '';
    }
  }


  goToAction = () => {
    const { user } = this.props;

    const { perk, business } = this.state;
    if (perk.perk_detail_id === 1) {


      this.goToMemberShip();


    } else if (perk.perk_detail_id === 2) {

      this.props.use(perk, business, false);

      const body = `Bonjour ` + (business.leader_first_name || '') + ',\n' +
        `${business.name}  semble sympa comme tout ! \n` +
        `Je souhaiterais bénéficier du bon plan « ${perk.name} » ` +
        `(Code :  « ${perk.perk_code} » , pouvez-vous me dire comment procéder ? \n` +
        `Merci par avance ! \n` +
        (user.name ? user.name : `${user.first_name} ${user.last_name}`) + '\n' +
        ``;
      Communications.email([business.email], null, null, 'Nouvelle demande de bon plan CforGood !', body);

    } else if (perk.perk_detail_id === 3) {

      this.props.use(perk, business, false);
      this.props.navigation.navigate('Promo', { business, perk });
    }

  }

  renderViewAction() {
    const { perk, business, category } = this.state;

    if (perk.perk_detail_id === 1) {
      return (
        <View
          style={[
            styles.center,
            { marginVertical: metrics.baseMargin }
          ]}
        >
          <Text
            style={[
              fonts.style.t15,
              fonts.style.mediumBold,
              stylePerkDetailScreen.tCode,
            ]}
          >
            Montrez votre carte de membre au commerçant.
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MapPerk', {
              perk, business, category
            })}
            style={[
              styles.center,
              { marginVertical: metrics.baseMargin }
            ]}
          >
            <Image
              resizeMode='contain'
              style={{
                height: 50,
                width: 50,
              }}
              source={require('../resources/icons/gps_activate.png')}
            />
            <Text
              style={[
                fonts.style.normal,
                fonts.style.bold,
                {
                  marginVertical: metrics.baseMargin
                }
              ]}
            >
              Afficher l'itinéraire
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (perk.perk_detail_id === 2) {
      return (
        <View
          style={[
            styles.row,
            styles.center,
            { marginVertical: metrics.baseMargin }
          ]}
        >
          <Text
            style={[
              fonts.style.t14,
              fonts.style.mediumBold,
              stylePerkDetailScreen.tCode,
            ]}
          >
            Envoyer-nous un email pour réserver votre bon plan
          </Text>
        </View>
      );
    } else {
      return <View />;
    }


  }


  renderStatus() {
    const { perk, category } = this.state;
    if (perk.appel || perk.durable || perk.flash) {
      return (
        <View style={[
          stylePerkDetailScreen.row,
          styles.row,
        ]}
        >
          <View
            style={[
              stylePerkDetailScreen.availableContainer,
              {
                backgroundColor: category.color,
              }
            ]}
          >
            <Image
              resizeMode='contain'
              style={{
                width: 12,
                height: 12
              }}
              source={require('../resources/icons/available.png')}
            />
          </View>
          <View
            style={{
              paddingLeft: metrics.baseMargin,
              paddingRight: 1,
              justifyContent: 'center'
            }}
          >
            <Text
              style={[
                fonts.style.t15,
                stylePerkDetailScreen.tCode,
              ]}
            >
              {
                perk.appel &&
                "Ce bon plan n'est valable qu'une seule fois."
              }
              {
                perk.durable &&
                "Valable tout le temps"
              }
              {
                perk.flash && perk.times &&
                "Ce bon est valable du " +
                moment(perk.start_date).format('l') +
                " au " +
                moment(perk.end_date).format('l') +
                ". Il est utilisable  " +
                perk.times + " fois."
              }
            </Text>
          </View>
        </View>
      )
    }
    return null;
  }

  render() {

    const {
      user,
    } = this.props;

    const {
      perk,
      business,
      category,
    } = this.state;

    const heightSeparator = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 3],
      extrapolate: 'clamp',
    });

    if (perk === null || category === null) {
      return null;
    }

    return (

      <View
        style={styles.screen.mainContainer}
      >
        <Header
          back={'-90deg'}
          text={'Bon plan'}
          color={category.color}
          style={{
            paddingHorizontal: metrics.marginApp
          }}
          onClose={() => this.goBack()}
        />
        <View style={{ flex: 1 }}>
          <Animated.ScrollView
            style={{ flex: 1 }}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
            )}
          >
            <View
              style={{
                flex: 1,
                marginHorizontal: metrics.marginApp,
                marginVertical: metrics.baseMargin
              }}
            >
              <View style={{ height: 172 + 60 }}>
                <PerkFullRow
                  business={business}
                  perk={perk}
                  category={category}
                  availableOnLeft={true}
                  detail={true}
                />
              </View>
              <View>
                <Text style={[fonts.style.t16, { fontWeight: fonts.fontWeight.f400 }]}>
                  {perk.description}
                </Text>
              </View>
              {
                this.renderStatus()
              }
              <Separator
                style={stylePerkDetailScreen.marginVertical}
                margin={0}
                color={'#979797'}
              />
              <View style={styles.center}>
                <Text style={[
                  fonts.style.t22,
                  {
                    fontWeight: fonts.fontWeight.f300
                  }
                ]}
                >
                  Envie d'en profiter ?
                  </Text>

              </View>
              {
                this.renderViewAction()
              }
            </View>
          </Animated.ScrollView>
          <Animated.View
            style={[
              stylePerkDetailScreen.header,
              {
                height: heightSeparator,
                backgroundColor: category.color,
              }
            ]}
          />
        </View>
        <Button
          onPress={() => this.goToAction()}
          type={'simple'}
          style={{
            backgroundColor: category.color
          }}
          text={this.getTextButton()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data
});

const mapDispatchToProps = (dispatch) => ({
  use: bindActionCreators(use, dispatch),
  setBusiness: bindActionCreators(setBusiness, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PerkDetailScreen);

const stylePerkDetailScreen = {
  marginVertical: {
    marginVertical: metrics.baseMargin,
  },
  tBeneficie: {
    color: colors.darkGray,
    fontFamily: fonts.type.base,
    fontSize: metrics.deviceWidth / 22,
  },
  tCode: {
    color: colors.grayDate,
    fontWeight: '300',
    //textAlign: 'center'
  },
  row: {
    marginVertical: metrics.baseMargin,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: metrics.smallMargin,
  },
  availableContainer: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
}; 
