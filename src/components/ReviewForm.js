import React, { Component } from 'react';

// 아무 상태의 변화가 없으면 함수형 컴포넌트로 생성해보자!
// 근데 결국 점수의 변화를 담아 놓아야 하기 때문에... 클래스형으로 만들어야 한다.
class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasteRate: 1,
      foodAmountRate: 1,
      deliveryRate: 1,
    };
  }
  handleTasteRateChange(e) {
    this.setState({
      tasteRate: parseInt(e.target.value),
    });
  }
  handleFoodAmountRateChange(e) {
    this.setState({
      foodAmountRate: parseInt(e.target.value),
    });
  }
  handleDeliveryRateChange(e) {
    this.setState({
      deliveryRate: parseInt(e.target.value),
    });
  }

  render() {
    const rating = [1, 2, 3, 4, 5];
    const { tasteRate, foodAmountRate, deliveryRate } = this.state;
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

            this.props.onSubmit(body, tasteRate, foodAmountRate, deliveryRate);
          }}
        >
          <div>
            <span>맛</span>
            <select
              value={tasteRate}
              onChange={e => this.handleTasteRateChange(e)}
            >
              {rating.map((r, index) => (
                <option value={r} key={index}>
                  {r}
                </option>
              ))}
            </select>
            <span>양</span>
            <select
              value={foodAmountRate}
              onChange={e => this.handleFoodAmountRateChange(e)}
            >
              {rating.map((r, index) => (
                <option value={r} key={index}>
                  {r}
                </option>
              ))}
            </select>
            <span>배달</span>
            <select
              value={deliveryRate}
              onChange={e => this.handleDeliveryRateChange(e)}
            >
              {rating.map((r, index) => (
                <option value={r} key={index}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <textarea
            name="body"
            cols="30"
            rows="10"
            defaultValue={
              this.props.body // 수정 버튼이 눌렸을 때 받는 body 값. edit할 때 넘어와야 한다
            }
            required
          />
          <button>작성</button>
        </form>
      </div>
    );
  }
}

export default ReviewForm;
