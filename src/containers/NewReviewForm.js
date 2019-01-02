import React, { Component } from 'react';
import ReviewForm from '../components/ReviewForm';
import api from '../api';

export default class NewReviewForm extends Component {
  async handleSubmit(body, tasteRate, foodAmountRate, deliveryRate, formData) {
    // storeId를 프랍으로 받아와야 함
    const { storeId, history } = this.props;

    await api.post(`/restaurants/api/${storeId}/review/`, {
      comment: body,
      rating_delivery: tasteRate,
      rating_quantity: foodAmountRate,
      rating_taste: deliveryRate,
      review_images: formData,
    });
    history.push(`/store/${storeId}`);
  }
  render() {
    const { storeId } = this.props;
    return (
      <ReviewForm
        storeId={storeId}
        onSubmit={(body, tasteRate, foodAmountRate, deliveryRate, formData) =>
          this.handleSubmit(
            body,
            tasteRate,
            foodAmountRate,
            deliveryRate,
            formData
          )
        }
      />
    );
  }
}
