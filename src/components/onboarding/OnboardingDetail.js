import React, {
  PureComponent,
  PropTypes,
}  from 'react';

import { 
  Text,
  View,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

import Separator from '../common/Separator';

class OnboardingDetail extends PureComponent {

  static propTypes = { 
    firstText: PropTypes.string.isRequired,
    secondText: PropTypes.string,
    thirdText: PropTypes.string,
    firstText1: PropTypes.string,
    firstText2: PropTypes.string,
    source: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
  };

  static defaultProps = {
    firstText: '',
    secondText: '',
    thirdText: '',
    index: 0,
  };

  state = {
    offset: new Animated.Value(0)
  };

  render() {
    return (
      <Animated.View
        style={[
          styles.screen.overlay,
          {
            justifyContent: 'space-between',
            transform: [
              {
                translateX: this.state.offset
              }   
            ]
          }
        ]}
      > 
        <View style={[
            styleOnboardingDetail.imageContainer,
            this.props.index === 3  ? 
            {
              marginBottom: metrics.deviceHeight/12
            }
            :
            null
          ]} >
          <Image
            resizeMode={'contain'}
            source={ this.props.source }
            style={ this.props.styleImage }
          />
          {
            this.props.index === 3 && 
            <View style={styleOnboardingDetail.textContainer} >
              <Text style={[
                  styleOnboardingDetail.text,
                  { 
                    fontSize: 14,
                  }
                ]}
              >
                Associations
              </Text>
              <Text style={[
                  styleOnboardingDetail.text,
                  {
                    fontSize: 14,
                    top: - ( metrics.deviceWidth/2 ) - metrics.smallMargin ,
                    marginHorizontal: 0,
                  }
                ]}
              >
                Citoyens
              </Text>
              <Text style={[
                  styleOnboardingDetail.text,
                  { 
                    fontSize: 14,
                  }
                ]}
              >
                Commerces
              </Text>
            </View>
          }
        </View>
        { this.props.index === 3 && 
            <Separator 
              style={{
                paddingHorizontal: metrics.doubleBaseMargin*2,
              }} 
            /> 
          }
        <View style={[
            {
              flex: 1,
              marginTop: 
              this.props.index === 3 ? 
              metrics.deviceHeight/12 : 
              metrics.doubleBaseMargin
            }
          ]}
        >
          <Text style={styleOnboardingDetail.text}>
            { this.props.firstText }
          </Text>
          <Text style={[
              styleOnboardingDetail.text,
              {
                marginTop: 1,
              }
            ]}>
            { this.props.firstText1 }
          </Text>
          <Text style={[
              styleOnboardingDetail.text,
              {
                marginTop: 1,
              }
            ]}>
            { this.props.firstText2 }
          </Text>
          <Text style={[
              styleOnboardingDetail.text,
              {
                marginTop: metrics.baseMargin,
              }
            ]}>
            { this.props.secondText }
          </Text>
          <Text style={[
              styleOnboardingDetail.text,
              fonts.style.bold,
              {
                marginTop: 0,
              }
            ]}
          >
            { this.props.thirdText }
          </Text>
        </View>
      </Animated.View>
    )
  }
};
 
export default OnboardingDetail;

var styleOnboardingDetail = {  
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: metrics.baseMargin,
  },
  text: {
    textAlign: 'center',
    marginHorizontal: metrics.baseMargin,
    fontSize: fonts.size.h9,
    color: colors.textOnboarding
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
};
