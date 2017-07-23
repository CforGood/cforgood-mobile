import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Platform
} from 'react-native';

import Detail from '../common/Detail';
import Social from './Social';
import Day from './Day';
import MapView from './MapView';

import {
  styles,
  fonts,
  colors,
  metrics
} from '../../themes';

import { businessType, categoryType } from '../../types';

export default class BusinessContact extends Component {

  static propTypes = {
    business: businessType.isRequired,
    category: categoryType.isRequired,
  };

  openBrowser(url) {
    if (url !== '') {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log('Don\'t know how to open URI: ' + url);
        }
        return false
      });
    }

  }

  render() {
    const { business, category } = this.props;
    if (!business.address)
      return <View />;

    return (
      <View style={{ flex: 1 }} >
        <Detail
          title={'Détail'}
        />
        <View style={styleBusinessContact.mapContainer}>

          <MapView
            address={business.address}
            category={category}
          />
        </View>
        <View style={[
          styles.row,
          {
            flexDirection: "row",
            marginVertical: metrics.doubleBaseMargin,
          }
        ]}
        >
          <View style={{ flex: 1 }}>
            <Image
              resizeMode='contain'
              style={[
                {
                  height: 122,
                  width: 127,
                  marginBottom: metrics.baseMargin,
                  tintColor: category.color,
                }
              ]}
              source={require('../../resources/icons/map-location.png')}
            />
            <View style={{ justifyContent: 'center' }}>
              {
                business.address.street
                &&
                <Text style={styleBusinessContact.contact}>
                  {business.address.street}
                </Text>
              }
              {
                business.address.zipcode
                &&
                <Text style={styleBusinessContact.contact}>
                  {business.address.zipcode}
                  {business.address.city}
                </Text>
              }
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {
              business.address.timetables &&
              business.address.timetables.map((timetable, key) => <Day
                key={key}
                day={timetable.day}
                start_at={timetable.start_at}
                end_at={timetable.end_at}
              />
              )
            }
          </View>
        </View>
        <View>
          {
            business.telephone &&
            <Social
              color={category.color}
              text={business.telephone}
              icon={require('../../resources/icons/phone-circle.png')}
            />
          }
          {
            business.email &&
            <Social
              color={category.color}
              text={business.email}
              icon={require('../../resources/icons/email-circle.png')}
            />
          }
        </View>
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <Text style={[
            fonts.style.bold,
            fonts.style.t15,
            {
              textAlign: 'center',
              marginVertical: metrics.baseMargin,
            }
          ]}
          >
            Retrouvez-nous :
          </Text>
          <View style={[
            styles.row,
            {
              justifyContent: 'space-around'
            }
          ]}
          >
            {
              business.facebook !== '' &&
              <TouchableOpacity
                onPress={() => this.openBrowser('https://www.facebook.com/' + business.facebook)}
                style={[
                  styleBusinessContact.icon,
                  {
                    backgroundColor: category.color,
                  }
                ]}
              >
                <Image
                  resizeMode='contain'
                  style={{
                    width: 13,
                    height: 26
                  }}
                  source={require('../../resources/icons/facebook.png')}
                />
              </TouchableOpacity>
            }

            {
              business.twitter !== '' &&
              <TouchableOpacity
                onPress={() => this.openBrowser('https://www.twitter.com/' + business.twitter)}
                style={[
                  styleBusinessContact.icon,
                  {
                    backgroundColor: category.color,
                  }
                ]}
              >
                <Image
                  resizeMode='contain'
                  style={{
                    width: 32,
                    height: 25
                  }}
                  source={require('../../resources/icons/twitter.png')}
                />
              </TouchableOpacity>
            }
          </View>
        </View>

      </View>
    );
  }
};

const styleBusinessContact = {
  icon: {
    height: metrics.deviceWidth / 7.6,
    width: metrics.deviceWidth / 7.6,
    borderRadius: (metrics.deviceWidth / 7.6) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: metrics.baseMargin,
  },
  contact: [
    fonts.style.bold,
    fonts.style.normal,
  ],
  mapContainer:  {
    borderColor: '#CDCDCD',
    borderWidth: 1,
    height: metrics.deviceHeight / 5.90,
  }
};

