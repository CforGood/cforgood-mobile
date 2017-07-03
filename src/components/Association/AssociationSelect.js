import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import IconImage from '../common/IconImage';
import RadioSelect from '../common/RadioSelect';
import {
  styles,
  fonts,
  metrics,
  colors,
} from '../../themes';

const WIDTH_WIDGET = (metrics.deviceWidth) / 2
  - metrics.marginApp
  - metrics.smallMargin;

export default class AssociationSelect extends Component {

  state = {
    selected: false,
  }

  static propTypes = {
    association: PropTypes.any,
  };

  static defaultProps = {
  };

  changeState() {
    this.setState({ selected: !this.state.selected });
  }
  render() {

    const {
        association
     } = this.props;

    return (
      <View>
        {
          association.id !== 0 ?
            <Image
              resizeMode={"cover"}
              style={style.image}
              source={{ uri: association.picture }}
            >
              <View style={[
                styles.row,
                {
                  flex: 1,
                  justifyContent: 'flex-end',
                }
              ]}>
                <RadioSelect
                  checked={this.state.selected}
                  onPress={() => this.changeState()}
                />
              </View>
              <View
                style={{
                  flex: 3,
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
                  <Text style={[
                    fonts.style.t16,
                    fonts.style.mediumBold,
                    style.text,
                  ]}
                  >
                    {association.addresse}
                  </Text>
                </View>
              </View>
              <View style={[
                styles.row,
                {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  flex: 1,
                  alignItems: 'center',
                  paddingHorizontal: metrics.baseMargin
                }
              ]}>
                <View style={{ flex: 3 }}>
                  <Text style={{ color: colors.white }}>
                    {association.type}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <IconImage
                    width={20}
                    image={require('../../resources/icons/two-circling-arrows.png')}
                  />
                </View>
              </View>
            </Image>
            :
            <Image
              resizeMode={"cover"}
              style={style.image}
              source={require('../../resources/white.jpg')}
            >
              <View
                style={{
                  flex: 4,
                  padding: metrics.baseMargin
                }}
              >
                <Text style={[
                  fonts.style.bold,
                  { color: colors.black }
                ]}>
                  {association.name}
                </Text>
                <Text style={{ color: colors.black }}>
                  {association.description}
                </Text>
              </View>
              <View style={[
                styles.row,
                {
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingHorizontal: metrics.baseMargin
                }
              ]}>
                <IconImage
                  width={20}
                  tintColor={colors.black}
                  image={require('../../resources/icons/two-circling-arrows.png')}
                />
              </View>
            </Image>
        }
      </View>
    );
  }
};

const style = StyleSheet.create({
  image: {
    width: WIDTH_WIDGET,
    height: 220,
    borderWidth: 1,
    borderColor: colors.gray85,
    margin: metrics.smallMargin,
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
