import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  BackAndroid,
  TextInput,
  Linking,
  Clipboard
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';

import Button from '../../components/common/ButtonGradiant';

import { use } from '../../redux/actions/review';
import { setBusiness } from '../../redux/actions/business';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class PromoScreen extends PureComponent {

  state = { content: '' };

  onValidate = () => {
    const { business, perk } = this.props.navigation.state.params;

    this.props.use(perk, business, false);

    if (Platform.OS === 'android') {
      this.props.setBusiness(null);
    }

    this.openBrowser(business.url);
  }

  openBrowser(url) {
    if (url && url !== '') {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log('Don\'t know how to open URI: ' + url);
        }
        return false
      });
    }

  }

  _setClipboardContent = async () => {
    const { perk } = this.props.navigation.state.params;
    Clipboard.setString(perk.perk_code);
    try {
      var content = await Clipboard.getString();
      this.setState({ content });
    }
    catch (e) {
      this.setState({ content: e.message });
    }
  };

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
  }

  handleBackAndroid = () => {
    return true;
  }



  render() {
    const { business, perk } = this.props.navigation.state.params;

    return (
      <View style={styles.screen.mainContainer}>
        <View style={{
          flex: 1,
          margin: metrics.marginApp * 2
        }}
        >
          <View
            style={[
              styles.center,
              {
                flex: 1,
                marginVertical: metrics.marginApp * 2,
              }
            ]}
          >
            <Text style={[
              fonts.style.t18,
              {
                fontWeight: 'bold',
                textAlign: 'center',
              }
            ]}
            >
              {business.name}
            </Text>
            <Text style={[
              fonts.style.h9,
              {
                textAlign: 'center',
              }
            ]}
            >
              {perk.name.toLowerCase()}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginVertical: metrics.baseMargin,
            }}
          >
            <Text style={[
              fonts.style.t18,
              fonts.style.bold,
              { textAlign: 'center' }
            ]}
            >
              CODE PROMO
            </Text>
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              colors={colors.gradientColor}
              style={style.codePromo}
            >
              <View style={style.textPromoContainer}>
                <Text
                  onPress={this._setClipboardContent}
                  style={style.textPromo}
                >
                  {perk.perk_code}
                </Text>
              </View>
            </LinearGradient>
          </View>
          <View style={[
            styles.center,
            { flex: 1 }
          ]}
          >
            <Text style={[style.description, { fontWeight: 'bold' }]} >
              ”Copier ce code,
            </Text>
            <Text style={style.description} >
              avant de vous rendre sur le site en ligne du commerçant, afin d'en profiter.”
            </Text>
          </View>
        </View>
        <Button
          onPress={this.onValidate}
          text={"Me rendre sur le site"}
        />
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  use: bindActionCreators(use, dispatch),
  setBusiness: bindActionCreators(setBusiness, dispatch),
});

export default connect(null, mapDispatchToProps)(PromoScreen);

const style = {
  marginVertical: {
    marginVertical: metrics.doubleBaseMargin,
  },
  description: {
    color: colors.darkGray,
    fontFamily: fonts.type.base,
    fontSize: fonts.size.regular,
    textAlign: 'center'
  },
  codePromo: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: metrics.baseMargin,
  },
  textPromo: {
    textAlign: 'center',
    color: colors.darkGray,
    fontWeight: 'bold',
  },
  textPromoContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.code_partenaire,
    margin: 1,
    borderRadius: 4,
  }
}; 
