import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  Linking,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';
import Communications from 'react-native-communications';
import moment from 'moment';

import ApiHandler from '../utils/api';
import { review } from '../redux/actions/review';

import Separator from '../components/common/Separator'; 
import Button from '../components/common/ButtonGradient';
import PerkFullRow from '../components/perk/PerkFullRow';
import Header from '../components/common/Header';
import Modal from '../components/Modal';

import ReservedSpaceScreen from './ReservedSpaceScreen';
import MembreshipCardScreen from './MembreshipCardScreen';
import MapPerkScreen from './MapPerkScreen';



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
    reserved: false,
    validationPopup: false,
    map: false,
    membership: false,
    perk: {},
    offset: this.props.animation === 'horizontal' ?
    new Animated.ValueXY({x: metrics.deviceWidth, y: 0})
    :
    new Animated.ValueXY({x: 0, y: metrics.deviceHeight})
    ,
  };

  componentWillMount() {

    this.setState({perk: this.props.perk});
    this.getDetail();

    this.openModal();
  }

  componentWillUnMount() {
    this.setState({perk: null});
    this.closeModal();
  }


  setMemberShip(flag) {
    
    this.setState({membership: flag});
    if(flag === true){
      this.setReservedScreen(false);
    }
  }

  setReservedScreen(flag){
    this.setState({reserved: flag});
  }

  setMap(flag){
    this.setState({map: flag});
  }

  validate = () => {
    
    this.props.review(this.props.perk, this.props.business);
    this.setState({membership: false, reserved: false});

    setTimeout(() => { this.props.onValidate(); }, 50);

  }

  getDetail () {
    ApiHandler.perkDetail(this.props.perk.id)
    .then(response => {
      if(!response.error){
        this.setState({ perk: response });
      }
    });
  }


  openModal = () => {
    
    Animated.timing(this.state.offset, {
      duration: 350,
      toValue: 0
    }).start();

  }

  closeModal = () => {
    
    Animated.timing(this.state.offset, {
      duration: 350,
      toValue: metrics.deviceWidth
    }).start(this.props.onClose);

    
  }

  getTextButton() {
    const { perk } = this.state;
    //perk.perk_detail_id
    if( perk.perk_detail_id === 1){
      return 'Afficher ma carte de membre';
      //( seulement chez le commerçant )
    } else if( perk.perk_detail_id === 2){
      return 'Nous écrire';
    } else if( perk.perk_detail_id === 3){
      return 'Me rendre sur le site';
    }
     else {
      return '';
    }
  }

  openBrowser(url) {
    if(url && url !== ''){
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        } else {
            console.log('Don\'t know how to open URI: ' + url);
        }
        return false
      });
    }
    
  }

  goToAction = () => {
    const { business, user } = this.props;
    
    const { perk } = this.state;
    if( perk.perk_detail_id === 1){
      
      this.setMemberShip(true);
    } else if( perk.perk_detail_id === 2){
      
      this.props.review(perk, business, false);

      const body = `Bonjour ` + (business.leader_first_name || '') + ',\n' +
       `${business.name}  semble sympa comme tout ! \n` +
       `Je souhaiterais bénéficier du bon plan « ${perk.name} » `+ 
       `(Code :  « ${perk.perk_code} » , pouvez-vous me dire comment procéder ? \n`+ 
       `Merci par avance ! \n`+
       (user.name ? user.name : `${user.first_name} ${user.last_name}`) + '\n' +
       ``;
      Communications.email([business.email], null,null,'Nouvelle demande de bon plan CforGood !',body);
      
    } else if( perk.perk_detail_id === 3){
      
      this.props.review(perk, business, false);
      this.openBrowser(business.url);

      //this.setReservedScreen(true)
    }
    
  }

  renderViewAction() {
    const { perk } = this.state;

    if( perk.perk_detail_id === 1){
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
            onPress={() => this.setMap(true)}
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
    } else if( perk.perk_detail_id === 2){
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
    } else if( perk.perk_detail_id === 3){
      return (
        <View style={[
            styles.row,
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
            Utilisez ce code : 
          </Text>  
          <Text 
            style={[ 
              fonts.style.t18,
              fonts.style.bold
            ]}
          >
            {perk.perk_code}
          </Text> 
        </View>
      );
    }
     else {
      return <View />;
    }

    

  }
  

  renderStatus(){
    const { perk } = this.state;
    const { category } = this.props;
    if(perk.appel || perk.durable || perk.flash){
      return(
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
          <View style={{paddingLeft: metrics.baseMargin, paddingRight: 1}}>
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
              "valable tout le temps"
            }
            {
              perk.flash && perk.times && 
              "Ce bon est valable du "+  
              moment(perk.start_date).format('l') +
              " au "+ 
              moment(perk.end_date).format('l') +
              ". Il est utilisable  "+ 
              perk.times +" fois." 
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
      onClose,
      onValidate,
      business,
      category,
      visible,
      animation
    } = this.props;

    const { perk } = this.state;

    const heightSeparator = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 3],
      extrapolate: 'clamp',
    });

    return (
      <Modal
        onClose={() => this.closeModal()}
        animationType={'none'}
        blurType={'light'}
        blurAmount={0}
        visible={visible}
      >
        <Animated.View
          style={[
            styles.screen.mainContainer,
            {
              transform:
              [
                animation === 'horizontal'
                ?
                {translateX: this.state.offset.x}
                :
                {translateY: this.state.offset.y}
              ]
            }
          ]}
        >
          <Header
            onClose={() => this.closeModal()}
            back={animation === 'horizontal' ? '0' : '-90deg'}
            text={'Bon plan'}
            color={category.color}
            style={{
              paddingHorizontal: metrics.marginApp
            }}
          />
          <View style={{flex: 1}}>
            <Animated.ScrollView 
              style={{flex: 1}}
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
              )}
            > 
              
              <View 
                style={{
                  flex:1, 
                  marginHorizontal: metrics.marginApp,
                  marginVertical: metrics.baseMargin

                }}
              >
                <View style={{ height: 172+60 }}>
                  <PerkFullRow
                    business={business}
                    perk={perk}
                    category={category}
                    availableOnLeft={true}
                    detail={true}
                  />
                </View> 
                <View 
                  style={{
                    marginTop: metrics.marginApp
                  }}
                >  
                  <Text style={fonts.style.t16}>
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
          {
            perk.perk_detail_id === 1 &&
            <MapPerkScreen
              onClose={() => this.setMap(false)}
              visible={this.state.map}
              category={category}
              business={business}
            />
          }
          
          
          <MembreshipCardScreen
            business={business}
            perk={perk}
            visible={this.state.membership}
            onValidate={this.validate}
            onClose={() => this.setMemberShip(false)}
            image={perk.picture || business.picture}
          /> 
        </Animated.View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data
});

const mapDispatchToProps = (dispatch) => ({
  review: bindActionCreators(review, dispatch),
});

export default  connect(mapStateToProps , mapDispatchToProps)(PerkDetailScreen);

const stylePerkDetailScreen = { 
  marginVertical: {
    marginVertical: metrics.baseMargin,
  },
  tBeneficie: {
    color: colors.darkGray,
    fontFamily: fonts.type.base,
    fontSize: metrics.deviceWidth/22, 
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
    width:30,
    height:30,
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
