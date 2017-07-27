import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  Platform
} from 'react-native';

import FontMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Separator from '../../components/common/Separator';
import Button from '../../components/common/ButtonGradiant';
import Header from '../../components/common/Header';
import Back from '../../components/common/Back';
import Loading from '../../components/common/Loading';

import Gender from '../../components/Association/Gender';
import ModalCategories from '../../components/Association/ModalCategories';

import ApiHandler from '../../utils/api';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

const HEADER_SCROLL_DISTANCE = metrics.marginApp;

class AssociationFormScreen extends PureComponent {

  state = {
    cause: {
      civility: 1,
      representative_first_name: "",
      representative_last_name: "",
      email: "",
      cause_category_id: 2,
      name: "",
      impact: "",
      description: "",
      street: "",
      zipcode: "",
      city: "",
    },
    visiableTheme: false,
    category: null,
    scrollY: new Animated.Value(0),
  };


  onChangeTheme = (category) => {
    this.setState({
      category,
      cause_category_id: category.id
    });
    this.setState({ visibleTheme: false })
  }

  propose() {
    this.setState({ loaded: false });
    ApiHandler.createCause(this.state.cause)
      .then(response => {

        this.setState({ loaded: true });
        if (!response.error) {
          Alert.alert(
            'Proposition association',
            'Merci',
            [
              { text: 'Fermer', onPress: () => { } },
            ]
          );
        }
      })
      .catch(message => {

      });
  }

