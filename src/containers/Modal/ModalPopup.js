import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import Popup from '../../components/Modal/Popup';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/ButtonGradiant';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class ModalPopup extends Component {

  popupBig1 = (item) => {
    return (
      <Popup
        close={item.close}
        icon={item.icon}
        title={
          <Text style={[
            fonts.style.t18,
            fonts.style.bold,
            { marginVertical: metrics.baseMargin }
          ]}
          >
            {item.title}
          </Text>
        }
        subTitle={
          <Text style={[
            fonts.style.t15,
            fonts.style.bold,
            {
              marginHorizontal: metrics.baseMargin,
              textAlign: 'center'
            }
          ]}
          >
            {item.subTitle}
          </Text>
        }
        description={item.description}
        button={
          <Button
            text={item.button}
            width={metrics.deviceWidth * 2 / 3}
            height={40}
            borderRadius={20}
            iconGradient={<Icon
              style={{
                width: 25,
                tintColor: colors.white
              }}
              source={item.iconButton}
            />}
            onPress={() => { }}
          />
        }
      />
    );
  }

  popupBig2 = (item) => {
    return (
      <Popup
        iconBottom={item.icon}
        title={
          <Text style={[
            fonts.style.t18,
            fonts.style.bold,
            { marginVertical: metrics.baseMargin }
          ]}
          >
            {item.title}
          </Text>
        }
        subTitle={
          <Text style={[
            fonts.style.t15,
            { marginHorizontal: metrics.baseMargin }
          ]}
          >
            {item.subTitle}
          </Text>
        }
        subTextIcon={
          <Text style={[
            fonts.style.t15,
            fonts.style.bold,
            { marginHorizontal: metrics.baseMargin }
          ]}
          >
            {item.subTextIcon}
          </Text>
        }

        button={
          item.button !== '' ?
            <Button
              text={item.button}
              width={metrics.deviceWidth * 2 / 3}
              height={40}
              borderRadius={20}
              onPress={item.firstOnPress}
            />
            :
            null
        }

        subButton={<Button
          type={'simple'}
          text={item.buttonSimple}
          styleText={{ color: colors.gray, fontWeight: '100' }}
          height={40}
          onPress={item.secondOnPress}
        />}
      />
    );
  }

  popupSmall = (item) => {
    return (
      <Popup
        typeSmall={true}
        close={false}
        title={
          <View style={[
            styles.row,
            styles.center,
            { marginVertical: metrics.baseMargin }
          ]}>
            <Text style={[
              fonts.style.t18,
            ]}
            >
              {item.text1}
            </Text>
            <Text style={[
              fonts.style.t18,
              fonts.style.bold,
              { marginHorizontal: metrics.baseMargin }
            ]}
            >
              {item.text2}
            </Text>
            <Text style={[
              fonts.style.t18,
            ]}
            >
              {item.text3}
            </Text>
          </View>
        }
        subTitle={
          <Text style={[
            fonts.style.t18,
            { marginHorizontal: metrics.baseMargin }
          ]}
          >
            {item.text4}
          </Text>
        }
        ignoreButton={
          <Button
            type={'simple'}
            text={item.firstButton}
            styleText={{ color: colors.green }}
            height={40}
            onPress={item.ignore}
          />
        }
        AcceptButton={
          <Button
            type={'simple'}
            text={item.secondButton}
            styleText={{ color: colors.green }}
            height={40}
            onPress={item.accept}
          />
        }
      />
    );
  }

  render() {

    return (
      <View style={{ flex: 1 }}>

        {

          this.popupBig1({
            close: true,
            title: "Plus que 7 jours !",
            subTitle: "Vous n'êtes bientôt plus membre !",
            description: "Invitez des amis dès maintenant, pour prolonger votre période grauite.",
            button: 'Invitez des amis',
            firstOnPress: () => { },
            icon: require('../../resources/icons/flay.png'),
            iconButton: require('../../resources/icons/flay.png'),
          })

          /* this.popupBig1({
             title:"Hey ... :-)",
             subTitle: "Il n'y a pas de commerce référencé autour de vous !",
             description: "CforGood n'est pas encore dans votre ville, mais ça peut s'arranger ...",
             button: '',
             firstOnPress: ()=>{},
             icon: require('../../resources/icons/flay.png'),
             iconButton: require('../../resources/icons/checked.png'),
         })
         */
          /*
            this.popupBig1({
              title:"Hey ... :-)",
              subTitle: "Il n'y a pas de commerce référencé autour de vous !",
              description: "CforGood n'est pas encore dans votre ville, mais ça peut s'arranger ...",
              button: 'Faites nous venir',
              firstOnPress: ()=>{},
              icon: require('../../resources/icons/flay.png'),
              iconButton: require('../../resources/icons/message.png'),
          })
          */
          /*
          this.popupBig1({
            title: "Envoyer du love !",
            subTitle: "Plus que 2 invitations à envoyer !",
            description: "Offrez à vos amis 1 mois graduits sur CforGood et bénéficiez en retour de 3 mois offerts !",
            button: 'Invitez des amis',
            firstOnPress: ()=>{},
            icon: require('../../resources/icons/flay.png'),
            iconButton: require('../../resources/icons/flay.png'),
          })
          */
          /*
          this.popupBig1({
            title: "Hey ... :-)",
            subTitle: "Il n'y a pas de commerce référencé autour de vous !",
            description: "CforGood n'est pas encore dans votre ville, mais ça peut s'arranger ...",
            button: 'Génial, on arrive !',
            firstOnPress: ()=>{},
            icon: require('../../resources/icons/flay.png'),
            iconButton: require('../../resources/icons/flay.png'),
          })
          */
          /*
          this.popupBig1({
            title: "Héhé !",
            subTitle: "Pas de commerce sur carte ?",
            description: "Vous devez activer la localisation pour découvrir les commerces autour de vous :-)",
            button: 'Activer la localisation',
            firstOnPress: ()=>{},
            icon: require('../../resources/icons/flay.png'),
            iconButton: require('../../resources/icons/flay.png'),
          })
          */
          /*
          this.popupBig2({
            icon: require('../../resources/icons/maplocation.png'),
            title: "Héhé !",
            subTitle: "Nous devons vous localiser pour vous permettre de trouver les meilleurs commerces autour de vous :-)", 
            button: 'Me localiser',
            firstOnPress: ()=>{},
            buttonSimple: 'passer',
            secondOnPress: ()=>{},
          })
          */
          /*
          this.popupBig2({
            icon: require('../../resources/icons/flay.png'),
            title: "Pas d'inquétude !",
            subTitle: "Nous avons besion de votre autorisation pour envoyer les invitations à vos amis :-)", 
            button: 'Autoriser',
            firstOnPress: ()=>{},
            buttonSimple: 'passer',
            secondOnPress: ()=>{},
          })
          */
          /*
          this.popupBig2({
            icon: require('../../resources/icons/start.png'),
            title: "Félicitations Marie-Christine :-)",
            subTitle: "Vous êtes au top !",
            subTextIcon: "3 mois offerts!",
            button: '',
            firstOnPress: ()=>{},
            buttonSimple: '',
            secondOnPress: ()=>{},
          })
          */
          /*
          this.popupBig2({
            icon: require('../../resources/icons/flay.png'),
            title: "Oh vraiment ? :-(",
            subTitle: "Ne vous privez pas de faire plaisir et d'envoyer des bonnes nouvelles !", 
            button: 'Autoriser',
            firstOnPress: ()=>{},
            buttonSimple: 'passer',
            secondOnPress: ()=>{},
          })
          */
          /*
          this.popupSmall({ 
            text1: "Autoriser",
            text2: "CforGood", 
            text3: "à", 
            text4: "envoyer et conculter des sms ?", 
            firstButton: 'Autoriser', 
            firstOnPress: ()=>{},
            secondButton: 'Accepter' 
            secondOnPress: ()=>{}, 
          })
          */
          /*
           this.popupSmall({ 
             text1: "Autoriser",
             text2: "CforGood", 
             text3: "à", 
             text4: "accéder à vos contacts ?", 
             firstButton: 'Déliner', 
             firstOnPress: ()=>{},
             secondButton: 'Accepter',
             secondOnPress: ()=>{}, 
           })
           */
          /*
          this.popupSmall({
            text1: "Autoriser",
            text2: "CforGood",
            text3: "à accéder",
            text4: "à la position de cet appareil ?",
            firstButton: 'Déliner',
            firstOnPress: () => { },
            secondButton: 'Accepter',
            secondOnPress: () => { },
          })
          */
        }

      </View>
    );
  }
}

export default ModalPopup;

const style = {

}; 
