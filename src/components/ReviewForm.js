import React, { Component } from 'react';

// 아무 상태의 변화가 없으면 함수형 컴포넌트로 생성해보자!
class ReviewForm extends Component {
  render() {
    return (
      <div>
        {/* onSubmit을 prop으로 받아야 함 위에서 */}
        {/* 여기는 타이틀은 필요없고 바디만 필요하다 */}
        {/* 흠... 먹은 음식을 적는 칸을 만들까? */}
        {/* 이것의 컨테이너를 만들어서... 서버 전송 관련 로직을 작성해야 한다 */}
        {/* 근데 여기에 작성자가 작성한 점수에 대한 상태가 있긴 있어야 할 것 이다. 근데 여기에 없어도 작성자가 마지막에 보낼 때만 적용시키면 되니까 필요 없겠다 */}
        {/* 인풋 또는 select 3개를 작성해서 각 점수에 대해 1~5점 까지 입력 가능하게 하고, 그 입력 값을 post할 때 같이 보내자 */}
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
          <button>작성</button>
        </form>
      </div>
    );
  }
}

export default ReviewForm;
