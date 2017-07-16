import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Platform,
} from 'react-native';

import ButtonGradiant from '../common/ButtonGradiant';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';


class PerkFilter extends PureComponent {

  state = {
    filter: 'nearme'
  };

  setFilter(filter) {
    this.setState({ filter });
    this.props.sortBy(filter);
  }

  render() {
    const { filter } = this.state;
    return (
      <View style={style.container}
      >
        <ButtonGradiant
          type={filter !== 'nearme' ? 'simple' : ''}
          style={
            filter === 'nearme'
              ?
              {
                ...style.button,
                ...style.borderLeft,
                ...style.selectedButton
              }
              :
              {
                ...style.button,
                ...style.borderLeft,
              }
          }
          styleButton={
            filter === 'nearme' ?
              {
                ...style.borderLeft,
                ...style.buttonContainer,
              }
              :
              style.borderLeft
          }
          styleText={
            filter === 'nearme' ?
              {
                ...style.text,
                color: 'white'
              }
              :
              {
                ...style.text,
              }
          }
          onPress={() => this.setFilter('nearme')}
          text={'Autour de moi'}
        />
        <ButtonGradiant
          type={filter !== 'mostPopular' ? 'simple' : ''}
          style={
            filter === 'mostPopular' ?
              {
                ...style.button,
                ...style.borderRight,
                ...style.selectedButton,
                alignItems: 'flex-end',
              }
              :
              {
                ...style.button,
                ...style.borderRight,
              }
          }
          styleButton={
            filter === 'mostPopular' ?
              {
                ...style.borderRight,
                ...style.buttonContainer,
                ...style.borderRight
              }
              :
              {
                ...style.borderRight,
                ...style.buttonContainer,
              }
          }
          styleText={
            filter === 'nearme' ?
              {
                ...style.text,
              }
              :
              {
                ...style.text,
                color: 'white'
              }
          }
          text={'Les + populaires'}
          onPress={() => this.setFilter('mostPopular')}
        />
      </View>
    );
  }
}

export default PerkFilter;

const style = {
  container: {
    height: 73,
    width: metrics.deviceWidth,
    paddingVertical: (73 - 44) / 2,
    paddingHorizontal: metrics.marginApp,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 44,
    overflow: 'hidden',
    justifyContent: 'center',
    borderColor: '#CDCDCD',
    borderWidth: 2,
  },
  selectedButton: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
  text: {
    color: colors.darkGray,
    fontSize: fonts.size.regular,
    width: (metrics.deviceWidth - metrics.marginApp) / 2,
  },
  borderRight: {
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
  },

  borderLeft: {
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
  },
  buttonContainer: {
    height: 44,
    width: Platform.OS === 'ios' ? metrics.deviceWidth / 2 : (metrics.deviceWidth - metrics.marginApp) / 2,
    borderRadius: Platform.OS === 'ios' ? 22 : 0,
  }
}; 
