import React, { Component } from 'react';

import { 
  Animated, 
  Text,
  View, 
  Image, 
  TouchableOpacity, 
  ListView,
  StyleSheet,
  Linking,
  Platform,
  AsyncStorage
  } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation, NavigationActions } from 'react-navigation';
import Intercom from 'react-native-intercom';

import { signout } from '../../redux/actions/auth';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';
import Separator from '../common/Separator';

const URL_MANIFESTE = 'http://www.cforgood.com/manifeste/';
const URL_FAQ = 'http://www.cforgood.com/faq/';
const URL_INFO = 'http://www.cforgood.com/plus-dinfos/';
const URL_CONFIDENTIAL = 'http://www.cforgood.com/confidential';
const URL_CGV = 'http://www.cforgood.com/cgu/';
const SIGNOUT = 'SIGNOUT';


const URL_APPSTORE = 'itms://itunes.apple.com/us/app/cforgood/id1217246114?mt=8';
const URL_PLAYSTORE ='market://details?id=com.cforgood';


const URL_STORE = Platform.OS === 'ios' ?  URL_APPSTORE  :  URL_PLAYSTORE ;


const listActions = [
  {
    'label': 'Suggérer des améliorations',
    action: () => Intercom.displayMessageComposerWithInitialMessage('Suggérer des améliorations\n'),
  },
  {
    'label': 'Signaler un bug',
    action: () => Intercom.displayMessageComposerWithInitialMessage('Signaler un bug\n'),
  },
  {
    'label': 'Manifeste',
    url: URL_MANIFESTE,
  },
  {
    'label': 'Aide et conseils',
    url:  URL_FAQ,
  },
  {
    'label': 'Plus d\'infos',
    url:  URL_INFO,
  },
  {
    'label': 'Protection des données',
    url: URL_CONFIDENTIAL,
  },
  {
    'label': 'Licence',
    url: URL_CONFIDENTIAL,
  },
  {
    'label': 'CGV',
    url: URL_CGV,
  },
  {
    'label': 'Se déconnecter',
    url: SIGNOUT,
  },
];

class Setting extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(listActions)
    };
  }

  OpenURL = (url, label) => {
    this.props.navigation.navigate(
      'WebView',
      { url, title: label }
    )
  }

  signout(){
    //AsyncStorage.removeItem('@CfoorGoodStore:auth');
    this.props.signout();

    //this.props.navigation.init(resetAction);
  }

  renderRow = (setting) => {
    return (
      setting.action ?
      <TouchableOpacity
        style={style.row}
        onPress={setting.action}
      >
        <Text style={style.title}>{setting.label}</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity
        style={style.row}
        onPress={() => setting.url !== SIGNOUT ?  this.OpenURL(setting.url, setting.label) : this.signout()}
      >
        <Text style={style.title}>{setting.label}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            style=
            {[ 
               fonts.style.t20, 
               style.boldCenter,
             ]}
          >
            Paramètres
          </Text>
        </View>
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(setting) => this.renderRow(setting)}
          />
        </View>
        <TouchableOpacity 
          style={[
            styles.row,
            styles.center,
          ]}
          onPress= {()=> {
            Linking.canOpenURL(URL_STORE).then(supported => {
              if (!supported) {
                console.log('Can\'t handle url: ' + URL_STORE);
              } else {
                return Linking.openURL(URL_STORE);
              }
            }).catch(err => console.error('An error occurred', err));}}
        >
          <Text
            style=
            {[ 
               style.title, 
               {
                color: colors.red_review,
                fontWeight: 'bold',
                marginRight: 10
               },
             ]}
          >
            Noter l'application
          </Text>
          <Image 
          source={require('../../resources/icons/like.png')}
            style={{
              height: 19,
              width: 20,
              resizeMode: 'contain',
              tintColor: colors.red_review,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signout: bindActionCreators(signout, dispatch),
});

export default connect(null, mapDispatchToProps)(withNavigation(Setting));

const style = StyleSheet.create({  
  row:{
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor:  colors.separatorText,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: fonts.size.t17, 
    textAlign: 'center',
    fontWeight: '500', 
    marginVertical: metrics.baseMargin,
  },
  boldCenter: {
    textAlign: 'center',
    marginVertical: metrics.baseMargin,
    fontWeight: 'bold',
  },
  
}); 
