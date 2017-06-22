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
    return (
      <View style={style.container}
      >
        <ButtonGradiant
          type={this.state.filter !== 'nearme' ? 'simple' : ''}
          style={[
            style.button,
            style.borderLeft,
            this.state.filter === 'nearme' ? style.selectedButton : {},
          ]}
          styleButton={
            this.state.filter === 'nearme' ?
            [ 
              style.borderLeft,
              style.buttonContainer,
              
            ]
            :
            style.borderLeft
          }
          styleText={[
            style.text,
            this.state.filter === 'nearme' ? {color: 'white'} : {}
          ]}
          onPress={() => this.setFilter('nearme')}
          text={'Autour de moi'}
        /> 
        <ButtonGradiant
          type={this.state.filter !== 'mostPopular' ? 'simple' : ''}
          style={[
            style.button,
            style.borderRight,
            this.state.filter === 'mostPopular' ? 
            [
              style.selectedButton,
              {alignItems: 'flex-end'}
            ]  
            : 
            {},
          ]}
          styleButton={
            this.state.filter === 'mostPopular' ?
            [ 
              style.borderRight,
              style.buttonContainer,
            ]
            :
            style.borderRight
          }
          styleText={[
            style.text,
            this.state.filter === 'mostPopular' ? {color: 'white'} : {}
          ]}
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
    paddingVertical: (73-44)/2,
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
    width: (metrics.deviceWidth- metrics.marginApp)/2,
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
    width:  Platform.OS === 'ios' ? metrics.deviceWidth/2 : (metrics.deviceWidth- metrics.marginApp)/2,
    borderRadius: Platform.OS === 'ios' ? 22 : 0,
  }
}; 
