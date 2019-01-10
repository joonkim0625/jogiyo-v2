import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserReviewView.scss';
import withLoading from '../hoc/WithLoading';
import { UserConsumer } from '../contexts/UserContext';

class UserReviewView extends Component {
  static defaultProps = {
    ownerReplyCount: 0,
    review: [],
  };

  render() {
    const {
      storeId,
      postDelete,
      review,
      ownerReplyCount,
      reviewStar,
      reviewAvg,
      timeDiff,
      tasteAvg,
      deliveryAvg,
      quantityAvg,
      user,
      handleUserReviewPage,
    } = this.props;
    console.log(handleUserReviewPage);

    return (
      <div className="UserReview">
        <div className="UserReview__avg">
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

        <div className="UserReview__count">
          리뷰 <strong>{review.length}</strong>개, 사장님 댓글{' '}
          <strong>{ownerReplyCount}</strong>개
          <UserConsumer>
            {/* 유저컨수머에서 아이디 값을 사용해 표현한 버튼 표시 */}
            {({ id }) => {
              if (id) {
                return (
                  <Link
                    to={{
                      pathname: '/new',
                      state: {
                        storeId,
                      },
                    }}
                  >
                    <button className="UserReview__count__new-review">
                      새 리뷰 작성
                    </button>
                  </Link>
                );
              }
            }}
          </UserConsumer>
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
              <UserConsumer>
                {/* 유저컨수머에서 아이디 값을 사용해 표현한 버튼 표시 */}
                {({ id }) => {
                  if (r.user.id === id) {
                    return (
                      <React.Fragment>
                        <button
                          className="UserReview__content__delete-btn"
                          onClick={() => {
                            postDelete(storeId, r.id);
                            this.props.updateReviewLength();
                          }}
                        >
                          삭제
                        </button>
                        <Link
                          to={{
                            pathname: '/edit',
                            state: {
                              storeId,
                              postId: r.id,
                            },
                          }}
                        >
                          <button className="UserReview__content__edit-btn">
                            수정
                          </button>
                        </Link>
                      </React.Fragment>
                    );
                  }
                }}
              </UserConsumer>
              <div className="UserReview__content__ratings">
                <div>
                  <span className="UserReview__content__stars">
                    {reviewStar(r.rating)}
                  </span>
                  <div className="UserReview__content__star">
                    맛 <strong>★ {Math.trunc(r.rating_taste)}</strong>양{' '}
                    <strong>★ {Math.trunc(r.rating_quantity)}</strong>
                    배달 <strong>★ {Math.trunc(r.rating_delivery)}</strong>
                  </div>
                </div>
              </div>
              <div className="UserReview__content__order">
                {r.menu_summary.map(item => (
                  <span key={item.id}>{item.name + ' '} </span>
                ))}
              </div>
              <img src={r.review_images} alt={r.menu_summary} />
              <p className="UserReview__content__comment">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withLoading(UserReviewView);
