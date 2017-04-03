import React, {
  PropTypes,
  Component,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';
import SelectPicture from '../common/SelectPicture';

export default class ChangePicture extends Component {

  componentDidMount() {
    console.log(this.props.setPrictureSource);
    this.SelectPicture = new SelectPicture({ setPrictureSource: (pictureSource) => this.props.setPrictureSource(pictureSource) });
  }
  
  launchImage = () => {
    this.SelectPicture.launchImage();
  };

  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity 
        onPress={() => { this.launchImage(); }} 
        style={[
            styles.row,
            styles.center,
            style.container,
          ]}
      >
        <Image
          source={require('../../resources/icons/upload.png')}
          style={style.icon}
        />
        <Text
          style={[
            fonts.style.t10,
            {marginLeft:5}
          ]}
        >
          Changer la photo
        </Text>

      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({ 
  container: {
    position: 'absolute', 
    left: 80,
    top: 70,
  },
  icon: {
    width: 30,
    height: 30,
  }
});                               