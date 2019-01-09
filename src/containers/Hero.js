import React, { Component } from 'react';
import HeroView from '../components/HeroView';
import { withKakao } from '../contexts/kakaoApiContext';

class Hero extends Component {
  static defaultProps = {
    addrString: {},
    addrShow: '',
  };

  render() {
    console.log(this.state);
    const { handleGpsClick, addrShow } = this.props;
    return <HeroView findMyAddress={handleGpsClick} addrShow={addrShow} />;
  }
}

export default withKakao(Hero);
