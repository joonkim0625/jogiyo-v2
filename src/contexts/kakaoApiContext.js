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
      click: false,
      handleClick: this.handleClick.bind(this),
    };
    this.handleGpsClick = this.handleGpsClick.bind(this);
  }
  handleClick() {
    this.setState({
      click: true,
    });
  }

  async componentDidMount() {
    const handleSetState = this.handleSetState;
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function(position) {
          handleSetState(position.coords.longitude, position.coords.latitude);
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
  }

  handleSetState = (longitude, latitude) => {
    this.setState({ locationX: longitude, locationY: latitude });
  };
  handleGpsClick = async e => {
    e.preventDefault();
    // console.log(this.state.locationX, this.state.locationY);
    const res = await api.get(
      'https://dapi.kakao.com//v2/local/geo/coord2address.json',
      {
        params: {
          x: this.state.locationX,
          y: this.state.locationY,
        },
      }
    );

    // console.log(res.data);
    // console.log(res.data.documents[0].address.region_1depth_name);
    // console.log(res.data.documents[0].address.region_2depth_name);
    // console.log(res.data.documents[0].address.region_3depth_name);
    const location = {
      x: this.state.locationX,
      y: this.state.locationY,
    };
    const addr = res.data.documents[0].address;
    const addrString = {
      firstRegion: addr.region_1depth_name,
      secondRegion: addr.region_2depth_name,
      thirdRegion: addr.region_3depth_name,
    };

    sessionStorage.setItem('location', JSON.stringify(location));
    sessionStorage.setItem('addrString', JSON.stringify(addrString));
    this.setState({ addrString: JSON.parse(sessionStorage.addrString) });
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
