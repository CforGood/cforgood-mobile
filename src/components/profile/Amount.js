import React, { PureComponent,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import {
  styles,
  fonts,
  metrics,
  colors,
} from '../../themes';

import Slider from '../../components/common/Slider';
import Separator from '../../components/common/Separator';
import Box from '../../components/common/Box';
import Switch from '../../components/common/Switch';
import Item from './Item';

const monthlyMinAmount = 1;
const monthlyMaxAmount = 50;
const yearlyMinAmount = 30;
const yearlyMaxAmount = 500;
const minLeft = 1;
const maxLeft = (metrics.deviceWidth - metrics.marginApp * 2 - 25);
const realAmountPercent = 0.34;

export default class Amount extends PureComponent {

  state = {
    amount: yearlyMinAmount,
    minAmount: yearlyMinAmount,
    maxAmount: yearlyMaxAmount,
    left: minLeft,
    subscription: 'Y',
    amount: 5,
  };

  componentWillMount() {
    let { amount, subscription } = this.props.user;

    amount = amount || 5;
    subscription = subscription || 'M';
    if (subscription === 'Y') {
      minAmount = yearlyMinAmount;
      maxAmount = yearlyMaxAmount;
    } else {
      minAmount = monthlyMinAmount;
      maxAmount = monthlyMaxAmount;
    }

    const ratio = (minAmount + maxAmount) / amount;
    const left = (minLeft + maxLeft) / ratio;


    this.setState({
      subscription,
      amount,
      minAmount,
      maxAmount,
      left
    });

    if (amount === null) {
      this.props.setUserData({
        ...this.props.user, subscription: 'M', amount: 5,
      });
    }

  }


  setSubscription(checked) {
    let { subscription } = this.state;

    let minAmount;
    let maxAmount;
    if (checked === true) {
      subscription = 'Y';
      minAmount = yearlyMinAmount;
      maxAmount = yearlyMaxAmount;
    } else {
      subscription = 'M';
      minAmount = monthlyMinAmount;
      maxAmount = monthlyMaxAmount;
    }

    this.setState({ subscription }, () => {
      this.setMinMaxAmount(minAmount, maxAmount);
    });

  }

  setAmount = (left, update = false) => {

    const ratio = (minLeft + maxLeft) / left;

    let amount = (this.state.minAmount + this.state.maxAmount) / ratio;

    if (amount < this.state.minAmount) {
      amount = this.state.minAmount;
    } else {
      if (amount > this.state.maxAmount) {
        amount = this.state.maxAmount;
      }
    }

    this.setState({ amount: parseInt(amount), left }, () => {
      if (update) {
        const { subscription } = this.state;
        const { user } = this.props;
        this.props.setUserData({
          ...user, subscription, amount
        });
      }
    });
  };

  updatePosition = () => {
    const { amount, subscription } = this.state;
    const { user } = this.props;

    this.props.setUserData({
      ...user, amount, subscription
    });
  }

  setMinMaxAmount = (minAmount, maxAmount) => {
    this.setState({ minAmount, maxAmount }, () => {
      this.setAmount(this.state.left, true);
    });
  };

  getPercentAsso() {

    if (this.state.subscription == 'Y') {
      if (this.state.amount <= 50)
        return (((50 - 30) * ((this.state.amount - 30) / (50 - 30))) + 30);
      if (this.state.amount <= 100)
        return (((70 - 50) * ((this.state.amount - 50) / (100 - 50))) + 50);
      if (this.state.amount <= 150)
        return (((75 - 70) * ((this.state.amount - 100) / (150 - 100))) + 70);
      if (this.state.amount <= 200)
        return (((77.5 - 75) * ((this.state.amount - 150) / (200 - 150))) + 75);
      if (this.state.amount <= 250)
        return (((80 - 77.5) * ((this.state.amount - 200) / (250 - 200))) + 77.5);
      return (((85 - 80) * ((this.state.amount - 250) / (500 - 250))) + 80);
    } else {

      if (this.state.amount <= 5) {
        return (((50 - 30) * ((this.state.amount - 1) / (5 - 1))) + 30);
      }
      if (this.state.amount <= 10)
        return (((70 - 50) * ((this.state.amount - 5) / (10 - 5))) + 50);
      if (this.state.amount <= 15)
        return (((75 - 70) * ((this.state.amount - 10) / (15 - 10))) + 70);
      if (this.state.amount <= 20)
        return (((77.5 - 75) * ((this.state.amount - 15) / (20 - 15))) + 75);
      if (this.state.amount <= 25)
        return (((80 - 77.5) * ((this.state.amount - 20) / (25 - 20))) + 77.5);
      if (this.state.amount <= 50)
        return ((((85 - 80) * ((this.state.amount - 25) / (50 - 25))) + 80));
    }
    return 0;
  }

  getAmountAfter() {

    const amountAssoc = this.state.amount * (this.getPercentAsso() / 100);
    const amountCforGood = this.state.amount - amountAssoc;
    const amountAfter = (amountAssoc * realAmountPercent) + amountCforGood;

    return amountAfter;

  }

  getFlooredFixed(v, d) {
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }

  render() {
    const { subscription } = this.state;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ height: 80 }}>
          {
            subscription !== 'X' &&
            <View style={[
              styles.row,
              {
                justifyContent: 'space-around',
                alignItems: 'center',
                marginHorizontal: metrics.baseMargin
              }
            ]}
            >
              <Text style={[
                fonts.style.t17,
                subscription === 'M' ?
                  fonts.style.bold
                  :
                  style.disable
              ]} >
                Mensuel
              </Text>
              <Switch
                checked={subscription === 'Y'}
                onChange={(checked) => this.setSubscription(checked)}
              />
              <Text
                style={[
                  fonts.style.t17,
                  subscription === 'Y' ?
                    fonts.style.bold
                    :
                    style.disable
                ]}
              >
                Annuel
            </Text>
            </View>
          }
          {
            subscription === 'Y' &&
            <View style={[styles.row, styles.center]}>
              <Text
                style={[
                  fonts.style.t16,
                  fonts.style.bold,
                  style.offert,
                ]}
              >
                2 mois
                </Text>
              <Text
                style={[
                  fonts.style.t16,
                  style.offert,
                ]}
              >
                d'utilisation offerts !
                </Text>
            </View>
          }
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={[
            fonts.style.t16,
            fonts.style.mediumBold,
            {
              paddingRight: metrics.baseMargin,
              textAlign: 'center'
            }
          ]}
          >
            Ma participation
          </Text>
          <Box
            text={String(Math.floor(this.state.amount)) + ' €'}
          />
        </View>
        <View style={[styles.row, styles.center]}>
          <Text
            style={{
              ...fonts.style.t13,
              color: colors.textinput
            }}
          >
            Nos membres donnent en moyenne 7 €
          </Text>
        </View>
        {
          subscription !== 'X' &&
          <View style={style.slideContainer}>
            <Slider
              setPosition={(left) => this.setAmount(left)}
              updatePosition={this.updatePosition}
              left={this.state.left}
            />
          </View>
        }
        <View style={[
          styles.row,
          styles.spaceBetween,
          { marginBottom: metrics.doubleBaseMargin }
        ]}
        >
          <Item
            number={(this.getPercentAsso()).toFixed(2) + ' %'}
            text={'Reversé à l\'association de votre choix.'}
          />
          <Separator
            type={'v'}
            style={{ marginHorizontal: metrics.baseMargin }}
          />
          <Item
            number={String(this.getAmountAfter().toFixed(2)) + ' €'}
            text={'Coût réel de votre participation après déduction fiscale.'}
          />
        </View>
      </View>
    );
  }
};

const style = StyleSheet.create({
  slideContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  disable: {
    color: colors.textinput,
    textAlign: 'center',
  },
  offert: {
    color: colors.green,
    textAlign: 'center',
    paddingRight: 8,
  },
});

