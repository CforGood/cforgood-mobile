import PropTypes from 'prop-types'; import React, {  PureComponent, } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

import TabItem from './TabItem';

const linearGrad = <LinearGradient
  start={{x: 0, y:0}}
  end={{x: 1, y:0}}
  colors={colors.gradientColor}
  style={{
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 5
  }}
/>
export default class Tab extends PureComponent {

  static propTypes = {     
    selectedItem: PropTypes.string.isRequired,
    changeSelectedItem: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedItem: 'profile'
  };
  
  changeSelectedItem(item) {

    this.props.changeSelectedItem(item);

  }

  renderTabItem(colors, isSelected, flex){
    <LinearGradient
      start={{x: 0, y:0}}
      end={{x: 1, y:0}}
      colors={colors}
      style={
        isSelected ? 
        [
          stylesTab.tabSelected,
          Platform.OS === 'ios' ? stylesTab.tabSelectedIOS : {}
        ]
        :
        {flexDirection: 'row', flex: flex}
      }
    >
      { isSelected && Platform.OS === 'ios' && linearGrad }
      
      <TabItem 
        onPress={() => this.changeSelectedItem('profile')}
        text={'profile'} 
        selectedItem={true} 
      />
    </LinearGradient>
  }

  rendertab() {
    if(this.props.selectedItem === 'profile') {
      return (
        <View style={{flexDirection: 'row', flex: 1}}>
          <LinearGradient
            start={{x: 0, y:0}} end={{x: 1, y:0}}
            colors={colors.gradientColor}
            style={[
              stylesTab.tabSelected,
              Platform.OS === 'ios' ? stylesTab.tabSelectedIOS : {}
            ]}
          >
          { Platform.OS === 'ios' && linearGrad }
            <TabItem 
              onPress={() => this.changeSelectedItem('profile')}
              text={'profile'} 
              selectedItem={true} 
            />
          </LinearGradient>
          <LinearGradient
            start={{x: 0, y:0}} end={{x: 1, y:0}}
            colors={colors.inverseGradientColor}
            style={{flexDirection: 'row', flex: 3}}
          >
            <TabItem 
              onPress={() => this.changeSelectedItem('Association')} 
              text={'Association'} 
              selectedItem={false} 
            />
            <TabItem 
              onPress={() => this.changeSelectedItem('Abonnement')}
              text={'Abonnement'} 
              selectedItem={false} 
            />
             <TabItem 
              onPress={() => this.changeSelectedItem('Settings')}
              text={'Settings'} 
              selectedItem={false} 
            />
          </LinearGradient>
        </View>
      )
    } else if(this.props.selectedItem === 'Association') {
      return (
        <View style={{flexDirection: 'row', flex: 1}}>
          <LinearGradient
            start={{x: 0, y:0}}
            end={{x: 1, y:0}}
            colors={colors.inverseGradientColor}
            style={{flexDirection: 'row', flex: 1}}
          >
            <TabItem 
              onPress={() => this.changeSelectedItem('profile')}
              text={'profile'} 
              selectedItem={false} 
            />
          </LinearGradient>
          <LinearGradient
            start={{x: 0, y:0}}
            end={{x: 1, y:0}}
            colors={colors.gradientColor}
            style={[
              stylesTab.tabSelected,
              Platform.OS === 'ios' ? stylesTab.tabSelectedIOS : {}
            ]}
          >
          { Platform.OS === 'ios' && linearGrad }
            <TabItem 
              onPress={() => this.changeSelectedItem('Association')}
              text={'Association'} 
              selectedItem={true} 
            />
          </LinearGradient>
          <LinearGradient
            start={{x: 0, y:0}}
            end={{x: 1, y:0}}
            colors={colors.inverseGradientColor}
            style={{flexDirection: 'row', flex: 2}}
          >
            <TabItem 
              onPress={() => this.changeSelectedItem('Abonnement')}
              text={'Abonnement'} 
              selectedItem={false} 
            />
             <TabItem 
              onPress={() => this.changeSelectedItem('Settings')}
              text={'Settings'} 
              selectedItem={false} 
            />
          </LinearGradient>
        </View>
      )
    } else if(this.props.selectedItem === 'Abonnement') {
      return (
        <View style={{flexDirection: 'row', flex: 1}}>
          <LinearGradient
            start={{x: 0, y:0}}
            end={{x: 1, y:0}}
            colors={colors.inverseGradientColor}
            style={{
              flexDirection: 'row',
              flex: 2,
            }}
          >
            <TabItem 
              onPress={() => this.changeSelectedItem('profile')}
              text={'profile'} 
              selectedItem={false} 
            />
            <TabItem 
              onPress={() => this.changeSelectedItem('Association')}
              text={'Association'} 
              selectedItem={false} 
            />
          </LinearGradient>
          <LinearGradient
            start={{x: 0, y:0}} end={{x: 1, y:0}}
            colors={colors.gradientColor}
            style={[
              stylesTab.tabSelected,
              Platform.OS === 'ios' ? stylesTab.tabSelectedIOS : {}
            ]}
          >
            { Platform.OS === 'ios' && linearGrad }
            <TabItem 
              onPress={() => this.changeSelectedItem('Abonnement')}
              text={'Abonnement'} 
              selectedItem={true} 
            />
            
            
          </LinearGradient>
           <LinearGradient
            start={{x: 0, y:0}}
            end={{x: 1, y:0}}
            colors={colors.inverseGradientColor}
            style={{flexDirection: 'row', flex: 1}}
          >
             <TabItem 
              onPress={() => this.changeSelectedItem('Settings')}
              text={'Settings'} 
              selectedItem={false} 
            />
          </LinearGradient>
        </View>
      )
    }
    else if(this.props.selectedItem === 'Settings') {
      return (
        <View style={{flexDirection: 'row', flex: 1}}>
          <LinearGradient
            start={{x: 0, y:0}}
            end={{x: 1, y:0}}
            colors={colors.inverseGradientColor}
            style={{
              flexDirection: 'row',
              flex: 3,
            }}
          >
            <TabItem 
              onPress={() => this.changeSelectedItem('profile')}
              text={'profile'} 
              selectedItem={false} 
            />
            <TabItem 
              onPress={() => this.changeSelectedItem('Association')}
              text={'Association'} 
              selectedItem={false} 
            />
             <TabItem 
              onPress={() => this.changeSelectedItem('Abonnement')}
              text={'Abonnement'} 
              selectedItem={false} 
            />
          </LinearGradient>
           <LinearGradient
            start={{x: 0, y:0}}
            end={{x: 1, y:0}}
            colors={colors.gradientColor}
            style={[
              stylesTab.tabSelected,
              Platform.OS === 'ios' ? stylesTab.tabSelectedIOS : {}
            ]}
          >
          { Platform.OS === 'ios' && linearGrad }
             <TabItem 
              onPress={() => this.changeSelectedItem('Settings')}
              text={'Settings'} 
              selectedItem={true} 
            />
          </LinearGradient>
        </View>
      )
    }
  }
  render() {
    const { onPress, selectedItem } = this.props;
    return (
      <View
        style={{
          marginHorizontal: metrics.marginApp, 
        }}
      >
      {
        this.rendertab()
      }  
      </View>
    );
  }
}

const stylesTab = StyleSheet.create({
  tabSelected: {
    flexDirection: 'row',
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  tabSelectedIOS: {
    borderRadius: 5,
  }

});

