import React, { Component } from 'react';
import api from '../api';
import ImagePreview from './ImagePreview';

// 아무 상태의 변화가 없으면 함수형 컴포넌트로 생성해보자!
// 근데 결국 점수의 변화를 담아 놓아야 하기 때문에... 클래스형으로 만들어야 한다.
class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      tasteRate: 1,
      foodAmountRate: 1,
      deliveryRate: 1,
      images: [],
      // 이미지 업로드 관련
      content: '',
      files: [],
    };
  }

  componentDidMount() {
    const { tasteRate, foodAmountRate, deliveryRate } = this.props;
    if (tasteRate && foodAmountRate && deliveryRate) {
      this.setState({
        tasteRate,
        foodAmountRate,
        deliveryRate,
      });
    }
  }

  handleFileChange(e) {
    e.persist();
    this.setState(prevState => ({
      files: [...prevState.files, ...e.target.files],
    }));
  }
  async handleImgSubmit() {
    const { storeId } = this.props;
    const { content, files } = this.state;
    const formData = new FormData();
    formData.append('content', content);
    files.forEach((f, index) => {
      formData.append(`file${index}`, f);
    });

    await api.post(`/restaurants/api/${storeId}/review/`, {
      reviewImages: formData,
    });
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
    const {
      tasteRate,
      foodAmountRate,
      deliveryRate,
      content,
      files,
    } = this.state;
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();

            const body = e.target.elements.body.value;
            this.handleImgSubmit();
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
          <input
            hidden
            ref={this.inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={e => this.handleFileChange(e)}
          />
          <button onClick={() => this.inputRef.current.click()}>
            이미지 선택
          </button>
          <div>
            {files.map((f, index) => (
              <ImagePreview file={f} key={index} />
            ))}
          </div>

          <button>작성</button>
        </form>
      </div>
    );
  }
}

export default ReviewForm;
