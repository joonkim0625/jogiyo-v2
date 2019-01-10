import React, { Component } from 'react';
import Layout from '../components/Layout';
import StoreList from '../containers/StoreList';

export default class StoreListPage extends Component {
  render() {
    const { match, history, location } = this.props;
    const categoryId = match.params.id;

    // const p = new URLSearchParams(location.pathname);
    // const helloCategory = p.get('category');

    return (
      <Layout>
        <StoreList
          key={location.pathname + location.search}
          categoryId={categoryId}
          history={history}
          location={location}
        />
      </Layout>
    );
  }
}
