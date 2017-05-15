import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Text, 
  StyleSheet,
  TextInput, 
} from 'react-native';

import Button from '../common/Button';
import {
  styles,
  colors,
  fonts,
  metrics,
} from '../../themes';

class ButtonEmail extends PureComponent {
  render() {
    const { onPress } = this.props;

    return (
      <View style={styles.screen.container}>
        <Text style={[
            fonts.style.textWhite,
            stylesEmail.text,
            fonts.style.h9
          ]}
        > 
          Ou utiliser votre Email :
        </Text>  
        <View style={{
            marginTop: metrics.smallMargin
          }}
        >  
          <Button
            styleButton={stylesEmail.styleButton}
            styleText={{
              color: '#AAAAAA',
              textAlign: 'left',
              fontWeight: 'normal',
              fontSize: fonts.size.regular
            }}
            text={'Email'}
            onPress={onPress}
          />   
        </View> 
      </View>
    );
  }
}

export default ButtonEmail;

ButtonEmail.propTypes = {
  onPress: PropTypes.func.isRequired,
};

ButtonEmail.defaultProps = {
  onPress: () => {},
};


const stylesEmail = StyleSheet.create({ 
  text: {
    marginBottom: metrics.smallMargin,
    textAlign: 'center',
  },
  styleButton:{    
    backgroundColor: colors.white,
  },
});
