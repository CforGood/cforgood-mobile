
// @flow
import React, { 
  Component,
} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';

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
    ){
      return true;
    }
    return false;
  }


  componentDidMount() {
  	
  	setTimeout(() => { this.checkPopupProfile(this.props.user, this.props.businesses); }, 4500);
  }

  componentWillReceiveProps(nextProps) {
  	setTimeout(() => { this.checkPopupProfile(nextProps.user, nextProps.businesses); }, 4500);
   
  }

  onValidate = (type) => {
    if(type==='partner' || type==='not_partner'){
      this.props.updateUserData(this.props.user.id, {trial_done: false});
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

    else if(type === 'first_perk_offer'){
      const business  = null;
      const perk = null;
      
      for(const businessSearch of this.props.businesses) {
        
        perk  = businessSearch.perks.find(perk => perk.id === this.props.user.first_perk_offer);
        if(perk != null){
          business = businessSearch;

          break;
        };

      };
    
      if(perk != null) {
        const category = getCategory(business.business_category_id);
        this.props.newOffer(perk, business, category);
      }
      
    }
    

    this.closePopup();
  }


  checkPopupProfile(user, businesses){

    const businesses_around = businesses ? businesses.length : 0;
    
  	if(user && !this.state.visible) {
      let visible = false;
      let type = '';
      
      if( user.first_perk_offer ) {
        visible = true;
        type= 'first_perk_offer';
      }
      else if( user.trial_done) {
        visible = true;
        if(codes.includes(user.code_partner)) {
          type= 'partner';
        }
        else{
          type= 'not_partner';
        }
      } else if( businesses_around === 0) {
        visible = true;
        type = 'businesses_around';
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
      <Popup
        onClose={() => this.closePopup()}
        visible={visible}
        type={type}
        onValidate={() => this.onValidate(type)}
      />
    )
  }
};

const mapStateToProps = state => ({
  user: state.user.data,
  businesses: state.business.businesses,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: bindActionCreators(updateUserData, dispatch),
  newOffer: bindActionCreators(newOffer, dispatch),
});


export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(PopupProfileMap));
