import React, {
  PropTypes,
  PureComponent
} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

class LoadingIndicator extends PureComponent {
  render() {
    const { loading } = this.props;
    return (
      loading ? (
        <View style={ styles.loading }>
          <ActivityIndicator
            animating={ true }
            style={ styles.loading }
            size="large"
          />
        </View>
      )
      : 
      null
    )
  }
}

LoadingIndicator.propTypes = {
  loading: PropTypes.bool,
};

LoadingIndicator.defaultProps = {
  loading: false,
};

export default LoadingIndicator;


const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
});
