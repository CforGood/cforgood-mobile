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
        }

      </View>
    );
  }
}

export default ModalPopup;

const style = {

}; 
