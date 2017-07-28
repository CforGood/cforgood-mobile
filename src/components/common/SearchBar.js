import PropTypes from 'prop-types'; import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TextInput,
  Image,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

import Icon from './Icon';

class SearchBar extends PureComponent {

  static propTypes = {
    filter: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    textSearch: PropTypes.string,
  };

  static defaultProps = {
    filter: () => { },
  };

  state = {
    textSearch: this.props.textSearch
  };

  filter = (textSearch) => {
    this.setState({ textSearch });
    this.props.filter(textSearch);
  }

  render() {
    return (
      <View style={[
        styleSearch.container,
        styles.spaceBetween,
      ]}
      >
        <View style={[
          styles.row,
          {
            alignItems: 'center',
          }
        ]}
        >
          <View style={styles.center}>
            <Icon
              onPress={() => this.props.goBack()}
              source={require('../../resources/icons/back-arrow-circular-symbol.png')}
              style={{
                justifyContent: 'center',
                flex: 1,
                marginHorizontal: metrics.marginApp,
              }}
              styleImage={{
                height: 36,
                width: 36,
              }}
            />
          </View>
          <View
            style={styleSearch.textContainer}
          >
            <TextInput
              underlineColorAndroid={'transparent'}
              onChangeText={this.filter}
              placeholderTextColor={'#959595'}
              placeholder={'Recherche ... '}
              value={this.state.textSearch}
              style={[
                styleSearch.searchInput,
              ]}
            />
          </View>
          <View style={styles.center}>
            <Icon
              onPress={() => this.filter('')}
              source={require('../../resources/icons/close.png')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
              styleImage={{
                height: 15,
                width: 15,
                opacity: this.state.textSearch ? 1 : 0.4
              }}
            />
          </View>
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          colors={colors.gradientColor}
          style={[
            {
              height: 3,
            }
          ]}
        />
      </View>
    );
  }
}
export default SearchBar;

const styleSearch = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    height: Platform.OS === 'ios' ? 70 : 50,
  },
  searchInput: {
    color: colors.darkGray,
    width: metrics.deviceWidth * 3 / 4,
    flex: 1,
    fontSize: 18,
    // bottom: à
  },
  textContainer: {
    borderBottomColor: '#CDCDCD',
    borderBottomWidth: 1,
    flex: 4,
    marginBottom: metrics.smallMargin,
    //height: metrics.deviceWidth/10, 
  }
});
