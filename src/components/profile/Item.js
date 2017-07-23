import
React,
{ PureComponent, } from 'react'; import PropTypes from 'prop-types';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import {
  fonts,
  colors,
  metrics
} from '../../themes';

export default class Item extends PureComponent {

  static propTypes = {
    number: PropTypes.string,
    text: PropTypes.string,
  };

  static defaultProps = {
    number: "0",
    text: "",
  };

  render() {
    return (
      <View style={style.container}>
        <Text style={fonts.style.t27} >
          {this.props.number}
        </Text>
        <Text style={[
          fonts.style.t13,
          { textAlign: 'center' }
        ]}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: metrics.baseMargin,
  },
});

