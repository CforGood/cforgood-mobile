import React, { Component, } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ApiHandler from '../../utils/api';

import {
  styles,
  colors,
  metrics,
  fonts,
} from '../../themes';
import Header from '../../components/common/Header';
import Background from '../../components/common/Background';
import ErrorView from '../../components/common/ErrorView';
import Loading from '../../components/common/Loading';

import Button from '../../components/common/ButtonGradiant';
import ButtonGradiantRadius from '../../components/common/ButtonGradiantRadius'
import AssociationSelect from '../../components/Association/AssociationSelect';
import { updateUserData } from '../../redux/actions/user';

class AssociationListScreen extends Component {
  state = {
    selected: null,
    error: '',
    associations: [],
    loaded: false,
  };

  componentWillMount() {
    let location = this.props.location || { latitude: 44.8460252, longitude: -0.5736973 };
    ApiHandler.associations(location)
      .then(response => {
        if (response && !response.error) {
          if (response.length !== 0) {
            this.setState({ associations: response });
          }
        }
      })
      .catch(message => {
        // dispatch(failure(message.error));
      });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.failure === true) {
      this.setState({ error: nextProps.error[0] });
    }
    else if (
      nextProps.user.cause_id !== null
      &&
      nextProps.loaded
      &&
      !this.state.loaded
    ) {
      this.setState({ loaded: true })
      this.props.navigation.navigate('Payment');
    }
  }

  _keyExtractor = (item) => item.id;

  handleConfirm = () => {
    if (this.state.selected) {
      this.props.updateUserData(this.props.user.id, { cause_id: this.state.selected });
    }
    else {
      this.setState({
        error: 'Oups ! \n Sélectionnez d\'abord une association :-)',
      })
    }
  }

  render() {
    return (
      <View style={styles.screen.mainContainer} >
        <ErrorView
          message={this.state.error}
          color={'#29b6f6'}
        />
        <Loading
          loading={!this.props.loaded}
          title={'Envoi des données'}
        />
        <Header
          text={'Séléctionnez une association'}
          type={'gradiant'}
          style={{
            paddingHorizontal: metrics.marginApp
          }}
          onClose={() => this.props.navigation.goBack()}
        />
        <View style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 65,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}>
          <ButtonGradiantRadius
            text={'Soutenir'}
            styleButton={{
              width: 200
            }}
            styleText={{
              color: colors.darkGray,
            }}
            onPress={this.handleConfirm}
          />
        </View>
        <View style={{
          flex: 1,
          backgroundColor: colors.white
        }}
        >
          <FlatList
            data={this.state.associations}
            keyExtractor={this._keyExtractor}
            contentContainerStyle={[
              styles.wrap,
              {
                marginHorizontal: metrics.baseMargin,
                paddingTop: metrics.baseMargin,
              }
            ]}
            renderItem={({ item, index }) => (<AssociationSelect
              association={item}
              index={index}
              selected={this.state.selected}
              onSelect={() => this.setState({ selected: item.id })}
            />
            )}
            selected={this.state.selected}
          />
        </View>
        <Button
          onPress={() => this.props.navigation.navigate('Payment')}
          type={'simple'}
          style={{
            backgroundColor: 'white'
          }}
          styleText={{
            ...fonts.style.t18,
            color: colors.ignore,
          }}
          text={'Passer'}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location.latlng,
  user: state.user.data,
  failure: state.user.failure,
  error: state.user.error,
  loaded: state.user.loaded,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: bindActionCreators(updateUserData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssociationListScreen);


const style = StyleSheet.create({
  button: {
    height: 50,
    padding: metrics.baseMargin,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray
  },
});