  render() {
    const heightSeparator = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 3],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.screen.mainContainer}>
        <View style={styleAssociationFormScreen.container}>
          <View style={{
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
                    fontSize: 20
                  },
                  this.props.titleStyle
                ]}
                numberOfLines={1}
              >
                Proposer une association
              </Text>
              <View
                style={{
                  borderBottomWidth: 8,
                  borderBottomColor: colors.blueAssociation,
                  bottom: 8
                }}
              />
            </View>

          </View>
          <View
            style={{
              alignItems: 'flex-end'
            }}
          >
            <Back
              close={true}
            />
          </View>

        </View>
        <View style={{ flex: 7 }} >
          <Animated.ScrollView
            style={{
              flex: 1,
              paddingHorizontal: metrics.marginApp
            }}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
            )}
          >
            <Text
              style={[
                styleAssociationFormScreen.title,
                fonts.style.bold,
              ]}
            >
              Vous
            </Text>
            <Text
              style={[
                fonts.style.normal,
              ]}
              numberOfLines={10}
            >
              Ces informations ne seront pas divulguées sur l'application.
              Elle sont simplement demandées pour identifier la personne
              qui fait la demande et lui communiquer des informations.
            </Text>
            <Separator style={{ marginTop: metrics.doubleBaseMargin }} />
            <View style={[
              styles.row,
              {
                alignItems: 'center',
                marginVertical: metrics.baseMargin + metrics.smallMargin,
              }
            ]}
            >
              <Text style={[
                fonts.style.normal,
                {
                  color: colors.gray,
                  marginLeft: metrics.deviceWidth / 25,
                }
              ]}
              >
                Civilité
              </Text>
              <View style={[
                styles.spaceBetween,
                styles.row,
                {
                  marginHorizontal: metrics.doubleBaseMargin * 2,
                }
              ]}
              >
                <Gender
                  onChange={(civility) =>
                    this.setState((prevState) => ({
                      cause: { ...prevState.cause, civility }
                    }))
                  }
                />
              </View>
            </View>
            <Separator />
            <Kohana
              style={{ backgroundColor: colors.white }}
              label={'Prénom'}
              iconClass={FontMaterialIcons}
              iconName={'face'}
              iconColor={colors.lightBlue}
              labelStyle={fonts.style.textInput}
              inputStyle={{ color: colors.darkGray }}
              selectTextOnFocus={true}
              value={this.state.cause.representative_first_name}
              onChangeText={(text) => this.setState((prevState) => ({ cause: { ...prevState.cause, representative_first_name: text } }))}
            />
            <Separator />
            <Kohana
              style={{ backgroundColor: colors.white }}
              label={'Nom'}
              iconClass={FontMaterialIcons}
              iconName={'face'}
              iconColor={colors.lightBlue}
              labelStyle={fonts.style.textInput}
              inputStyle={{ color: colors.darkGray }}
              selectTextOnFocus={true}
              value={this.state.cause.representative_last_name}
              onChangeText={(text) => this.setState((prevState) => ({ cause: { ...prevState.cause, representative_last_name: text } }))}
            />
            <Separator />
            <Kohana
              style={{ backgroundColor: colors.white }}
              label={'E-mail'}
              iconClass={FontMaterialIcons}
              iconName={'email'}
              iconColor={colors.lightBlue}
              labelStyle={fonts.style.textInput}
              inputStyle={{ color: colors.darkGray }}
              selectTextOnFocus={true}
              value={this.state.cause.email}
              onChangeText={(text) => this.setState((prevState) => ({ cause: { ...prevState.cause, email: text } }))}
            />
            <Separator />
            <Text
              style={[
                styleAssociationFormScreen.title,
                fonts.style.bold,
              ]}
            >
              L'association
            </Text>
            <Separator />
            <TouchableOpacity
              onPress={() => this.setState({ visibleTheme: true })}
              style={[
                styles.row,
                {
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: metrics.inputHeight,
                  paddingHorizontal: metrics.baseMargin
                }
              ]}
            >
              <Text style={fonts.style.DateInput}>
                {this.state.category && this.state.category.name || "Thème"}
              </Text>
              <Image
                style={{
                  height: 7.17,
                  width: 13.36,
                }}
                source={require('../../resources/icons/arrow-bottom.png')}
              />
            </TouchableOpacity>
            <Separator />
            <Kohana
              style={{ backgroundColor: colors.white }}
              label={'Nom de l\'association '}
              iconClass={FontMaterialIcons}
              iconName={'domain'}
              iconColor={colors.lightBlue}
              labelStyle={fonts.style.textInput}
              inputStyle={{ color: colors.darkGray }}
              selectTextOnFocus={true}
              value={this.state.cause.name}
              onChangeText={(text) => this.setState((prevState) => ({ cause: { ...prevState.cause, name: text } }))}

            />
            <Separator />
            <Kohana
              style={{ backgroundColor: colors.white }}
              label={'Impact / But'}
              iconClass={FontMaterialIcons}
              iconName={'domain'}
              iconColor={colors.lightBlue}
              labelStyle={fonts.style.textInput}
              inputStyle={{ color: colors.darkGray }}
              selectTextOnFocus={true}

              value={this.state.cause.impact}
              onChangeText={(text) => this.setState((prevState) => ({ cause: { ...prevState.cause, impact: text } }))}
            />
            <Separator />
            <Kohana
              style={{ backgroundColor: colors.white }}
              label={'place'}
              iconClass={FontMaterialIcons}
              iconName={'place'}
              iconColor={colors.lightBlue}
              labelStyle={fonts.style.textInput}
              inputStyle={{ color: colors.darkGray }}
              selectTextOnFocus={true}
              value={this.state.cause.street}
              onChangeText={(text) => this.setState((prevState) => ({ cause: { ...prevState.cause, street: text } }))}
            />
            <Separator />
            <Kohana
              style={{ backgroundColor: colors.white }}
              label={'Ville'}
              iconClass={FontMaterialIcons}
              iconName={'pin-drop'}
              iconColor={colors.lightBlue}
              labelStyle={fonts.style.textInput}
              inputStyle={{ color: colors.darkGray }}
              selectTextOnFocus={true}
              value={this.state.cause.city}
              onChangeText={(text) => this.setState((prevState) => ({ cause: { ...prevState.cause, city: text } }))}
            />
            <Separator />
            <Kohana
              style={{ backgroundColor: colors.white }}
              label={'Code Postal'}
              iconClass={FontMaterialIcons}
              iconName={'pin-drop'}
              iconColor={colors.lightBlue}
              labelStyle={fonts.style.textInput}
              inputStyle={{ color: colors.darkGray }}
              selectTextOnFocus={true}
              value={this.state.cause.zipcode}
              onChangeText={(text) => this.setState((prevState) => ({ cause: { ...prevState.cause, zipcode: text } }))}
            />
            <Separator />
            <Text
              style={[
                styleAssociationFormScreen.title,
                { fontWeight: '300' },
              ]}
            >
              Description courte
            </Text>
            <View style={styleAssociationFormScreen.description}
            >
              <View style={[
                styles.row,
                {
                  height: 1,
                }
              ]}
              >
                <View style={styles.row} />
                <View style={[
                  styles.row,
                  {
                    height: 1,
                    backgroundColor: colors.separatorText,
                  }
                ]}
                />
              </View>
              <TextInput
                multiline={true}
                editable={true}
                numberOfLines={20}
                style={[
                  fonts.style.textInput,
                  {
                    height: 250,
                    padding: 5,
                    color: colors.darkGray,
                    textAlignVertical: 'top'
                  }
                ]}
                value={this.state.cause.description}
                onChangeText={(text) =>
                  this.setState((prevState) => ({
                    cause: { ...prevState.cause, description: text }
                  }))
                }
              />
            </View>
          </Animated.ScrollView>
          <Animated.View
            style={[styleAssociationFormScreen.header,
            {
              height: heightSeparator,
              backgroundColor: colors.blueAssociation,
            }
            ]}
          />
        </View>
        <ModalCategories
          visible={this.state.visibleTheme}
          onChange={this.onChangeTheme}
          onClose={() => this.setState({ visibleTheme: false })}
        />
        <Button
          type={'simple'}
          style={styleAssociationFormScreen.button}
          text={'Valider'}
          onPress={() => this.propose()}
        />
        <Loading
          loading={!this.state.loaded}
          title={'Envoi des données'}
        />
      </View>
    );
  }
}

export default AssociationFormScreen;

const styleAssociationFormScreen = {
  title: {
    color: colors.blueAssociation,
    marginBottom: metrics.baseMargin,
    fontSize: fonts.size.t16,
    marginTop: metrics.doubleBaseMargin,
  },
  description: {
    borderColor: colors.separatorText,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    marginBottom: metrics.baseMargin,
  },
  button: {
    backgroundColor: colors.blueAssociation,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    height: metrics.navBarHeight,
    paddingHorizontal: metrics.marginApp,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
}; 
