import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Platform,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import ApiHandler from '../utils/api';

import Heart from '../components/common/Heart';
import Close from '../components/common/Icon';
import Share from '../components/common/Share';
import Detail from '../components/common/Detail';

import Separator from '../components/common/Separator';
import Video from '../components/common/Video';

import AssociationContact from '../components/Association/AssociationContact';
import AssociationLeader from '../components/Association/AssociationLeader';
import Button from '../components/common/ButtonGradient';

import PopupValidation from '../components/Association/PopupValidation';
import PopupThanks from '../components/Association/PopupThanks';


import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

import {
  detailsAssociation,
} from '../dummyData';

const HEADER_MAX_HEIGHT = 221;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 70 : 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class AssociationDetailScreen extends Component { 
  state = {
    scrollY: new Animated.Value(0),
    validationPopup: false,
    thanksPopup: false,
    association: null,
    loaded: false,
    video: null,
    use: false
  };

  async componentWillMount() {

    const { association, associationId } = this.props.navigation.state.params;
    if (association){

      this.setState({ association });
      this.getDetail(association.id);
    }
    else if( associationId ) {
      await this.getDetail(associationId);
    }
  }

  getDetail (associationId) {

    ApiHandler.associationDetail(associationId)
    .then(response => {
      if(!response.error){
        this.setState({ 
          association: response,
          loaded: true,
          video: response.link_video
        });
      }
    }).
    catch(message => {
      console.log('ErrorLog' , message)
      //this.props.navigation.goBack();
    });
    

  }

  setValidationPopup(flag){
    if(flag === true){
      if(!this.state.association.user_cause)
        this.setState({validationPopup: flag});
    }
    else{
      this.setState({validationPopup: flag});
    }
    
  }
  
  onValidate(){
    
    ApiHandler.supportAssociation(this.state.association.id)
    .then(response => {
      if(!response.error){
        this.setThanksPopup(true);
      }
    }).
    catch(message => {
      alert(message.error);
    });
    
  }

  setThanksPopup(flag){
    this.setValidationPopup(false);
    this.setState({thanksPopup: flag});

    if(flag === true){
      this.setState({use: true})
      setTimeout(() => {  this.setThanksPopup(false); }, 2500);
    }
  }

  use() {
    return this.state.association.user_cause ||
    this.state.use;

  }
  
  render() {

    const detailsAssociation = this.state.association;

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

   if(!detailsAssociation)
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
                height: HEADER_MAX_HEIGHT
            }}
          />
          <View style={style.container} >
            
            <Text 
              style={[
                fonts.style.title,
                fonts.style.t26
              ]}
            >
              {detailsAssociation.name || ''}
            </Text>


            <Text style={[
                fonts.style.normal,
                fonts.style.normal, 
                {marginVertical: metrics.baseMargin}
              ]}
            >
              Protection et mise en valeur du littoral et des océans. 
            </Text>

            <Separator 
              style={style.marginVertical}
              margin={0}
              color={'#979797'}
            />
  
           <View>
              <Detail 
                title={'En quelques mots'} 
                colorTitle={colors.blueAssociation}
                description={detailsAssociation.description} 
              />
              {
                (
                  this.state.video !== null &&
                  this.state.video !== '' &&
                  this.state.video !== 'undefined'
                )
                &&
                <Video link={this.state.video} />
              }
              
            </View>


            <Separator 
              style={style.marginVertical}
              margin={0}
              color={'#979797'}
            />
            {
              this.state.loaded &&
              <AssociationContact 
                association={detailsAssociation} 
              />
            }
           

            <Separator 
              style={style.marginVertical}
              margin={0}
              color={'#979797'}
            />
            

            {
              this.state.loaded &&
              <AssociationLeader 
                association={detailsAssociation}
              />
            }
            
          </View>  
        </Animated.ScrollView>

        <Animated.View style={[style.header, {height: headerHeight}]}>
          <View
            style={[
              styles.row,
              { 
                paddingHorizontal: metrics.marginApp,
                justifyContent: 'space-between'
              }
            ]}
          > 
            <Animated.View
              style={[
                style.titleContainer,
                {
                  opacity: titleOpacity,
                }
              ]}
            >
              <Text 
                style={fonts.style.title}
              >
                {detailsAssociation.name}
              </Text>
            </Animated.View>
          </View>
          <Animated.Image
            style={[
              style.backgroundImage,
              {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
            ]}
            source={{uri: detailsAssociation.picture}}
          >
            <Image
              resizeMode={'contain'}
              style={{
                height: 200,
              }}
              source={{uri: detailsAssociation.logo}}
            />
            <Share
              url={`/asso/causes/${detailsAssociation.id}`}
              title={detailsAssociation.name}
              message={detailsAssociation.description}
              style={style.share} 
            />
          </Animated.Image>
          <TouchableOpacity 
              onPress={() => this.props.navigation.goBack()}
              style={style.backContainer}
            >
              <Animated.Image
                resizeMode={'contain'}
                style={[
                  style.back,
                  {tintColor: colorOpacity}
                ]}
                source={require('../resources/icons/close-circular-button-of-a-cross-white.png')}
              />
            </TouchableOpacity>
        </Animated.View>
        <Button
          type={'simple'}
          onPress={() => this.setValidationPopup(true)}
          style={{
            backgroundColor: colors.blueAssociation,
          }}
          text={!this.use() ? 'Soutenir cette association' : 'Vous soutenez cette association'}
          icon={<Heart liked={this.use()} />}
        />

        <PopupThanks 
          onClose={() => this.setThanksPopup(false)}
          visible={this.state.thanksPopup}
          association={detailsAssociation}
        />
        
        <PopupValidation
          association={detailsAssociation}
          visible={this.state.validationPopup}
          onValidate={() => this.onValidate(true)}
          onClose={() => this.setValidationPopup(false)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default  connect(mapStateToProps)(AssociationDetailScreen);


const style = {

  container:{
    margin: metrics.marginApp,
  },
  backContainer: {
    position: 'absolute',
    top:  (Platform.OS === 'ios' ? 27 : 7),
    right: metrics.marginApp,
    flexDirection: 'row',
    zIndex: 10
  },
  back:{
    resizeMode: 'contain',
    height: 36,
    width: 36,
    transform:[{rotate: '-90deg'}],
    tintColor: colors.white,
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
    borderBottomColor: colors.blueAssociation,
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
    paddingHorizontal: metrics.marginApp,
  },  
  title: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  titleContainer: {
    marginTop: (Platform.OS === 'ios' ?  20 : 0),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  share:{
    position: 'absolute',
    bottom: metrics.baseMargin,
    right: metrics.marginApp,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
}; 
