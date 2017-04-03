import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LinearGradient from 'react-native-linear-gradient';

import { updateUserData } from '../redux/actions/user';

import {
  styles,
  fonts,
  metrics,
  colors,
} from '../themes';

import Info from '../components/profile/Info';
import Tab from '../components/profile/Tab';
import Popup from '../components/profile/Popup';

import ProfileHeader from '../components/profile/ProfileHeader';

import Separator from '../components/common/Separator';
import ModalDatePicker from '../components/common/ModalDatePicker';
import Button from '../components/common/ButtonGradient'; 

//Profile
import ProfileForm from '../components/profile/ProfileForm';
import Abonnement from '../components/profile/Abonnement';
//Association
import Association from '../components/profile/Association';

//Settings
import Settings from '../components/profile/Settings';

//API
import ApiHandler from '../utils/api';

class ProfileScreen extends Component {

  state = {
    selectedItem: 'profile',
    user: {},
    pictureSource: null,
    enableChangeBirthDay: false,
    popupUpdate: false,
    popupUpdateSubsription: false,
  };

  componentWillMount(){
    const { params } = this.props.navigation.state;
    this.setState({
      user: this.props.user,
      selectedItem: params && params.tab || 'profile'
    });

  }

  setUserData = (user) => {
    console.log('subscription', user.subscription, user.amount)
    this.setState({ user }, () => {
      //console.log(this.state.user);
    });
  };

  setPrictureSource = (pictureSource) => {
    this.setState({ pictureSource });
  };

  setBirthDay = (date) => {

    this.setUserData({
      ...this.state.user, birthday: date
    })
    if(Platform.OS === 'ios'){
      this.setState({enableChangeBirthDay: false});
    }
  }

  onEnableChangeDate(date = null){

    if(Platform.OS === 'ios'){
      this.setState({enableChangeBirthDay: true});
    }
    else{
      this.setBirthDay(date);
    }
    
  }

  saveUserUpdating = async () => {
    
    const { user } = this.state;
    let uploadPictureResponse;
    if (this.state.pictureSource) {
      uploadPictureResponse = await ApiHandler.uploadPicture(
        this.state.pictureSource, user.picture
      );
    }

    const userData = {
      "email": user.email,
      "first_name": user.first_name,
      "last_name": user.last_name,
      "birthday": user.birthday,
      "subscription": user.subscription,
      "amount": user.amount,
      "street": user.street,
      "zipcode": user.zipcode,
      "city": user.city,
    };

    if (uploadPictureResponse && uploadPictureResponse.secure_url) {

      userData.picture = uploadPictureResponse.secure_url;

      this.setUserData({
        ...this.state.user, picture: userData.picture
      })
    }
    
    const subscription = this.props.user.subscription;

    await this.props.updateUserData(user.id, userData);


    if( user.subscription !== subscription ) {
      this.setVisiblePopupSubscription(true);
    }
    else{
      this.setVisiblePopupUser(true);
    }

    this.updateEmail();

  }

  setVisiblePopupSubscription(popupUpdateSubsription) {
    this.setState({ popupUpdateSubsription })
  }

  setVisiblePopupUser(popupUpdate) {
    this.setState({ popupUpdate })
  }
  
  closePopup(){
    this.setVisiblePopupUser(false);
    this.setVisiblePopupSubscription(false);
  }

  async updateEmail() {
    if(this.props.user.email !== this.state.user.email){
      await AsyncStorage.getItem('@CfoorGoodStore:auth', (err, result) => { 
        user = JSON.parse(result);
        user.email = this.state.user.email;
        AsyncStorage.setItem('@CfoorGoodStore:auth', JSON.stringify(user));
      });
    }
    
  }
  

  render() {
    const { user } = this.state;
    return (
      <View style={[
          styles.screen.mainContainer,
        ]} 
      > 
        <View style={style.profileheader}>
          <ProfileHeader ambassador={user.ambassador} />
        </View>
        <ScrollView>

          <View style={style.info}>  
            <Info 
              user={user} 
              pictureSource={this.state.pictureSource || user.picture}
              setPrictureSource={(pictureSource) => this.setPrictureSource(pictureSource)}
            />
          </View>
          
          <Tab 
            selectedItem={this.state.selectedItem} 
            changeSelectedItem={(item) => this.setState({selectedItem: item})}

           /> 
          <View style={[
              style.profileForm,
              {
                paddingHorizontal: metrics.marginApp
              }
            ]}
          >
            {
              this.state.selectedItem == 'Association' && 
               <Association user={user} />
            }
            {
              this.state.selectedItem == 'profile' && 
              <ProfileForm 
                user={user} 
                setUserData={(user) => this.setUserData(user)}
                onChangeDate={(date) => this.onEnableChangeDate(date)}
              />
            }
            {
              this.state.selectedItem == 'Abonnement' && 
              <Abonnement
                user={user}
                setUserData={(user) => this.setUserData(user)}
              />
            }
            {
              this.state.selectedItem == 'Settings' && 
              <Settings user={user}/>
            }
          </View>
        </ScrollView>

        {
          Platform.OS === 'ios' &&
          <ModalDatePicker
            visible={this.state.enableChangeBirthDay}
            onDateChange={(date) => this.setBirthDay(date)} 
          />
        }
        
        <Button 
          text={' Enregistrer '}
          onPress={() => this.saveUserUpdating()}
        />

        <Popup
          onClose={() => this.closePopup()}
          visible={
            this.state.popupUpdateSubsription ||
            this.state.popupUpdate
          }
          type={
            this.state.popupUpdate 
            ? 
            'user'
            :
            (
              user.subscription === 'M'
              ?
              'mensuelle'
              :
              'annuelle'
            )
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: bindActionCreators(updateUserData, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const style = StyleSheet.create({
  profileheader: {
    //height: 85,
    //paddingTop: Platform.OS === 'ios' ? 20: 0,
    height: metrics.navBarHeight,
    justifyContent: 'center',
    //position: 'absolute'
  },
  info:{
    height: 200,
    marginTop: metrics.baseMargin
  },
  profileForm:{
    flex: 1, 
    paddingVertical: metrics.baseMargin
  },
  boldCenter: {
    textAlign: 'center',
    marginVertical: metrics.baseMargin,
    fontWeight: 'bold',
  },
});