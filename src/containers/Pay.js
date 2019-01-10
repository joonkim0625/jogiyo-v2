import React, { Component } from 'react';
import PayView from '../components/PayView';
import { withKakao } from '../contexts/kakaoApiContext';

class Pay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: JSON.parse(sessionStorage.cart),
    };
  }

  render() {
    console.log(this.state.list);
    const { list } = this.state;
    return (
      <div>
        <PayView list={list} key={this.state.list.length} />
      </div>
    );
  }
}

export default withKakao(Pay);
