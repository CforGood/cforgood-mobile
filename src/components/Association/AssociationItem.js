import React, { Component, } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {
  styles,
  fonts,
  metrics,
  colors,
} from '../../themes';

const WIDTH_WIDGET = (metrics.deviceWidth) / 2
  - metrics.marginApp
  - metrics.smallMargin;

import { associationType } from '../../types';

export default class AssociationItem extends Component {

  static propTypes = {
    association: associationType.isRequired,
    total_donation: PropTypes.number
  };

  static defaultProps = {
    total_donation: null
  };

  render() {
    const { association, total_donation } = this.props;
    return (
      <Image
        resizeMode={"cover"}
        style={style.image}
        source={{ uri: association.picture }}
      >
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: metrics.baseMargin
          }}
        >
          <View>
            <Text style={[
              fonts.style.t16,
              fonts.style.bold,
              style.text,
            ]}
            >
              {association.name}
            </Text>
            <View style={style.ligne} />
          </View>
          <View>
            {
              total_donation !== null &&
              <Text style={[
                fonts.style.small,
                fonts.style.bold,
                style.text,
              ]}
              >
                Dons total à cette association
            </Text>
            }
          </View>
          <View>
            {
              total_donation !== null &&
              <Text style={[
                fonts.style.t16,
                fonts.style.bold,
                style.text,
              ]}
              >
                {total_donation} $
              </Text>
            }

          </View>
          <View>
            <Text style={[
              fonts.style.t16,
              fonts.style.mediumBold,
              style.text,
            ]}
            >
              {association.city}
            </Text>
          </View>
        </View>
      </Image>
    );
  }
};

const style = StyleSheet.create({
  image: {
    flex: 1,
    width: WIDTH_WIDGET,
  },
  ligne: {
    borderBottomWidth: 4,
    borderBottomColor: colors.white,
    width: 31,
  },
  text: {
    color: colors.white,
    backgroundColor: 'transparent'
  }
});
