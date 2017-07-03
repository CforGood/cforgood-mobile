import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';
import { connect } from 'react-redux';

import {
  styles,
  colors,
  metrics,
} from '../../themes';
import Background from '../../components/common/Background';
import ButtonGradiantRadius from '../../components/common/ButtonGradiantRadius'
import AssociationSelect from '../../components/Association/AssociationSelect';
import { associations } from '../../dummyData/index';
 
class AssociationListScreen extends Component {

  _keyExtractor = (item) => item.id;

  render() {
    return (
      <Background
        style={{
          flex: 1,
        }}>
        {
          alert(JSON.stringify(this.props.associations))
        }
        <ButtonGradiantRadius
          text={'Soutenir !'}
          styleButton={{
            position: 'absolute',
            left: metrics.deviceWidth / 2 - 60,
            bottom: 55,
            zIndex: 1,
          }}
        />
        <View style={[
          styles.center,
          { height: 70, padding: metrics.baseMargin }
        ]}>
          <Text style={{ fontSize: 25, color: colors.white }}>
            Séléctinnez une association
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <FlatList
            data={this.props.associations}
            keyExtractor={this._keyExtractor}
            contentContainerStyle={[
              styles.wrap,
              {
                paddingHorizontal: metrics.baseMargin,
                paddingTop: metrics.baseMargin
              }
            ]}
            renderItem={({ item }) => (<AssociationSelect
              association={item}
            />
            )}
          />
        </View>
        <View style={[
          styles.center,
          style.button
        ]}>
          <Text style={{ color: colors.gray }}>
            Passer
          </Text>
        </View>
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  associations: state.association.entities,
});

export default connect(mapStateToProps)(AssociationListScreen);


const style = StyleSheet.create({
  button: {
    height: 50,
    padding: metrics.baseMargin,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray
  },
});
