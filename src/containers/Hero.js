import React, { Component } from 'react';
import HeroView from '../components/HeroView';
import { withKakao } from '../contexts/kakaoApiContext';

class Hero extends Component {
  static defaultProps = {
    addrString: {},
  };

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     addrInput: '',
  //     addrShow: '',
  //   };
  // }

  componentDidMount() {
    // const { handleSetGps } = this.props;
    // handleSetGps();
    // let addrInput = JSON.parse(sessionStorage.getItem('addrString'));
    // let addrShow =
    //   addrInput &&
    //   addrInput.firstRegion +
    //     ' ' +
    //     addrInput.secondRegion +
    //     ' ' +
    //     addrInput.thirdRegion;
    // sessionStorage.setItem('addrShow', JSON.stringify(addrShow));
    // this.setState({
    //   addrInput,
    //   addrShow,
    // });
    console.log('히어로');
  }

  render() {
    console.log(this.state);
    const { handleGpsClick } = this.props;
    return <HeroView findMyAddress={handleGpsClick} {...this.state} />;
  }
}

export default withKakao(Hero);
