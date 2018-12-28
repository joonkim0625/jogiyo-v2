import React, { Component } from 'react';
import './UserReviewView.scss';
import withLoading from '../hoc/WithLoading';

class UserReviewView extends Component {
  static defaultProps = {
    review: [
      // {
      //   "id": 6153,
      //   "comment": "죄송합니다",
      //   "rating": 2,
      //   "ratingDelivery": "1.0",
      //   "ratingQuantity": "2.0",
      //   "ratingTaste": "3.0",
      //   "reviewImages": null,
      //   "time": "2018-12-28T17:19:16.248041+09:00",
      //   "user": {
      //     "id": 12,
      //     "username": "hello",
      //     "password": "pbkdf2_sha256$120000$r9SDy5XIoHkK$uQpsysG8UqZB6c1pMAK9VTefM2J1djffvyUuk6ifLKk=",
      //     "email": "",
      //     "phoneNumber": "+82100001110",
      //     "nickName": ""
      //   },
      //   "menuSummary": [],
      //   "restaurant": 12
      // },
    ],
  };

  render() {
    const {
      review,
      ownerReplyCount,
      reviewStar,
      reviewAvg,
      timeDiff,
      tasteAvg,
      deliveryAvg,
      quantityAvg,
      user,
    } = this.props;
    console.log(review);
    console.log(review.menuSummary);

    return (
      <div className="UserReview">
        <div className="UserReview__avg">
          {/* 점수의 평균을 구하는 법을 알아야 한다 */}
          {/* 점수에 따라 별의 개수를 표현 */}
          <div className="UserReview__avg__sum">
            <p>{parseFloat(reviewAvg).toFixed(1)}</p>
            <p>{reviewStar(reviewAvg)}</p>
          </div>
          <div className="UserReview__avg__mini">
            <p className="UserReview__avg__mini__item">
              <span>맛</span>
              <span>
                {reviewStar(tasteAvg)} {parseFloat(tasteAvg).toFixed(1)}
              </span>
            </p>
            <p className="UserReview__avg__mini__item">
              <span>양</span>
              <span>
                {reviewStar(quantityAvg)} {parseFloat(quantityAvg).toFixed(1)}
              </span>
            </p>
            <p className="UserReview__avg__mini__item">
              <span>배달</span>
              <span>
                {reviewStar(deliveryAvg)} {parseFloat(deliveryAvg).toFixed(1)}
              </span>
            </p>
          </div>
        </div>
        {/* 어떻게 구해야 할까 */}
        <div className="UserReview__count">
          리뷰 <strong>{review.length}</strong>개, 사장님 댓글{' '}
          <strong>{ownerReplyCount}</strong>개
        </div>
        <div>
          {review.map(r => (
            <div className="UserReview__content" key={r.id}>
              <span className="UserReview__content__name">
                {r.user.username}
              </span>

              <span className="UserReview__content__time">
                {timeDiff(r.time)}
              </span>
              <div className="UserReview__content__ratings">
                {/* 소수점 이하는 버리면 된다. */}
                <div>
                  <span className="UserReview__content__stars">
                    {reviewStar(r.rating)}
                  </span>
                  <div className="UserReview__content__star">
                    맛 <strong>★ {Math.trunc(r.ratingTaste)}</strong>양{' '}
                    <strong>★ {Math.trunc(r.ratingQuantity)}</strong>
                    배달 <strong>★ {Math.trunc(r.ratingDelivery)}</strong>
                  </div>
                </div>
              </div>
              <div className="UserReview__content__order">
                {r.menuSummary.map(item => (
                  <span key={item.id}>{item.name + ' '} </span>
                ))}
              </div>
              <p className="UserReview__content__comment">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withLoading(UserReviewView);
