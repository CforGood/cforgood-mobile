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
import { categories, } from '../constants/categories';
import CategoryList from '../components/category/CategoryList';

import { update, reset } from '../redux/actions/filters';
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
    console.log('this.props.categories', this.props.categories)
    this.setState({ selectedCategories: this.props.categories });
  }

  renderRight() {
    return (
      <TouchableOpacity 
        onPress={() => this.setState({reset: !this.state.reset})}
      >
        <Text style={fonts.style.normal}>
          Tout réinitialiser
        </Text>
      </TouchableOpacity>
    )
  }

  handlerFilter = () => {
    if(this.state.reset === true) {
      this.props.update([]);
    } else {
      this.props.update(this.state.selectedCategories);
    }
    
    //this.props.filter(this.state.selectedCategories , this.props.businesses);
    this.props.navigation.goBack();
  }


  
  setCategories = (selectedCategories) => {
    console.log('selectedCategories', selectedCategories)
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
            categories={this.props.categories}
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
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  update: bindActionCreators(update, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersScreen);