import React, { Component,  } from 'react'; import PropTypes from 'prop-types';
import { 
  View, 
  ScrollView,
  StyleSheet
} from 'react-native';  
import CategoryItemCircle from './CategoryItemCircle'; 

import {  
  metrics, 
} from '../../themes';

import {  
  categories, 
} from '../../constants/categories';

export default class CategoryList extends Component {
  

  static propTypes = {  
    params: PropTypes.any,
    reset: PropTypes.bool.isRequired
  };

  static defaultProps = {  
    params: PropTypes.any,
    reset: false,
  };

  state = {
    selectedCategory: [],
    categories: categories
  };
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.reset !== this.props.reset){
      this.resetCategory();
    }
  }

  resetCategory() {
    this.setState({selectedCategory: []});
  }

  selectCategory = async (category) => {

    let selectedCategory = this.state.selectedCategory;
    const index =  selectedCategory.indexOf(category.id);

    if( index !== -1 ){
      await this.setState({ 
        selectedCategory: [...selectedCategory.slice(0,index), ...selectedCategory.slice(index+1)]
      });
    }
    else{
      await this.setState({ 
        selectedCategory: [category.id, ...selectedCategory]
      });
    }

    this.props.setCategories(this.state.selectedCategory);
  }

  componentWillMount() {
    if(
      this.props.params && 
      this.props.params.from === 'maps'
    ) {
      this.setState({
        categories: categories.slice(0, categories.length-1),
      })
    }
    
    if(this.props.categories) {
      this.setState({
        selectedCategory: this.props.categories,
      })
    }
  }

  render() {
    return (  
      <View style={{
          alignItems: 'center',
          flexDirection:'row' , 
          flexWrap: 'wrap',
          marginVertical: metrics.doubleBaseMargin,
        }}
      >
      {
        this.state.categories.map((categoryitem, key) => <CategoryItemCircle 
            key={key}
            index={key}
            selected={
              this.state.selectedCategory.length === 0
              ||
              this.state.selectedCategory.indexOf(categoryitem.id) !== -1
            }
            category={categoryitem}
            selectCategory={() => this.selectCategory(categoryitem)}
          />
        )
      }
      </View>
    );
  } 
} 
 