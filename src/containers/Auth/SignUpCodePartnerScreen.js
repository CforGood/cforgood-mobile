import React, { Component, } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Loading from '../../components/common/Loading';
import Container from '../../components/login/Container';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';
import ErrorView from '../../components/common/ErrorView';
import { updateUserData } from '../../redux/actions/user';


import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';

class SignUpCodeScreen extends Component {
  state = {
    code_partner: ''
  };

  static propTypes = {
    error: PropTypes.string,
  };

  static defaultProps = {
    error: '',
  };

  componentWillMount() {

    this.setState({ code_partner: this.props.navigation.state.params.code_partner });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.failure || nextProps.error !== '') {
      this.setState({ error: nextProps.error });
    } else if (nextProps.loaded) {
      Keyboard.dismiss();
      setTimeout(() => this.props.navigation.navigate('SignUpValidation'), 300);
    }
  }

  verify = () => {
    const { code_partner } = this.state;

    if (code_partner !== '') {
      this.props.updateUserData(this.props.user.id, { code_partner });
    }
    else {
      Keyboard.dismiss();
      setTimeout(() => this.props.navigation.navigate('SignUpValidation'), 300);
    }
  }


  render() {
    const { code_partner } = this.state;

    return (
      <Background
        style={{
          flex: 1,
        }}>
        <Icon
          styleImage={{
            marginTop: metrics.marginApp + (Platform.OS === 'ios' ? 20 : 0),
            marginLeft: metrics.baseMargin,
            height: 20,
            width: 20,
            resizeMode: 'contain',
            tintColor: colors.white
          }}
          source={require('../../resources/icons/arrow-left.png')}
          onPress={() => this.props.navigation.goBack()}
        />

        <Container
          styleContainer={{
            paddingTop: metrics.base,
            paddingBottom: metrics.doubleBaseMargin,
          }}
          title={'Code promo disponible !'}
          onChangeText={() => { }}
          value={(this.props.navigation.state.params.code_partner || code_partner).toUpperCase()}
          placeholder={'Mon code promo'}
          firstText={""}
          subtitle={'Le code promo ci-dessous est disponible dans votre région, profitez-en !'}
          subButton={''}
          onPress={() => { }}
          nextStep={() => this.verify()}
          canHandleNextStep={true}
        />
        <Loading
          loading={!this.props.loaded}
          title={'Mise à jour code promo'}
        />
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: '' })}
        />
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  location: state.location.latlng,
  error: state.user.error,
  failed: state.user.failed,
  loaded: state.user.loaded,
});


const mapDispatchToProps = (dispatch) => ({
  updateUserData: bindActionCreators(updateUserData, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpCodeScreen);



