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
  fonts,
} from '../../themes';
import Header from '../../components/common/Header';
import Background from '../../components/common/Background';

import Button from '../../components/common/ButtonGradiant';
import ButtonGradiantRadius from '../../components/common/ButtonGradiantRadius'
import AssociationSelect from '../../components/Association/AssociationSelect';
import { associations } from '../../dummyData/index';

class AssociationListScreen extends Component {

  _keyExtractor = (item) => item.id;

  render() {
    return (
      <View style={styles.screen.mainContainer} >
        <Header
          text={'Séléctinnez une association'}
          type={'gradiant'}
          style={{
            paddingHorizontal: metrics.marginApp
          }}
          onClose={() => this.props.navigation.goBack()}
        />
        <ButtonGradiantRadius
          text={'Soutenir !'}
          styleButton={{
            position: 'absolute',
            left: metrics.deviceWidth / 2 - 60,
            bottom: 55,
            zIndex: 1,
          }}
        />
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
            renderItem={({ item, index }) => (<AssociationSelect
              association={item}
              index={index}
            />
            )}
          />
        </View>
        <Button
          onPress={() => { }}
          type={'simple'}
          style={{
            backgroundColor: 'white'
          }}
          styleText={{
            color: colors.ignore,
            ...fonts.style.t15,
          }}
          text={'Passer'}
        />
      </View>
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
