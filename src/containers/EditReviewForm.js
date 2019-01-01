import React, { Component } from 'react';
import api from '../api';
import ReviewForm from '../components/ReviewForm';

export default class EditReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      tasteRate: 1,
      foodAmountRate: 1,
      deliveryRate: 1,
    };
  }

  async componentDidMount() {
    const { storeId, postId } = this.props;
    const {
      data: {
        comment,
        ratingTaste,
        ratingQuantity,
        ratingDelivery,
        // prop으로 이미 받아서.. 밑의 2가지가 필요할까?
        // restaurant,
        // user,
      },
    } = await api.get(`/restaurants/api/${storeId}/review/${postId}/`);

    this.setState({
      body: comment,
      tasteRate: ratingTaste,
      foodAmountRate: ratingQuantity,
      deliveryRate: ratingDelivery,
    });
  }

  async handleSubmit(body, tasteRate, foodAmountRate, deliveryRate) {
    const { storeId, postId, history } = this.props;
    await api.patch(`/restaurants/api/${storeId}/review/${postId}/`, {
      comment: body,
      ratingTaste: tasteRate,
      ratingQuantity: foodAmountRate,
      ratingDelivery: deliveryRate,
    });
    history.push(`/store/${storeId}`);
  }

  render() {
    const { body, tasteRate, foodAmountRate, deliveryRate } = this.state;

    if (!body) {
      return '불러오는 중 입니다...';
    }
    return (
      <ReviewForm
        onSubmit={(body, tasteRate, foodAmountRate, deliveryRate) =>
          this.handleSubmit(body, tasteRate, foodAmountRate, deliveryRate)
        }
        body={body}
        tasteRate={parseInt(tasteRate)}
        foodAmountRate={parseInt(foodAmountRate)}
        deliveryRate={parseInt(deliveryRate)}
      />
    );
  }
}
