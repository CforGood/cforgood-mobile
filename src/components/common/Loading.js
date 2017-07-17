import React, {
  PropTypes,
  PureComponent,
} from 'react';

import {
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

import {
  styles,
} from '../../themes';

export default class ModalLoading extends PureComponent {

  static propTypes = {
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false
  };

  render() {
    const { loading } = this.props;
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={loading}
        onRequestClose={() => { alert("Fenetre a été fermé") }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
          <ActivityIndicator
            animating={loading}
            style={styles.activityIndicator}
            size="large"
          />
        </View>
      </Modal>
    );
  }
}