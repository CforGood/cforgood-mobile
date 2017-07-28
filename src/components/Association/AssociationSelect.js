import React, { Component,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import FlipCard from 'react-native-flip-card';

import Icon from '../common/Icon';
import RadioSelect from '../common/RadioSelect';
import {
  styles,
  fonts,
  metrics,
  colors,
} from '../../themes';

const WIDTH_WIDGET = (metrics.deviceWidth) / 2
  - metrics.baseMargin*2;

export default class AssociationSelect extends Component {

  static propTypes = {
    association: PropTypes.object,
    selected: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selected: null,
  };

  render() {

    const {
      association,
      index,
    } = this.props;

    return (
      <View style={[
        style.associationContainer,
        {
          alignItems: index % 2 ? 'flex-end' : 'flex-end'
        }
      ]}
      >
        <Image
          resizeMode={"cover"}
          style={style.image}
          source={{ uri: association.picture }}
        >
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)'
          }}>
            <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: metrics.smallMargin,
                paddingTop: metrics.smallMargin,
              }}
            >
              <RadioSelect
                checked={this.props.selected === association.id}
                onPress={this.props.onSelect}
              />
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'space-between',
                padding: metrics.baseMargin
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <Text style={[
                  fonts.style.t16,
                  fonts.style.bold,
                  style.text,
                ]}
                  numberOfLines={2}
                >
                  {association.name}
                </Text>
                <View style={style.ligne} />
              </View>
              <Text style={[
                fonts.style.t13,
                fonts.style.mediumBold,
                style.text,
              ]}
                numberOfLines={4}
              >
                {association.impact}
              </Text>
              <View
                style={{
                  alignItems: 'center',
                }}
              >
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
          </View>
        </Image>
      </View>
    );
  }
};

const style = StyleSheet.create({
  associationContainer: {
    width: metrics.deviceWidth / 2 - metrics.baseMargin,
    height: 214,
    marginVertical: metrics.smallMargin,
    backgroundColor: 'transparent',
  },
  image: {
    width: WIDTH_WIDGET,
    height: 214,
  },
  ligne: {
    borderBottomWidth: 4,
    borderBottomColor: colors.white,
    width: 31,
  },
  text: {
    color: colors.white,
    backgroundColor: 'transparent'
  },
  card: {
    //margin: 5,
    borderWidth: 1,
    borderColor: colors.gray85,
  },
});
