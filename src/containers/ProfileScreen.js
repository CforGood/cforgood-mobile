import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LinearGradient from 'react-native-linear-gradient';

import { updateUserData } from '../redux/actions/user';

import { styles, fonts, metrics, colors } from '../themes';

import Info from '../components/profile/Info';
import Tab from '../components/profile/Tab';
import Popup from '../components/profile/Popup';
import ProfileHeader from '../components/profile/ProfileHeader';

import Loading from '../components/common/Loading';
import ErrorView from '../components/common/ErrorView';
import Separator from '../components/common/Separator';
import ModalDatePicker from '../components/common/ModalDatePicker';
import Button from '../components/common/ButtonGradiant';

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
    popupUpdateSubsription: false
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (this.props.user) {
      this.setState({
        user: this.props.user,
        selectedItem: (params && params.tab) || 'profile'
      });
    } else {
      // this.props.navigation.goBack();
    }
  }

  componentWillReceiveProps({ user }) {
    if (user !== this.props.user) {
      if (user.subscription !== this.props.user.subscription) {
        this.setVisiblePopupSubscription(true);
      } else {
        this.setVisiblePopupUser(true);
      }

      setTimeout(() => {
        this.setVisiblePopupUser(false);
        this.setVisiblePopupSubscription(false);
      }, 2500);
      this.setState({
        user: this.props.user
      });
    }
    console.log('useruser', user);
  }

  setUserData = user => {
    this.setState({ user });
  };

  setPrictureSource = pictureSource => {
    this.setState({ pictureSource });
  };

  setBirthDay = date => {
    this.setUserData({
      ...this.state.user,
      birthday: date
    });
    if (Platform.OS === 'ios') {
      this.setState({ enableChangeBirthDay: false });
    }
  };

  onEnableChangeDate(date = null) {
    if (Platform.OS === 'ios') {
      this.setState({ enableChangeBirthDay: true });
    } else {
      this.setBirthDay(date);
    }
  }

  saveUserUpdating = async () => {
    const { user } = this.state;
    let uploadPictureResponse;
    if (this.state.pictureSource) {
      uploadPictureResponse = await ApiHandler.uploadPicture(
        this.state.pictureSource,
        user.picture
      );
    }

    const userData = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      zipcode: user.zipcode,
      city: user.city
    };

    if (user.birthday) {
      userData.birthday = user.birthday;
    }

    if (user.birthday) {
      userData.street = user.street;
    }

    if (user.code_partner) {
      userData.code_partner = user.code_partner;
      user.member = true;
    }

    if (uploadPictureResponse && uploadPictureResponse.secure_url) {
      // userData.picture = uploadPictureResponse.secure_url;
      userData.remote_picture_url = uploadPictureResponse.secure_url;
      this.setUserData({
        ...this.state.user,
        remote_picture_url: userData.remote_picture_url
      });
    }
    if (
      this.props.user.amount !== this.state.user.amount ||
      this.props.user.subscription != this.state.user.subscription
    ) {
      this.verifyMember();
    } else {
      await this.props.updateUserData(user.id, userData);
      this.updateEmail();
    }
  };

  verifyMember() {
    const { member } = this.props.user;
    if (member === false) {
      this.props.navigation.navigate('CreditCard', {
        from: 'profile',
        title: 'Mettre à jour CB',
        amount: this.state.user.amount,
        subscription: this.state.user.subscription
      });
    } else {
      this.setVisiblePopupSubscription(true);
    }
  }

  setVisiblePopupSubscription(popupUpdateSubsription) {
    this.setState({ popupUpdateSubsription });
  }

  setVisiblePopupUser(popupUpdate) {
    this.setState({ popupUpdate });
  }

  closePopup() {
    this.setVisiblePopupUser(false);
    this.setVisiblePopupSubscription(false);
  }

  async updateEmail() {
    if (this.props.user.email !== this.state.user.email) {
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
      <View style={[styles.screen.mainContainer]}>
        <Loading loading={!this.props.loaded} title={'Mise à jour Profil'} />
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
        <View style={style.profileheader}>
          <ProfileHeader ambassador={user.ambassador} />
        </View>
        <ScrollView>
          <View style={style.info}>
            <Info
              user={user}
              pictureSource={
                this.state.pictureSource ||
                user.picture ||
                user.remote_picture_url
              }
              setPrictureSource={pictureSource =>
                this.setPrictureSource(pictureSource)
              }
            />
          </View>

          <Tab
            selectedItem={this.state.selectedItem}
            changeSelectedItem={item => this.setState({ selectedItem: item })}
          />
          <View
            style={[
              style.profileForm,
              {
                paddingHorizontal: metrics.marginApp
              }
            ]}
          >
            {this.state.selectedItem == 'Association' && (
              <Association user={user} />
            )}
            {this.state.selectedItem == 'profile' && (
              <ProfileForm
                user={user}
                setUserData={user => this.setUserData(user)}
                onChangeDate={date => this.onEnableChangeDate(date)}
              />
            )}
            {this.state.selectedItem == 'Abonnement' && (
              <Abonnement
                user={user}
                setUserData={user => this.setUserData(user)}
              />
            )}
            {this.state.selectedItem == 'Settings' && <Settings user={user} />}
          </View>
        </ScrollView>
        {Platform.OS === 'ios' && (
          <ModalDatePicker
            visible={this.state.enableChangeBirthDay}
            onDateChange={date => this.setBirthDay(date)}
          />
        )}
        <Button
          text={' Enregistrer '}
          onPress={() => this.saveUserUpdating()}
        />
        <Popup
          onClose={() => this.closePopup()}
          visible={this.state.popupUpdateSubsription || this.state.popupUpdate}
          type={this.state.popupUpdate ? 'user' : user.subscription}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  failure: state.user.failure,
  error: state.user.error,
  loaded: state.user.loaded
});

const mapDispatchToProps = dispatch => ({
  updateUserData: bindActionCreators(updateUserData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const style = StyleSheet.create({
  profileheader: {
    height: metrics.navBarHeight,
    justifyContent: 'center'
  },
  info: {
    height: 200,
    marginTop: metrics.baseMargin
  },
  profileForm: {
    flex: 1,
    paddingVertical: metrics.baseMargin
  },
  boldCenter: {
    textAlign: 'center',
    marginVertical: metrics.baseMargin,
    fontWeight: 'bold'
  }
});
