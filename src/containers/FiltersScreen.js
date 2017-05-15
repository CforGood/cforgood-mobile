import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/common/Header';
import ButtonGradient from '../components/common/ButtonGradient';
import CategoryList from '../components/category/CategoryList';

import { filter, reset } from '../redux/actions/filters';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../themes';

class FiltersScreen extends Component {
  state = {
    reset: false,
    selectedCategories: []
  };

  componentWillMount() {
    const { from } = this.props.navigation.state.params;
    this.setState({
      selectedCategories:
      from === 'maps' ?
        this.props.categories
        :
        this.props.categoriesPerks
    });
  }

  renderRight() {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ reset: !this.state.reset })}
      >
        <Text style={fonts.style.normal}>
          Tout réinitialiser
        </Text>
      </TouchableOpacity>
    )
  }

  handlerFilter = () => {
    const params = this.props.navigation.state.params;

    if (this.state.reset === true) {
      this.props.filter([], params.from);
    } else {
      this.props.filter(this.state.selectedCategories, params.from);
    }

    this.props.navigation.goBack();
  }

  setCategories = (selectedCategories) => {
    this.setState({ selectedCategories })
  }

  render() {
    const params = this.props.navigation.state.params;
    return (
      <View style={styles.screen.mainContainer}>
        <Header
          back={'-90deg'}
          rightElement={this.renderRight()}
          style={{
            paddingHorizontal: metrics.doubleBaseMargin,
            alignItems: 'center',
          }}
        />
        <View style={{ flex: 1 }} >
          <CategoryList
            params={params}
            reset={this.state.reset}
            categories={
              params.from === 'maps' ?
                this.props.categories
                :
                this.props.categoriesPerks
            }
            setCategories={this.setCategories}
          />
        </View>
        <ButtonGradient onPress={() => this.handlerFilter()} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.filters.categories,
  categoriesPerks: state.filters.categoriesPerks,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  filter: bindActionCreators(filter, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersScreen);