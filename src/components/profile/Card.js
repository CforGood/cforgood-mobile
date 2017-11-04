import React, { PureComponent,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
require('moment/locale/fr');
//moment.locale('fr');


import CategoryInfo from '../category/CategoryInfo'; 
import ProfileImage from '../common/ProfileImage';


import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class Card extends PureComponent {
  
  render() {
    const { user } = this.props;
    return (
      <View style={styleCard.container}>
        <View style={styleCard.header}>
          {
            user.supervisor_attributes &&
            user.supervisor_attributes.supervisor_logo &&
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  fonts.style.normal,  
                  {
                    color: colors.gray, 
                    marginHorizontal: metrics.smallMargin,
                  }
                ]} 
              >
                Offert par
              </Text>
              <Image 
                style={{
                  height: 15,
                  width: 15,
                  marginLeft: metrics.smallMargin      
                }}
                source={{uri: user.supervisor_attributes.supervisor_logo}}
              /> 
            </View>
          }
          <LinearGradient 
            start={{x: 0, y:0}}
            end={{x: 1, y:0}}
            colors={colors.gradientColor}
            style={styleCard.linearGradient}
          > 
            <View style={styleCard.triangle} />
            <Text style={[ 
                fonts.style.normal,  
                {
                  color: colors.white, 
                  marginRight: metrics.baseMargin,
                  marginTop: metrics.smallMargin,
                }
              ]}
            >
              Le {moment().format('LL')}
            </Text> 
          </LinearGradient>
        </View>
          
        <View style={[
            styles.center,
            {flex:3}
          ]}
        >
          <Image
            resizeMode={'contain'}
            style={{
              height: metrics.images.logo/2,
              width: metrics.images.logo/2,      
            }}
            source={require('../../resources/images/logo.png')}
          />
        </View> 
        <View style={[
            {
              marginHorizontal: metrics.baseMargin,
              justifyContent: 'space-between'
            },
            styles.row,
          ]}
        >  
          <View 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1
            }}
          >
            <ProfileImage   
              picture={ user.picture } 
              styleBorder={styleCard.styleBorder}
              stylePicture={styleCard.stylePicture}
            />  
            <Text style={[ 
                fonts.style.normal,  
                {
                  color: colors.gray, 
                  marginHorizontal: metrics.smallMargin,
                }
              ]}
            >
              {user && (user.name && user.name ) || ( user.first_name  + ' ' + user.last_name)}
            </Text>
          </View>
         
          {
            user.cause_attributes &&
            <View
              style={{
                flexDirection: 'row', 
                alignItems: 'center',
                flex: 1
              }}
            >
              <Text style={[ 
                  fonts.style.normal,  
                  {
                    color: colors.gray, 
                    marginHorizontal: metrics.smallMargin,
                    width: metrics.deviceWidth/3,
                    textAlign: 'right',
                  }
                ]}
              >
                {
                  user.cause_attributes.name
                }
              </Text>
              <Image 
                style={{
                  height: 15,
                  width: 15,      
                }}
                source={{uri: user.cause_attributes.logo}}
              /> 
            </View>
          }
            
        </View>
        <View style={styleCard.footer} />  
      </View>
    );
  }
}
 
const mapStateToProps = state => ({
  user: state.user.data,
});

export default connect(mapStateToProps)(Card);

const styleCard = StyleSheet.create({ 
  container:{ 
    flex: 1,
    backgroundColor: colors.white, 
    borderColor: colors.gray, 
    borderWidth: 1,
    borderRadius: metrics.radius *2,   
  }, 
  header: {
    height: 30,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopRightRadius: metrics.radius *2,  
    borderTopLeftRadius: metrics.radius *2,
    overflow: 'hidden',
  },
  footer: {
    height: 15,
    backgroundColor: '#eff0ef',
    borderBottomRightRadius: metrics.radius *2 ,  
    borderBottomLeftRadius: metrics.radius *2 ,
  },
  stylePicture:{
    width: 36,
    height: 36, 
    borderRadius: 18 ,  
  }, 
  styleBorder:{  
    justifyContent: 'center',
    alignItems: 'center',  
    width: 36,
    height: 36,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 50,
    borderBottomWidth: 50,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderColor: 'white',
    position: 'absolute',
    top:0,
    left: 0,
  },
  linearGradient: {
    borderRadius: Platform.OS === 'ios' ? metrics.radius * 2 - 2 : 0,
    borderTopRightRadius: Platform.OS === 'android' ? metrics.radius * 2 - 2 : 0,
    height: 100,
    width: metrics.deviceWidth/1.6,
    alignItems: 'flex-end',
  },
});