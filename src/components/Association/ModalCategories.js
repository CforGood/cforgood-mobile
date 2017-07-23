import PropTypes from 'prop-types'; import React, {  Component, } from 'react';

import {
  View,
  Text,
  Image, 
  StyleSheet,
  ListView,
  TouchableOpacity
} from 'react-native';

import ApiHandler from '../../utils/api';
import Modal from '../Modal';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class ModalPicker extends Component { 
  
  state = {
    dataSource: ds.cloneWithRows([])
  };
 

  componentWillMount() {
    this.getCategories();
  }

  getCategories() {

    ApiHandler.cause_categories()
    .then(response => {  
      if(!response.error){
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows( response ),
        });
      }
    })
    .catch(message => {
      alert(message.error)
    });
    
  }
  
  _renderRow = (obj) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.onChange(obj)}
        style={style.row}
      >
        <Text style={style.title}>{obj.name}</Text>
      </TouchableOpacity>
    )
  }

  render() { 
    return ( 
      <Modal
        visible={this.props.visible}
        animationType={'slide'}
        blurType={'dark'}
        blurAmount={3}
        onClose={this.props.onClose}
      > 
        <TouchableOpacity onPress={this.props.onClose} style={{flex: 1}}>
          <View/>
        </TouchableOpacity>
        <View style={styles.screen.mainContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            enableEmptySections={true}
          />
        </View> 
      </Modal>    
    );
  }
}

export default ModalPicker;


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
}); 
