import React from 'react';
import { Platform , Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';

const options = {
  title: null,
  storageOptions: {
    skipBackup: true,
  },
  mediaType: 'photo',
};

export default class SelectPicture extends  React.Component {

  componentWillMount() {
    Permissions.getPermissionStatus('photo', 'always')
      .then(response => {
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        //this.setState({ locationPermission: response });
        if (response !== 'authorized') {
          this._requestPermission();
          //Permissions.openSettings
        }
    });
  }

  _requestPermission = () => {
    Permissions.requestPermission('photo', 'always')
      .then(response => {

        if (response !== 'authorized') {
          Permissions.openSettings
        }
        //this.setState({ locationPermission: response });
      }).catch(e => console.log(e))
  }

  launchImage() {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if(response.fileSize < 2000000){
          if (Platform.OS === 'ios') {
            this.props.setPrictureSource(response.uri.replace('file://', ''));
          } else {
            this.props.setPrictureSource(response.uri);
          }
        }
        else{
          Alert.alert(
            'Erreur',
            'Taille Maximale de l\'image 20 MO',
            [
              {text: 'Fermer', onPress: () => {}},
            ]
          );
        }
        
      }
    });
  }

  render() {
    return null;
  }
};
