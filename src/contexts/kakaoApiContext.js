import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
  headers: { Authorization: 'KakaoAK 1a72ca0688a79816a4a07debdf9bc661' },
});
// https://dapi.kakao.com//v2/local/geo/coord2address.json

const { Provider, Consumer } = React.createContext();

export default class KakaoApiProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      locationX: 0,
      locationY: 0,

      handleGpsClick: this.handleGpsClick,
      addrString: {},
      addrShow: '',
      click: false,
    };
    this.handleGpsClick = this.handleGpsClick.bind(this);

    this.handleToSession = this.handleToSession.bind(this);
  }

  handleSetState = (longitude, latitude) => {
    this.setState({ locationX: longitude, locationY: latitude });
  };

  handleToSession(longitude, latitude) {
    this.setState({
      locationX: longitude,
      locationY: latitude,
    });
    const location = {
      x: longitude,
      y: latitude,
    };

    sessionStorage.setItem('location', JSON.stringify(location));
  }

  componentDidMount() {
    const handleToSession = this.handleToSession;

    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function(position) {
          handleToSession(position.coords.longitude, position.coords.latitude);
        },
        function(error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert('GPS를 지원하지 않습니다');
    }

    if (JSON.parse(sessionStorage.getItem('addrShow'))) {
      this.setState({
        addrShow: JSON.parse(sessionStorage.addrShow),
      });
    }

    // 컴포넌트가 렌더되었을 때 주소 문자열 값을 자연스럽게 받아오게 하고 싶어서 시도했던 코드
    // 로케이션 받아오는 속도보다 밑의 코드 실행이 먼저되어 작동이 안됨
    // const res = await api.get(
    //   'https://dapi.kakao.com//v2/local/geo/coord2address.json',
    //   {
    //     params: {
    //       x: this.state.locationX,
    //       y: this.state.locationY,
    //     },
    //   }
    // );
    // const location = { x: this.state.locationX, y: this.state.locationY };
    // const addr = res.data.documents[0].address;
    // const addrString = {
    //   firstRegion: addr.region_1depth_name,
    //   secondRegion: addr.region_2depth_name,
    //   thirdRegion: addr.region_3depth_name,
    // };

    // sessionStorage.setItem('location', JSON.stringify(location));
    // sessionStorage.setItem('addrString', JSON.stringify(addrString));
    // this.setState({ addrString: JSON.parse(sessionStorage.addrString) });

    // let addrInput = JSON.parse(sessionStorage.getItem('addrString'));

    // let addrShow =
    //   addrInput &&
    //   addrInput.firstRegion +
    //     ' ' +
    //     addrInput.secondRegion +
    //     ' ' +
    //     addrInput.thirdRegion;
    // sessionStorage.setItem('addrShow', JSON.stringify(addrShow));
  }

  // getXY() {
  //   if (JSON.parse(sessionStorage.getItem('location'))) {
  //     const res = api.get(
  //       'https://dapi.kakao.com//v2/local/geo/coord2address.json',
  //       {
  //         params: {
  //           x: this.state.locationX,
  //           y: this.state.locationY,
  //         },
  //       }
  //     );
  //     const location = { x: this.state.locationX, y: this.state.locationY };
  //     const addr = res.data.documents[0].address;
  //     const addrString = {
  //       firstRegion: addr.region_1depth_name,
  //       secondRegion: addr.region_2depth_name,
  //       thirdRegion: addr.region_3depth_name,
  //     };

  //     sessionStorage.setItem('location', JSON.stringify(location));
  //     sessionStorage.setItem('addrString', JSON.stringify(addrString));
  //     this.setState({ addrString: JSON.parse(sessionStorage.addrString) });

  //     let addrInput = JSON.parse(sessionStorage.getItem('addrString'));

  //     let addrShow =
  //       addrInput &&
  //       addrInput.firstRegion +
  //         ' ' +
  //         addrInput.secondRegion +
  //         ' ' +
  //         addrInput.thirdRegion;
  //     sessionStorage.setItem('addrShow', JSON.stringify(addrShow));
  //   }
  //   // this.setState({
  //   //   addrInput,
  //   //   addrShow,
  //   // });
  // }
  async componentDidUpdate(prevState) {
    if (this.state.locationIn === 0) {
      const res = await api.get(
        'https://dapi.kakao.com//v2/local/geo/coord2address.json',
        {
          params: {
            x: this.state.locationX,
            y: this.state.locationY,
          },
        }
      );

      const location = { x: this.state.locationX, y: this.state.locationY };
      const addr = res.data.documents[0].address;
      const addrString = {
        firstRegion: addr.region_1depth_name,
        secondRegion: addr.region_2depth_name,
        thirdRegion: addr.region_3depth_name,
      };
      sessionStorage.setItem('location', JSON.stringify(location));
      sessionStorage.setItem('addrString', JSON.stringify(addrString));
      this.setState({ addrString: JSON.parse(sessionStorage.addrString) });
      let addrInput = JSON.parse(sessionStorage.getItem('addrString'));
      let addrShow =
        addrInput &&
        addrInput.firstRegion +
          ' ' +
          addrInput.secondRegion +
          ' ' +
          addrInput.thirdRegion;
      sessionStorage.setItem('addrShow', JSON.stringify(addrShow));
    }
  }

  handleGpsClick = async e => {
    e.preventDefault();

    const res2 = await api.get(
      'https://dapi.kakao.com//v2/local/geo/coord2address.json',
      {
        params: {
          x: this.state.locationX,
          y: this.state.locationY,
        },
      }
    );

    const location = { x: this.state.locationX, y: this.state.locationY };
    const addr = res2.data.documents[0].address;
    const addrString = {
      firstRegion: addr.region_1depth_name,
      secondRegion: addr.region_2depth_name,
      thirdRegion: addr.region_3depth_name,
    };

    sessionStorage.setItem('location', JSON.stringify(location));
    sessionStorage.setItem('addrString', JSON.stringify(addrString));

    let addrInput = JSON.parse(sessionStorage.getItem('addrString'));

    let addrShow =
      addrInput &&
      addrInput.firstRegion +
        ' ' +
        addrInput.secondRegion +
        ' ' +
        addrInput.thirdRegion;
    sessionStorage.setItem('addrShow', JSON.stringify(addrShow));
    this.setState({
      addrString: JSON.parse(sessionStorage.addrString),
      addrShow: JSON.parse(sessionStorage.addrShow),
    });
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withKakao(WrappedComponent) {
  return function(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  };
}

export { KakaoApiProvider, Consumer as KakaoApiConsumer, withKakao };
