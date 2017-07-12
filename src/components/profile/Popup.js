import React, {
  PropTypes,
  PureComponent,
} from 'react';
import moment from 'moment';
import {
  View,
  Text,
  Image, 
  StyleSheet,
} from 'react-native';

import Modal from '../Modal'; 
import Popup from '../common/Popup';
 
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

const days  = (date) => {
  const start = moment();
  const end = moment(date);
  return end.diff(start, 'days')  
}

class PopupProfile extends PureComponent { 
  
  static propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string,
    onValidate: PropTypes.func
  };

  static defaultProps ={
    visible: false,
    type: ''
  };

  shouldComponentUpdate(nextProps){

    if(
      nextProps.visible != this.props.visible
    ){
      return true;

    }
    return false;
  }
  
  renderPopup() {
    switch (this.props.type) {
      case 'user' : 
        return (
          <Popup 
            icon={require('../../resources/profile/checked.png')}
            bigtitle={'Modifications à jour !'} 
            description= {'Vos modifications sont maintenant\nà jour sur l’application.'}
            onClose={this.props.onClose}
          /> 
        )
        break;
      case 'M' || 'Y': 
        return (
          <Popup
            icon={require('../../resources/profile/claping-hands.png')}
            bigtitle={'Bravo et merci !'} 
            description= {(<Text>Votre participation <Text>
              {
                this.props.type === 'M'
                ?
                'mensuelle'
                :
                'annuelle'
              }
              </Text> a bien été prise en compte.</Text>)}
            onClose={this.props.onClose}
          />
        )
        break;
      case 'businesses_around': 
        return (
          <Popup
            bgImage={
              <Image 
                style={{
                  width: 264,
                  height: 173,
                  opacity: 0.2,
                }}
                resizeMode={'contain'}
                source={require('../../resources/images/map.png')}
              />
            }
            icon={require('../../resources/profile/claping-hands.png')}
            bigtitle={'Hey ... :-)'}
            smalltitle={'Il n’y a pas de partenaire\nautour de vous !'}
            description= {'CforGood n’est pas encore dans\nvotre ville, mais ça peut s’arranger …'}
            textButton={'Faites-nous signe !'}
            iconButton={require('../../resources/icons/message.png')}
            onClose={this.props.onClose}
            onValidate={() => this.props.onValidate()}
          />
        )
        break;
      case 'partner':
        return (
          <Popup
            bgImage={
              <Image 
                style={{
                  width: 173,
                  height: 173,
                  opacity: 0.2,
                }}
                resizeMode={'contain'}
                source={require('../../resources/images/logo.png')}
              />
            }
            icon={require('../../resources/profile/Shape.png')}
            bigtitle={'Excellent !'} 
            description= {
              this.props.trial_attributes.user_offering_first_name + ' ' +
              this.props.trial_attributes.user_offering_last_name + 
              ' vous a offert ' +
              this.props.trial_attributes.nb_month_beneficiary +
              ' mois\nd’accès à l’application CforGood'+
             '\npour une consommation positive !'
            }
            iconButton={require('../../resources/icons/hand-like.png')}
            textButton={'A vous de jouer !'}
            onClose={this.props.onClose}
            onValidate={() => this.props.onValidate()}
            
          />
        )
        break;
      case 'not_partner': 
        return (
          <Popup  
            bgImage={
              <Image 
                style={{
                  width: 173,
                  height: 173,
                  opacity: 0.2,
                }}
                resizeMode={'contain'}
                source={require('../../resources/images/logo.png')}
              />
            }
            icon={require('../../resources/profile/Shape.png')}
            bigtitle={'Waouu génial !'} 
            description= {
              'Profitez bien des '+
              days( this.props.trial_attributes.date_end_partner) +
              ' jours OFFERTS\npar '+
              (this.props.trial_attributes.partner_name || 'Cforgood') +
              +'\n pour découvrir l’application.'
            }
            textButton={'A vous de jouer !'}
            iconButton={require('../../resources/icons/hand-like.png')}
            onClose={this.props.onClose}
            onValidate={() => this.props.onValidate()}
          />
        )
        break;
      case 'not_member': 
        return (
          <Popup  
            bgImage={
              <Image 
                style={{
                  width: 264,
                  height: 173,
                  tintColor: 'gray',
                  opacity: 0.2,
                }}
                resizeMode={'contain'}
                source={require('../../resources/images/handshake.png')}
              />
            }
            icon={require('../../resources/profile/pop_1.png')}
            bigtitle={'Ha Ha … :-)'} 
            smalltitle= {'Vous êtes bien inscrit,\nmais pas encore membre !'}
            description={'Encore quelques clics et c’est bon.'}
            textButton={'Je deviens membre'}
            iconButton={require('../../resources/icons/pencil.png')}
            onClose={this.props.onClose}
            onValidate={() => this.props.onValidate()}
          />
        )
        break;
        case 'first_perk_offer': 
          return (
            <Popup  
              bgImage={
                <Image 
                  style={{
                    width: 264,
                    height: 173,
                    tintColor: 'gray',
                    opacity: 0.2,
                  }}
                  resizeMode={'contain'}
                  source={require('../../resources/images/handshake.png')}
                />
              }
              icon={require('../../resources/profile/pop_1.png')}
              bigtitle={'C\'est parti !'} 
              smalltitle= {'Bon plan offert'}
              description={'Pour bien commencer,\nnous vous offrons un bon plan chez l\'un de nos commerçants.'}
              textButton={'J\'en profite'}
              iconButton={require('../../resources/icons/hand-like.png')}
              onClose={this.props.onClose}
              onValidate={() => this.props.onValidate()}
            />
          )
          break;
      default: 
        break;  
    }
  }

  render() {
    return ( 
      <Modal 
        animationType={'fade'}
        blurType={'dark'}
        blurAmount={1}
        visible={this.props.visible}
        onClose={this.props.onClose}
      > 
        <View style={{alignItems: 'center'}}>
          { this.renderPopup() }
        </View>
      </Modal>    
    );
  }
}

export default PopupProfile;

