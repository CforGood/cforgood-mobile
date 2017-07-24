import React, { Component,  } from 'react'; import PropTypes from 'prop-types';
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.failure || nextProps.error !== '') {
      this.setState({ error: nextProps.error });
    } else if(nextProps.loaded) {
      this.props.navigation.navigate('SignUpValidation');

    }
  }

  verify = () => {
    const { code_partner } = this.state;
    if (code_partner !== '') {
      this.props.updateUserData(this.props.user.id, { code_partner });
      Keyboard.dismiss();
    }
    else {
      this.props.navigation.navigate('SignUpValidation');
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
          title={'Vous avez un code promo ?'}
          onChangeText={(code_partner) => this.setState({ code_partner })}
          value={code_partner.toUpperCase()}
          placeholder={'Mon code promo'}
          firstText={""}
          subtitle={'Office de tourisme, partenaire ou parrainage …'}
          subButton={'Passer ou valider'}
          onPress={() => { }}
          nextStep={() => this.verify()}
          canHandleNextStep={true}
        />
        <Loading loading={!this.props.loaded} />
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



