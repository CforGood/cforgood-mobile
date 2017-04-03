import React, {
  PropTypes,
  PureComponent,
} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

import Back from './Back';

class Header extends PureComponent {
  
  static propTypes = {
    text: PropTypes.string.isRequired, 
    color: PropTypes.string,
    back: PropTypes.string,
    left: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    titleStyle: PropTypes.object,
  };

  static defaultProps = { 
    left: true,
    text: '',
    color: 'transparent',
  };

  close() {
    if(this.props.onClose){
      this.props.onClose()
    }
    else{
      this.props.navigation.goBack()
    }
  }

  render() { 
    return ( 
      <View style={[
          style.container,
          this.props.style
        ]}
      >  
        { this.props.left &&
          <View style={{flex:1}}>
            {
              this.props.back && 
              <Back
                onPress={() => this.close()} 
                rotate={this.props.back ==='-90deg'}
              />
            }
            {
              this.props.leftElement
            }
          </View>
        }
        <View style={{
            flex:4, 
            alignItems: 'center',
            justifyContent: 'center'
          }}
        > 
          <View>
            <Text 
              style={[ 
                fonts.style.bold,
                fonts.style.t24, 
                {
                  zIndex: 1,
                },
                this.props.titleStyle 
              ]}
              numberOfLines={1}
            >
              {this.props.text}
            </Text>
            <View
              style={{
                borderBottomWidth: 8,
                borderBottomColor: this.props.color,
                bottom: 8
              }}
            />
          </View>
           
        </View>
        <View style={{flex:1, alignItems: 'flex-end'}}>
          {
            this.props.close && 
            <Back 
              close={true}
              onPress={() => this.close()}
            />
          }
        </View>
        
        {
          this.props.rightElement
        }
      </View>
    );
  }
}

export default withNavigation(Header);

const style = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20: 0,
    height: metrics.navBarHeight,
    paddingHorizontal: metrics.marginApp,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
});