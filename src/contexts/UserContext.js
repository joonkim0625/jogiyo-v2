import React, { Component } from 'react';
import api from '../api';
const { Provider, Consumer } = React.createContext();

export default class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      login: this.login.bind(this),
      logout: this.logout.bind(this),
      register: this.register.bind(this),

      username: '',
      password: '',
      passwordConfirm: '',
      phoneNumber: '',
      nickName: '',
      success: false,
    };
  }

  async componentDidMount() {
    // 토큰이 있으면 할 일
    if (localStorage.getItem('token')) {
      const {
        data: {
          username,
          password,
          phoneNumber: phone_number,
          nickName: nick_name,
        },
      } =
        // username에 해당하는 user 정보 객체를 가져온다.
        await api.get(`/members/api/${username}/user/`, {
          params: {
            username,
          },
        });

      this.setState({
        isLogin: true,
      });
    }
  }
  // 회원 가입
  async register({ ...value }) {
    const { username, password, phoneNumber, nickName } = value;
    // 중복 아이디 체크
    // 사용자 이름 중복체크
    // 사용자가 입력한 username(이메일 주소)와
    // DB에서 가져온 모든 user의 username 중 일치하는 데이터가 있을 경우,
    // 응답으로 온 users의 길이가 0보다 크므로
    const { data: users } = await api.get(`/members/api/user`, {
      params: {
        username,
      },
    });
    console.log(users);
    if (users.length > 0) {
      alert('이미 사용중인 이름입니다.');
    }

    // 새로운 유저 인스턴스 생성
    await api.post('members/api/user/', {
      username,
      password,
      phone_number: phoneNumber,
      nick_name: nickName,
    });
    alert('성공적으로 생성');

    //TODO: 중복 아이디일 경우, 모달 띄우기
  }

  async login(username, password) {
    const res = await api.post(`/api-token-auth/ `, {
      username,
      password,
    });
    localStorage.setItem('token', res.data.token);
    this.setState({
      isLogin: true,
    });
  }

  logout() {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('token');

    // 사용자 정보 캐시 초기화
    this.setState({
      isLogin: false,
      username: '',
      phoneNumber: '',
      nickName: '',
    });
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withUser(WrappedComponent) {
  return function WithUser(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  };
}

export { UserProvider, Consumer as UserConsumer, withUser };
