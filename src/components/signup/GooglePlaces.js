import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Button from '../common/ButtonGradiant'; 
import Header from '../common/Header';
import Modal from '../Modal';

import { businessType, perkType } from '../../types';
import { GooglePlacesAPI } from '../../config.json'

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class GooglePlace extends PureComponent { 

  static defaultProps = { 
    visible: true,
  };


  render() {
    const { onClose, onValidate, visible, business, perk } = this.props;

    return (
      <Modal
        onClose={onClose}
        animationType={'none'}
        blurType={'xlight'}
        visible={visible}
      > 
        <View style={styles.screen.mainContainer}>
          <Header
            onClose={onClose}
            back={'-90deg'}
          />
          <GooglePlacesAutocomplete
            placeholder='Taper votre Code Postal'
            minLength={2} // minimum length of text to search
            autoFocus={true}
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // display street only
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              this.props.onSelectCity(details)
            }}
            getDefaultValue={() => {
              return ''; // text input default value
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: GooglePlacesAPI,
              language: 'fr', // language of the results
              types: 'geocode', // default: 'geocode'
            }}
            styles={googlePlacesStyle}
            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} 

            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          />
        </View>      
      </Modal>
    );
  }
}

export default GooglePlace;



const googlePlacesStyle = {
  listView: {
    backgroundColor: 'white',
  },
  textInputContainer: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth:0,
    height: metrics.inputHeight,
    paddingLeft: metrics.marginApp,
  },
  textInput: {
    marginTop: 0,
    paddingTop: 0,
    marginLeft: 0,
    paddingLeft: 0,
    marginBottom: 0,
    paddingBottom: 0,
    height: metrics.inputHeight,
    color: colors.darkGray,
    fontFamily: fonts.type.base,
    fontSize: 24,
  },
  description: {
    fontFamily: fonts.type.base,
    fontSize: 18,
    color: colors.darkGray,
    height: metrics.inputHeight,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  poweredContainer: {
    opacity: 0,
    height: 0,
  }
}

