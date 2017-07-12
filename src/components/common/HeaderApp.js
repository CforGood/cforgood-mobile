import React, {
  PropTypes,
  PureComponent,
} from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import {
  colors,
  fonts,
  metrics,
} from '../../themes';
import Icon from './Icon';
import ProfileImage from './ProfileImage';

class Header extends PureComponent {

  static propTypes = {
    module: PropTypes.string.isRequired
  };

  static defaulProps = {
    module: 'business'
  };

  render() {

    return (
      <Image
        source={require('../../resources/images/navbar.png')}
        style={style.headerImage}
      >
        <View style={style.headerContainer}>
          <Icon
            onPress={() => this.props.navigation.navigate('Search', { module: this.props.module })}
            source={require('../../resources/icons/search.png')}
            style={[
              {
                height: metrics.deviceWidth / 22.06,
                width: metrics.deviceWidth / 2,
              }
            ]}
            styleImage={{
              tintColor: colors.darkGray,
              height: 17,
              width: 17,
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => this.props.navigation.navigate('Profile')}
          >

            {
              this.props.user && this.props.user.picture ?
                <ProfileImage
                  picture={this.props.user.picture}
                  styleBorder={style.styleBorder}
                  stylePicture={style.stylePicture}
                />
                :
                <Image
                  source={require('../../resources/icons/profile.png')}
                  style={style.styleBorder}
                />
            }

            <Icon
              onPress={() => this.props.navigation.navigate('Profile')}
              source={require('../../resources/icons/arrow-bottom.png')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 13.36
              }}
              styleImage={{
                height: 7.17,
                width: 13.36,
                tintColor: colors.darkGray,
              }}
            />
          </TouchableOpacity>
        </View>
      </Image>

    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});

export default connect(mapStateToProps)(withNavigation(Header));


const style = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: metrics.marginApp,
  },
  headerImage: {
    height: Platform.OS === 'ios' ? 70 : 50,
    width: metrics.deviceWidth,
    backgroundColor: 'white',
  },
  stylePicture: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  styleBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    marginRight: 5
  },
});                               