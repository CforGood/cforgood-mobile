import React, { Component,  } from 'react'; import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';

import {
  colors,
  metrics,
} from '../../themes';

import { associationType } from '../../types';
import AssociationItem from './AssociationItem';

const HEADER_SCROLL_DISTANCE = metrics.marginApp;

class AssociationList extends Component {

  static propTypes = {
    associations: PropTypes.arrayOf(associationType),
  };

  state = {
    scrollY: new Animated.Value(0),
  };

  goToAssociation(association) {
    this.props.navigation.navigate('AssociationDetail', { association });
  }

  render() {
    const heightSeparator = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 3],
      extrapolate: 'clamp',
    });

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{
              nativeEvent: { contentOffset: { y: this.state.scrollY } }
            }]
          )}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
          style={{
            paddingHorizontal: metrics.marginApp
          }}
        >
          {
            this.props.associations &&
            this.props.associations.map((association, key) =>
              association.picture &&
              <View
                style={[
                  style.associationContainer,
                  {
                    alignItems: key % 2 ? 'flex-end' : 'flex-start'
                  }
                ]}
                key={key}
              >
                <AssociationItem association={association} />
              </View>
            )
          }
        </Animated.ScrollView>
        <Animated.View
          style={[
            style.header,
            {
              height: heightSeparator,
            }
          ]}
        />
      </View>
    );
  }
}


export default withNavigation(AssociationList);

const style = {
  associationContainer: {
    width: metrics.deviceWidth / 2 - metrics.marginApp,
    height: 229,
    marginVertical: metrics.smallMargin,
    backgroundColor: 'transparent',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: colors.blueAssociation,
  },
}; 
