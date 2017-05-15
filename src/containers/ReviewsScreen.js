import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
  cancelReview,
  feedback,
} from '../redux/actions/review';

import Button from '../components/common/ButtonGradient';
import Like from '../components/common/Like';
import Modal from '../components/Modal/WidthRNModal';
import Separator from '../components/common/Separator';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

class PerkReviewsScreen extends Component { 
  
  reviewPerk = (flag) => {
    this.props.feedback(this.props.use, flag);
  }

  render() {
    const { perk, business } = this.props;

    return (
      perk !== null ?
      <Modal
        onClose={() => {}}
        animationType={'none'}
        blurType={'dark'}
        blurAmount={3}
        visible={perk !== null}
      >
        <Image 
          style={stylePerkReviewsScreen.popup}
          source={require('../resources/images/popup.png')}    
        >
          <LinearGradient
            start={{x: 0, y:0}} end={{x: 0, y:1}}
            colors={colors.gradientColor}
            style={[
              {
                flex: 1,
                padding: 2,
              }
            ]}
          >
            <Image 
              style={[
                styles.center, 
                stylePerkReviewsScreen.picture
              ]}
              source={{uri: perk.picture || business.picture}}
            >
              <Text style={[ 
                  fonts.style.textWhite, 
                  fonts.style.bold, 
                  {
                    fontSize: 26,
                    backgroundColor: 'transparent',
                    textAlign: 'center'
                  }
                ]}
              >
                {business.name}
              </Text>             
            </Image>
            <View style={styles.screen.mainContainer}>
              <View 
                style={{alignItems: 'center'}}
              >
                <Text style={[ 
                    fonts.style.t16,  
                    fonts.style.bold,
                    {  
                      marginVertical: metrics.baseMargin
                    }
                  ]}
                >
                 {perk.name.toLowerCase()} 
                </Text> 
                <Text style={[ 
                    fonts.style.t18,
                    fonts.style.mediumBold, 
                    {
                      marginVertical: metrics.baseMargin
                    } 
                  ]}
                >
                  Avez-vous apprécié ce bon plan ?
                </Text> 
              </View>

            <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: metrics.baseMargin
                }}
              >
                <Like type={'color'} onPress={() => this.reviewPerk('like')} />
                <Like type={'gray'} onPress={() => this.reviewPerk('unlike')} />
              </View>
              <Separator margin={metrics.doubleBaseMargin} />
              <TouchableOpacity
                onPress={() => this.reviewPerk('unused')} 
                style={{alignItems: 'center'}}
              >
                <Text style={[ 
                    fonts.style.t15,
                    {
                      fontWeight: fonts.fontWeight.f200,
                      marginVertical: metrics.baseMargin
                    } 
                  ]}
                >
                  Je n'ai pas utilisé ma carte de membre
                </Text> 
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Image>
      </Modal>
      :
      null 
    );
  }
}

const mapStateToProps = state => ({
  perk: state.review.perk,
  business: state.review.business,
  use: state.review.use
});

const mapDispatchToProps = (dispatch) => ({
  feedback: bindActionCreators(feedback, dispatch),
  cancelReview: bindActionCreators(cancelReview, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PerkReviewsScreen);

const stylePerkReviewsScreen = {  
  popup: {
    width: metrics.deviceWidth - metrics.marginApp*2, 
    height: Math.max(metrics.deviceHeight/1.5, 400),
    left: metrics.marginApp,
    //top: (metrics.deviceHeight - metrics.deviceHeight/1.5) /2,
  },
  picture: {
    height: 170,
  }
}; 
