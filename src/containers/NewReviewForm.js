import React, { Component } from 'react';
import ReviewForm from '../components/ReviewForm';
import api from '../api';

export default class NewReviewForm extends Component {
  async handleSubmit(body) {
    // storeId를 프랍으로 받아와야 함
    const { storeId, history } = this.props;

    await api.post(`/restaurants/api/${storeId}/review/`, {
      comment: body,
      // TODO: 어떻게 입력받을 지 고민
      rating_delivery: 2,
      rating_quantity: 3,
      rating_taste: 1,
    });
    history.push(`/store/${storeId}`);
  }
  render() {
    console.log(this.props.storeId);
    return <ReviewForm onSubmit={body => this.handleSubmit(body)} />;
  }
}
