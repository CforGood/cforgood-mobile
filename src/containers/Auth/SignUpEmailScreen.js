import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Platform, Keyboard } from "react-native";

import Background from "../../components/common/Background";
import Container from "../../components/login/Container";
import Icon from "../../components/common/Icon";
import ErrorView from "../../components/common/ErrorView";
import ApiHandler from "../../utils/api";
import Loading from "../../components/common/Loading";

import { validateEmail } from "../../utils/helpers";

import { styles, colors, metrics, fonts } from "../../themes";

export default class SignUpScreen extends Component {
  state = {
    email: "",
    loaded: false
  };

  verify = () => {
    const { email } = this.state;
    if (!validateEmail(email)) {
      this.setState({ error: "L'adresse email n'est pas valide" });
    } else {
      this.setState({ loaded: true });
      ApiHandler.check(email)
        .then(response => {
          if (!response.exist) {
            const { params } = this.props.navigation.state;
            Keyboard.dismiss();
            this.setState({ loaded: false }, () => {
              this.props.navigation.navigate("SignUpPassword", {
                user: { email, ...params.user }
              });
            });
            setTimeout(() => this.setState({ loaded: false }), 500);
          } else {
            this.setState({
              error: "Oups ! ce compte existe déjà",
              loaded: false
            });
          }
        })
        .catch(message => {
          this.setState({
            error:
              "Oups ! un problème technique est survenu, veuillez réessayer plus tard !",
            loaded: true
          });
        });
    }
  };

  render() {
    const { email } = this.state;
    return (
      <Background
        style={{
          flex: 1
        }}
      >
        <ErrorView
          message={this.state.error}
          removeError={() => this.setState({ error: "" })}
        />
        <Icon
          styleImage={{
            marginTop: metrics.marginApp + (Platform.OS === "ios" ? 20 : 0),
            marginLeft: metrics.baseMargin,
            height: 20,
            width: 20,
            resizeMode: "contain",
            tintColor: colors.white
          }}
          source={require("../../resources/icons/arrow-left.png")}
          onPress={() => this.props.navigation.goBack()}
        />
        <Container
          styleContainer={{
            paddingTop: metrics.base
          }}
          title={"Quel est votre e-mail ?"}
          onChangeText={email => this.setState({ email })}
          value={email.toLowerCase()}
          placeholder={"Mon e-mail"}
          keyboardType={"email-address"}
          firstText={""}
          nextStep={this.verify}
        />
      </Background>
    );
  }
}
