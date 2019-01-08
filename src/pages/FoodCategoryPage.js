import 'core-js';
import '@babel/polyfill';
import React, { Component } from 'react';

import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import './FoodCategoryPage.scss';
import { withKakao } from '../contexts/kakaoApiContext';

class FoodCategoryPage extends Component {
  render() {
    // 모바일에서 접속 시의 문제로 일단 기능을 주석 처리
    // 초기 접속 시 gps 버튼이 눌리지 않으면 푸드 카테고리를 누를 수 없게 만드는 코드
    // const { click, addrShow } = this.props;

    return (
      <Layout>
        <div className="FoodCategory">
          <div className="FoodCategory__link-wrap">
            {/* {click ? (
              <> */}
            <Link className="FoodCategory__link--all" to="/category">
              전체 보기
            </Link>
            <Link className="FoodCategory__link--alone" to="/category/8">
              1인분 주문
            </Link>
            <Link className="FoodCategory__link--franchise" to="/category/2">
              프랜차이즈
            </Link>
            <Link className="FoodCategory__link--chicken" to="/category/4">
              치킨
            </Link>
            <Link className="FoodCategory__link--pizza" to="/category/1">
              피자/양식
            </Link>
            <Link className="FoodCategory__link--chinese" to="/category/7">
              중식
            </Link>
            <Link className="FoodCategory__link--korean" to="/category/10">
              한식
            </Link>
            <Link className="FoodCategory__link--japanese" to="/category/12">
              일식/돈까스
            </Link>
            <Link className="FoodCategory__link--pig" to="/category/3">
              족발/보쌈
            </Link>
            <Link className="FoodCategory__link--night" to="/category/9">
              야식
            </Link>
            <Link className="FoodCategory__link--snack" to="/category/11">
              분식
            </Link>
            <Link className="FoodCategory__link--cafe" to="/category/5">
              카페/디저트
            </Link>
            {/* </> */}
            {/* ) : (
              <>
                <span
                  className="FoodCategory__link--all"
                  to="/category"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  전체 보기
                </span>
                <span
                  className="FoodCategory__link--alone"
                  to="/category/8"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  1인분 주문
                </span>
                <span
                  className="FoodCategory__link--franchise"
                  to="/category/2"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  프랜차이즈
                </span>
                <span
                  className="FoodCategory__link--chicken"
                  to="/category/4"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  치킨
                </span>
                <span
                  className="FoodCategory__link--pizza"
                  to="/category/1"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  피자/양식
                </span>
                <span
                  className="FoodCategory__link--chinese"
                  to="/category/7"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  중식
                </span>
                <span
                  className="FoodCategory__link--korean"
                  to="/category/10"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  한식
                </span>
                <span
                  className="FoodCategory__link--japanese"
                  to="/category/12"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  일식/돈까스
                </span>
                <span
                  className="FoodCategory__link--pig"
                  to="/category/3"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  족발/보쌈
                </span>
                <span
                  className="FoodCategory__link--night"
                  to="/category/9"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  야식
                </span>
                <span
                  className="FoodCategory__link--snack"
                  to="/category/11"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  분식
                </span>
                <span
                  className="FoodCategory__link--cafe"
                  to="/category/5"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  카페/디저트
                </span>
              </>
            )} */}
          </div>
        </div>
      </Layout>
    );
  }
}

export default withKakao(FoodCategoryPage);
