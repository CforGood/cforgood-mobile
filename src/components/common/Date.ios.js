import React,{Component, PropTypes} from 'react';
import {
    DatePickerIOS,
    Dimensions,
    Navigator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

import Modal from '../Modal/WidthRNModal';
import Separator from './Separator';

export default class DateTimePicker extends Component {
  static propTypes = {
    mode: PropTypes.string,
    minimumDate: PropTypes.any,
    maximumDate: PropTypes.any,
  };

  static defaultProps = {
    mode: 'date',
    date: new Date()
  };

  state = {
    visible: false,
    date: new Date()
  };

  setVisiblePopup = () => {
    if(this.props.onDateChange){
      this.props.onDateChange(this.state.date);
    }
  };

  componentWillMount(){
    if(this.props.date){
      this.setState({date: typeof this.props.date === 'string' ? new Date(this.props.date) : this.props.date });
    }
    
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.date != this.state.date){
      this.setState({date: typeof nextProps.date === 'string' ? new Date(nextProps.date) : nextProps.date});
    }
  }

  renderDate() {
    return (
      <View style={[styles.row,styles.center]}>
        <Text style={fonts.style.DateInput} >
        {
          this.state.date.getDate() + ' / '
        }
        {
          (this.state.date.getMonth() + 1) + ' / '
        }
        {
          this.state.date.getFullYear() 
        } 
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View 
        style={{
          height: metrics.inputHeight,
          marginVertical: metrics.smallMargin
        }}
      >
        
        <TouchableOpacity
          onPress={() => this.setVisiblePopup()}
          style={styles.row} 
        >
          <View style={[styles.row,styles.center]}>
            <Text style={fonts.style.DateInput}>{ this.props.text }</Text>
          </View>
          <Separator type={'v'} margin={metrics.smallMargin}/>
          <View 
            style={[styles.row,styles.center]}
          >
            {this.renderDate()}
           
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

