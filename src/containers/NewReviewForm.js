import React, { Component } from 'react';
import ReviewForm from '../components/ReviewForm';
import api from '../api';

export default class NewReviewForm extends Component {
  async handleSubmit(body) {
    // storeId를 프랍으로 받아와야 함
    const res = await api.post(`/restaurants/api/${storeId}/review/`, {
      comment: body,
    });
  }
  render() {
    return <ReviewForm onSubmit={body => this.handleSubmit(body)} />;
  }
}
