import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ApiHandler from '../utils/api';

import Back from '../components/common/Icon';
import Share from '../components/common/Share';
import Separator from '../components/common/Separator';
import Detail from '../components/common/Detail';

import Commitment from '../components/business/Commitment';
import Social from '../components/business/Social';
import BusinessContact from '../components/business/BusinessContact';
import BusinessLeader from '../components/business/BusinessLeader';
import BusinessHeader from '../components/business/BusinessHeader'; 

import Modal from '../components/Modal';
import Button from '../components/common/ButtonGradient';
import { setBusiness } from '../redux/actions/business';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

import {
  getCategory,
} from '../constants/categories';



const HEADER_MAX_HEIGHT = 221;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 70 : 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class BusinessScreen extends PureComponent { 
  state = {
    scrollY: new Animated.Value(0),
    business: null,
  };
  

  async componentWillMount() {

    const params = this.props.navigation.state.params;
    
    if(params.business){
      this.setState({business: params.business})
      this.getDetail(params.business.id, params.address.id);
    }
    else if( params.businessId ) {
      await this.getDetail(params.businessId, params.addressId);
    }
    else {
      this.goBack();
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.perk !== null && this.props.perk === null){
      this.goBack();
    }
  }

  goBack() {
    //probleme with map 
    if(Platform.OS === 'android') {
      this.props.setBusiness(null);
    }

    this.props.navigation.goBack();
  }

  getDetail (businessId, addressId) {
    
    //probleme with map 
    if(Platform.OS === 'android'){
      this.props.setBusiness(businessId);
    }
    
    ApiHandler.businessDetail(businessId, addressId)
    .then(response => {
      if(!response.error){
        this.setState({ business: response });
      }
    }).
    catch(error => {

    });
  }

  render() {

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

    var colorOpacity = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: ['white', colors.darkGray]
    });

    const titleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT + metrics.marginApp / 2, HEADER_MAX_HEIGHT + metrics.marginApp],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    
    const detailsBusiness  = this.state.business;
    const category = getCategory(detailsBusiness.business_category_id);
    
    if(!detailsBusiness)
     return null;
   
    return (
        
        <View style={styles.screen.mainContainer}>
          <Animated.ScrollView 
            style={{flex:1}}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
            )}
          > 
            <View 
              style={{  
                  height: 221
              }}
            />
            <View style={style.container} >
              
              <BusinessHeader
                name={detailsBusiness.name}
                category={category}
                online={detailsBusiness.online}
                address={detailsBusiness.address}
              />
              <Separator 
                style={style.marginVertical}
                margin={0}
              />

              <Detail 
                title={'Leurs engagements'}  
              />  

              <View style={styles.wrap}>
              {
                detailsBusiness.labels &&
                detailsBusiness.labels.map((label, key) => 
                  <Commitment
                    index={key}
                    key={key}
                    name={label.name}
                  />
                )
              }
              </View>
              
              <Separator 
                style={style.marginVertical}
                margin={0}
              />
              
              <View>
                <Detail 
                  title={'En quelques mots'} 
                  description={detailsBusiness.description} 
                />
              </View>

              <Separator 
                style={style.marginVertical}
                margin={0}
              />
              {
                detailsBusiness.address &&
                <BusinessContact 
                  business={detailsBusiness}
                  category={category}
                />
              }
              
              <Separator 
                style={style.marginVertical}
                margin={0}
                color={'#979797'}
              />
              

              <BusinessLeader
                color={category.color}
                business={detailsBusiness}
              />
            </View>  
          </Animated.ScrollView>

          <Animated.View 
            style={[
              style.header, 
              {
                height: headerHeight,
                borderBottomColor: category.color
              }
            ]}
          >
            <View style={styles.row} >
              <Animated.View
                style={[
                  style.titleContainer,
                  {
                    opacity: titleOpacity,
                  },
                ]}
              >
                <Text 
                  style={fonts.style.title}
                >
                  {detailsBusiness.name}
                </Text>
              </Animated.View>
              
            </View> 
            <Animated.Image
              style={[
                style.backgroundImage,
                {
                  opacity: imageOpacity,
                  transform: [
                    {translateY: imageTranslate}
                  ]
                },
              ]}
              source={{uri: detailsBusiness.picture}}
            >
              <Share
                url={`/businesses/${detailsBusiness.id}?address_id=${detailsBusiness.id}&perk_id=${detailsBusiness.perks[0].id}`}
                title={detailsBusiness.name}
                message={detailsBusiness.description}
                style={style.share} 
              />
            </Animated.Image>
            <TouchableOpacity 
                onPress={() => this.goBack()}
                style={[
                  style.backContainer,
                ]}
              >
                <Animated.Image
                  resizeMode={'contain'}
                  style={[
                    {
                      height: 36,
                      width: 36,
                      tintColor: colorOpacity,
                      transform:[{rotate: '-90deg'}],
                    }
                  ]}
                  source={require('../resources/icons/back-arrow-circular-symbol.png')}
                />
              </TouchableOpacity>
          </Animated.View>
          
          <Button
            type={'simple'}
            onPress={() => this.props.navigation.navigate('PerkList', {business: detailsBusiness})}
            style={{
              backgroundColor: category.color
            }}
            text={'Voir nos bons plans '}
          />
        </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  perk: state.review.perk
});

const mapDispatchToProps = (dispatch) => ({
  setBusiness: bindActionCreators(setBusiness, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessScreen);


const style = {
  container:{
    margin: metrics.marginApp,
  },
  backContainer: {
    position: 'absolute',
    top:  (Platform.OS === 'ios' ?  27 : 7),
    left: metrics.marginApp,
    flexDirection: 'row',
    zIndex: 10
  },
  marginVertical: {
    marginVertical: metrics.doubleBaseMargin,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderBottomWidth: 3,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },  
  title: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  titleContainer: {
    marginTop: (Platform.OS === 'ios' ?  20 : 0),
    marginLeft: metrics.marginApp + 36 + metrics.baseMargin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  share: {
    position: 'absolute',
    bottom: metrics.baseMargin,
    right: metrics.marginApp,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }

}; 
