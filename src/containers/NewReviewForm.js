import React, { Component } from 'react';
import ReviewForm from '../components/ReviewForm';
import api from '../api';

export default class NewReviewForm extends Component {
  async handleSubmit(body, tasteRate, foodAmountRate, deliveryRate) {
    // storeId를 프랍으로 받아와야 함
    const { storeId, history } = this.props;

    await api.post(`/restaurants/api/${storeId}/review/`, {
      comment: body,
      // TODO: 어떻게 입력받을 지 고민
      rating_delivery: tasteRate,
      rating_quantity: foodAmountRate,
      rating_taste: deliveryRate,
    });
    history.push(`/store/${storeId}`);
  }
  render() {
    return (
      <ReviewForm
        onSubmit={(body, tasteRate, foodAmountRate, deliveryRate) =>
          this.handleSubmit(body, tasteRate, foodAmountRate, deliveryRate)
        }
      />
    );
  }
}
