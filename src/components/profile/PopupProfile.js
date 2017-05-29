
// @flow
import React, { 
  Component,
} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';


import ApiHandler from '../../utils/api';
import Popup from './Popup';
import {
  getCategory,
} from '../../constants/categories';

import { updateUserData } from '../../redux/actions/user';
import { newOffer } from '../../redux/actions/offer';


const codes = ['GIFT3MONTH', 'GIFT6MONTH', 'GIFT12MONTH'];

class PopupProfileMap extends Component {
  
  state = {
    visible: false,
    type: '',
    checked: false,
  };
  
  shouldComponentUpdate(nextProps , nextState){

    if(
      !this.state.checked
      ||
      this.state.visible === true && nextState.visible === false
      ||
      nextProps.loadedBusinesses !== this.props.loadedBusinesses
      ||
      nextProps.nearme !== this.props.nearme
    ){
      return true;
    }
    return false;
  }


  componentDidMount() {
    
    setTimeout(() => { this.checkPopupProfile(
      this.props.user, 
      this.props.businesses,
      this.props.loadedBusinesses,
      true
      ); 
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
  	setTimeout(() => { this.checkPopupProfile(
        nextProps.user,
        nextProps.businesses,
        nextProps.loadedBusinesses,
        nextProps.nearme,
      ); 
    }, 100);
   
  }

  onValidate = async (type) => {

    if(type==='partner' || type==='not_partner'){
      //this.props.updateUserData(this.props.user.id, {trial_done: false});
    }
    else if(type === 'businesses_around'){
      this.props.navigation.navigate(
        'WebView',
        { 
          url: 'https://cforgood1.typeform.com/to/u4rcVG',
          title: 'Faites-nous signe !'
        }
      )
    }
    else if(type === 'not_member'){
      this.props.navigation.navigate('Profile', {'tab': 'Abonnement'})
    }

    else if(type === 'first_perk_offer' && this.props.businesses){


      let business  = null;
      let perk = null;
      const { business_id, address_id, perk_id } = this.props.user.first_perk_offer_attributes;


      ApiHandler.businessDetail(business_id, address_id)
      .then(response => {
        if(!response.error){

          const category = getCategory(response.business_category_id);

          perk = response.perks.find(perk => perk.id === perk_id);
          //alert(JSON.stringify(response));
          this.props.newOffer(perk, response, category);
        }
      });
      
    }
    

    this.closePopup();
  }


  checkPopupProfile(user, businesses, loadedBusinesses, nearme){

    const businesses_around = businesses ? businesses.length : 0;

    if(user && !this.state.visible && loadedBusinesses) {
      let visible = false;
      let type = '';


      if(businesses_around === 0 || !nearme) {
        visible = true;
        type = 'businesses_around';
      }
      else if( user.trial_done ) {
        visible = true;
        if(codes.includes(user.code_partner)) {
          type= 'partner';
        }
        else{
          type= 'not_partner';
        }
      }
      else if( user.first_perk_offer_attributes ) {
        visible = true;
        type= 'first_perk_offer';
      }
      else if( !user.member ) {
        visible = true;
        type= 'not_member';
      }
      
      this.setState({
        checked: visible === true,
        visible,
        type,
      });
    }

  }
  
  closePopup(){
  	this.setState({
  	  visible: false
  	});
  }

  render () {
    const { type, visible, perk } = this.state;
    return (
      this.props.user &&
      <Popup
        onClose={() => this.closePopup()}
        visible={visible}
        type={type}
        onValidate={() => this.onValidate(type)}
        trial_attributes={
          type === 'not_partner' 
            ?
            this.props.user.trial_attributes
            : 
            this.props.user.gift_attributes
          }
      />
    )
  }
};

const mapStateToProps = state => ({
  user: state.user.data,
  loadedBusinesses: state.business.loaded,
  businesses: state.business.entities,
  nearme: state.popup.nearme
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: bindActionCreators(updateUserData, dispatch),
  newOffer: bindActionCreators(newOffer, dispatch),
});


export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(PopupProfileMap));
