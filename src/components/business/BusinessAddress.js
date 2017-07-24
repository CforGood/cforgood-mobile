import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import {
  styles,
  fonts,
  metrics,
} from '../../themes';

class BusinessAddress extends Component {

  static propTypes = {
    color: PropTypes.string.isRequired,
    address: PropTypes.object,
  };

  state = {
    distance: '0'
  };

  componentWillMount() {
    if (this.props.address) {
      this.getDistanceFromLatLonInKm(this.props.location, this.props.address);
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address) {
      this.getDistanceFromLatLonInKm(this.props.location, nextProps.address);
    }

  }

  getDistanceFromLatLonInKm(myPosition, address) {

    //const LATITUDE = 44.8450097;
    //const LONGITUDE = -0.5785995;

    //if(address) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(address.latitude - myPosition.latitude);  // deg2rad below
    var dLon = this.deg2rad(address.longitude - myPosition.longitude);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(myPosition.latitude)) * Math.cos(this.deg2rad(address.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    if (parseInt(d) === 0) {
      this.setState({ distance: Math.round(d * 1000) + ' m' });
    }
    else {
      this.setState({ distance: Math.round(d) + ' km' });
    }


    //}

  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  render() {
    return (
      <View style={[
        styles.row,
        { justifyContent: 'flex-end' }
      ]}
      >
        <View style={style.end}>
          <Image
            resizeMode='contain'
            style={[
              {
                height: metrics.deviceHeight / 26.68,
                width: metrics.deviceWidth / 20.84,
                tintColor: this.props.color,
                marginRight: 2
              }
            ]}
            source={require('../../resources/icons/placeholder.png')}
          />
        </View>
        <View style={style.end}>
          {
            this.props.address
            &&
            <Text
              style={[
                fonts.style.bold,
                fonts.style.normal,
              ]}
            >
              à {this.state.distance}
            </Text>
          }

        </View>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  location: state.location.latlng,
});

export default connect(mapStateToProps)(BusinessAddress);

const style = StyleSheet.create({
  end: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

});
