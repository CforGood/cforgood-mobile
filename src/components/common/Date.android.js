
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';
import Separator from './Separator';

export default class DateTimePicker extends Component {
  static propTypes = {
    mode: PropTypes.string,
    onDateChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    mode: 'date',
    date: new Date(),
    minimumDate: PropTypes.any,
    maximumDate: PropTypes.any,
  };

  state = {
    date: new Date()
  };

  componentWillMount() {
    if (this.props.date) {
      this.setState({ date: typeof this.props.date === 'string' ? new Date(this.props.date) : this.props.date });
    }

  }

  ComponentWillReceiveProps(nextProps) {
    if (nextProps.date != this.state.date) {
      this.setState({ date: typeof nextProps.date === 'string' ? new Date(nextProps.date) : nextProps.date });
    }
  }


  showDatePicker = async () => {
    let newDate = this.state.date;

    const objDate = {
      date: this.state.date,
    };

    if (this.props.maximumDate) {
      objDate.maxDate = this.props.maximumDate;
    }

    if (this.props.minimumDate) {
      objDate.minDate = this.props.minimumDate;
    };

    await DatePickerAndroid.open({
      objDate
    })
      .then(function (date) {
        if (date.action !== DatePickerAndroid.dismissedAction) {
          newDate = new Date(date.year, date.month, date.day);
        }
      });


    this.showTimePicker(newDate);

  }

  showTimePicker = async (date) => {
    let newTime = date;
    if (this.props.mode === 'datetime') {
      await TimePickerAndroid.open({ is24Hour: true })
        .then(function (time) {
          if (time.action !== TimePickerAndroid.dismissedAction) {

            newTime.setHours(time.hour);
            newTime.setMinutes(time.minute);

          }
        });
    }

    this.onDateChange(newTime);
  }

  onDateChange = (date) => {
    //this.setState({ date });

    this.props.onDateChange(date);
  }

  renderDate(text) {
    return (
      <View style={[styles.row, styles.center]}>
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
          onPress={() => this.showDatePicker()}
          style={styles.row}
        >
          <View style={[styles.row, styles.center]}>
            <Text style={fonts.style.DateInput}>{this.props.text}</Text>
          </View>
          <Separator type={'v'} margin={metrics.smallMargin} />
          <View
            style={[styles.row, styles.center]}
          >
            {this.renderDate()}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};