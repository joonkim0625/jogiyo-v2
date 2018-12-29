import React, { Component } from 'react';

// 아무 상태의 변화가 없으면 함수형 컴포넌트로 생성해보자!
class ReviewForm extends Component {
  render() {
    return (
      <div>
        {/* onSubmit을 prop으로 받아야 함 위에서 */}
        {/* 여기는 타이틀은 필요없고 바디만 필요하다 */}
        {/* 흠... 먹은 음식을 적는 칸을 만들까? */}
        <form
          onSubmit={e => {
            e.preventDefault();

            const body = e.target.elements.body.value;
            this.props.onSubmit(body);
          }}
        >
          <textarea
            name="body"
            cols="30"
            rows="10"
            // 수정 버튼이 눌렸을 때 받는 body 값. edit할 때 넘어와야 한다
            defaultValue={this.props.body}
          />
        </form>
      </div>
    );
  }
}

export default ReviewForm;
