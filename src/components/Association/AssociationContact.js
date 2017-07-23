import React, { Component, } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';

import Detail from '../common/Detail';
import Social from '../common/Social';

import {
  styles,
  fonts,
  colors,
  metrics
} from '../../themes';

import { associationType } from '../../types';

export default class AssociationContact extends Component {

  static propTypes = {
    association: associationType.isRequired,
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
    const { association } = this.props
    return (
      <View style={{ flex: 1 }} >
        <Detail
          title={'Contact'}
          colorTitle={colors.blueAssociation}
        />
        <View style={{ paddingRight: metrics.base }}>
          <Social
            color={colors.blueAssociation}
            text={(association.street || '') + ' ' + (association.zipcode || '') + ' ' + association.city}
            icon={require('../../resources/icons/placeholder.png')}
          />



        </View>
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <Text style={[
            fonts.style.bold,
            fonts.style.t20,
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
            <TouchableOpacity
              onPress={() => this.openBrowser('https://www.facebook.com/' + association.facebook)}
              style={[
                styleAssociationContact.icon,
                {
                  backgroundColor: colors.blueAssociation,
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
            <TouchableOpacity
              onPress={() => this.openBrowser('https://www.twitter.com/' + association.twitter)}
              style={[
                styleAssociationContact.icon,
                {
                  backgroundColor: colors.blueAssociation,
                }
              ]}
            >
              <Image
                style={{
                  width: 32,
                  height: 25
                }}
                source={require('../../resources/icons/twitter.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

const styleAssociationContact = {
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
  }
};

