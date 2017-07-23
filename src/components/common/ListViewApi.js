import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';

import {
  ListView,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import LoadingIndicator from './LoadingIndicator';

/**
 *  
List View For Rest API With state local data
 {
   pagination: {
     page: 1,
     perPage: 10,
     pageCount: 10,
     totalCount: 22
   },
   records: [
     { title: 'Title ...', description: 'Description ...' },
     ...
   ]
 }
 */

const exampleResult = {
  pagination: {
    page: 1,
    perPage: 10,
    pageCount: 10,
    totalCount: 22
  },
  records: [
    { title: 'Maison Gegara', description: 'Description ...' },
    { title: 'Maison Gegara', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
    { title: 'Title ...', description: 'Description ...' },
  ]
}

class ListViewApi extends PureComponent {

  static propTypes = {
    renderRow: PropTypes.func.isRequired,
    endpoint: PropTypes.string.isRequired,
    params: PropTypes.any,
  };

  static defaultProps = {
    renderRow: () => { },
    params: null,
  };

  constructor() {
    super();

    this.state = {
      refreshing: true,
      pagination: {},
      data: [],
      ds: new ListView.DataSource({ rowHasChanged: this._rowHasChanged })
    };
  }

  _rowHasChanged = (r1, r2) => {
    return r1 !== r2
  }

  componentWillMount() {
    this._loadData(1);
  }


  _onRefresh = () => {
    this.setState({
      refreshing: true,
    });

    this._loadData(1);

  }

  _onEndReached = () => {
    const { pagination } = this.state
    const { page, perPage, pageCount, totalCount } = pagination
    const lastPage = totalCount <= (page - 1) * perPage + pageCount

    //if (!pagination.loading && !lastPage) {
    if (true) {
      this._loadData(page + 1);
    }
  }

  _getDataRequest = () => {
    const pagination = { ...this.state.pagination, loading: true };
    this._update(pagination);
  }

  _getDataSuccess = (result) => {
    const pagination = { ...result.pagination, loading: false };
    const data = pagination.page === 1 ? result.records : [...this.state.data, ...result.records];

    this._update(pagination, data);
  }

  _getDataFailure = (error) => {
    const pagination = { ...this.state.pagination, loading: false };
    this._update(pagination, this.state.data);
  }

  _loadData = async (page) => {
    this._getDataRequest();

    // await
    /*API
      .getPosts(page)
      .then(result => this._getDataSuccess(result))
      .catch(error => this._getDataFailure(error));*/

    this._getDataSuccess(exampleResult);
  }

  _update(pagination, data = null) {
    const loadingItem = {
      type: 'Loading',
      loading: pagination.loading,
    };
    const dataItems = data || this.state.data;
    this.setState({
      pagination: pagination,
      //data: data,
      refreshing: false,
      ds: this.state.ds.cloneWithRows([...dataItems, loadingItem]),
    });
  }

  _renderRow(row) {
    console.log('rowrow', row);
    if (row.type === 'Loading') {
      return <LoadingIndicator loading={row.loading} />
    } else {
      return this.props.renderRow(row);
    }
  }


  render() {
    return (
      <ListView
        style={styles.container}
        refreshControl={
          <RefreshControl
            tintColor={'black'}
            title="Loading..."
            titleColor={'white'}
            colors={['#ff0000', 'white']}
            progressBackgroundColor={'gray'}
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        dataSource={this.state.ds}
        renderRow={row => this._renderRow(row)}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
        enableEmptySections={true}
        onEndReached={this._onEndReached}
      />
    );
  }
}

export default ListViewApi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
