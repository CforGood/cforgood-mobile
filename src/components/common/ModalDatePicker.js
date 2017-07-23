import PropTypes from 'prop-types'; import React, {  Component, } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  DatePickerIOS
} from 'react-native';

import Modal from '../Modal';


import {
  colors,
  fonts,
  metrics,
} from '../../themes';

class ModalDatePicker extends Component {

  static propTypes = {
    mode: PropTypes.string,
    minimumDate: PropTypes.any,
    maximumDate: PropTypes.any,
    onDateChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  };

  static defaultProps = {
    mode: 'date',
    date: new Date(),
    text: 'Sélectionner la Date'
  };

  state = {
    date: new Date()
  };

  chooseDate = () => {
    if (this.props.onDateChange) {
      this.props.onDateChange(this.state.date);
    }

  };

  onDateChange = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType={'slide'}
        blurType={'dark'}
        blurAmount={3}
        onClose={() => { }}
      >
        <TouchableOpacity onPress={this.props.onClose} style={{ flex: 1 }}>
          <View />
        </TouchableOpacity>
        <View style={{ flex: 1, backgroundColor: 'white' }}>

          <TouchableOpacity
            onPress={() => this.chooseDate()}
            style={style.row}
          >
            <Text style={style.title}>{this.props.text}</Text>
          </TouchableOpacity>

          <DatePickerIOS
            textColor={colors.darkGray}
            date={this.state.date}
            mode={this.props.mode}
            maximumDate={this.props.maximumDate || null}
            minimumDate={this.props.minimumDate || null}
            minuteInterval={30}
            onDateChange={(value) => this.onDateChange(value)}
            style={{ height: 200 }}
          />
        </View>
      </Modal>
    );
  }
}

export default ModalDatePicker;


const style = StyleSheet.create({
  row: {
    height: 44,
    justifyContent: 'center',
    borderBottomColor: colors.separatorText,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: fonts.size.t17,
    fontWeight: '500',
    marginHorizontal: metrics.marginApp,
  },
}); 
