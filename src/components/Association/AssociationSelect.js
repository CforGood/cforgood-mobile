import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import FlipCard from 'react-native-flip-card';

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
    flip: false
  };

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
      association,
      index,
    } = this.props;

    return (
      <View style={[
        style.associationContainer,
        {
          alignItems: index % 2 ? 'flex-end' : 'flex-start'
        }
      ]}
      >
        <FlipCard
          flip={this.state.flip}
          friction={6}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          clickable={false}
          style={style.card}
          alignHeight={true}
          // alignWidth={true}
          onFlipped={(isFlipped) => { console.log('isFlipped', isFlipped) }}
        >
          {/* Face Association */}
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
                padding: metrics.smallMargin,
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
                  {association.city}
                </Text>
              </View>
            </View>
            <View style={[
              styles.row,
              {
                backgroundColor: 'rgba(0,0,0,0.6)',
                flex: 1,
                alignItems: 'center',
                padding: metrics.smallMargin,
              }
            ]}>
              <View style={{ flex: 3 }}>
                <Text
                  style={[
                    fonts.style.t13,
                    {
                      color: colors.white,
                      textAlign: 'left',
                    }
                  ]}
                >
                  {association.type}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <IconImage
                  onPress={() => this.setState({ flip: true })}
                  width={20}
                  image={require('../../resources/icons/two-circling-arrows.png')}
                />
              </View>
            </View>
          </Image>

          {/* Back Association */}
          <View
            style={[style.image, {backgroundColor: 'white'}]}
          >
            <View
              style={{
                flex: 4,
                padding: metrics.baseMargin
              }}
            >
              <Text style={fonts.style.t15}>
                {association.name}
              </Text>
              <Text style={fonts.style.t13}>
                {association.description}
              </Text>
            </View>
            <View style={[
              styles.row,
              {
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }
            ]}>
              <IconImage
                onPress={() => this.setState({ flip: false })}
                width={20}
                tintColor={colors.darkGray}
                image={require('../../resources/icons/two-circling-arrows.png')}
              />
            </View>
          </View>
        </FlipCard>
      </View>
    );
  }
};

const style = StyleSheet.create({
  associationContainer: {
    width: metrics.deviceWidth / 2 - metrics.marginApp,
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
