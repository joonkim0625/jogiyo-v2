import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SideCartView.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';

export default class SideCartView extends Component {
  static defaultProps = {
    orderList: [],
  };
  constructor(props) {
    super(props);

    //  props로부터 state를 계산해내고 싶은 경우, 생성자에서 해당 작업을 해주면 된다.
    // 다만, props가 단 한번만 내려올 때만 이 방식이 가능하다.

    const { orderList } = props;
    const foodInCart = orderList.map(o => {
      const {
        quantity,
        id,
        name,
        storeName,
        storeId,
        ordered,
        price,
        deliveryFee,
        minAmount,
      } = o;

      return {
        id,
        name,
        quantity,
        storeName,
        price,
        storeId,
        ordered,
        deliveryFee,
        totalPrice: quantity * price,
        minAmount,
      };
    });

    this.state = { foodInCart };
  }

  handleToMenu() {
    sessionStorage.setItem('cart', JSON.stringify(this.state.foodInCart));
  }
  handleToPay() {
    sessionStorage.setItem('cart', JSON.stringify(this.state.foodInCart));
  }
  handleQuantityPlus(id, price) {
    const { foodInCart } = this.state;
    const newFoodInCart = foodInCart.map(f => {
      if (f.id === id) {
        f.quantity++;

        f.totalPrice = f.quantity * price;
      }
      return f;
    });
    this.setState({ foodInCart: newFoodInCart });
  }
  handleQuantityMinus(id, price) {
    const { foodInCart } = this.state;
    const newFoodInCart = foodInCart.map(f => {
      if (f.id === id && f.quantity > 1) {
        f.quantity--;

        f.totalPrice = f.quantity * price;
      }
      return f;
    });
    this.setState({ foodInCart: newFoodInCart });
  }

  renderItem(productInCart) {
    let {
      id,
      name,
      quantity,
      storeName,
      storeId,
      totalPrice,
      price,
      deliveryFee,
      minAmount,
    } = productInCart;

    return (
      <div key={id} className="SideCart__orders__item">
        <h4 className="SideCart__orders__item__name">{name}</h4>
        <div className="SideCart__orders__item__box">
          {/* key로 준 id값을 온클릭 할 때의 매개변수 */}
          <button
            className="SideCart__orders__item__delete"
            onClick={() => {
              this.props.handleDelete(id);
              this.props.updateCart();
            }}
          >
            삭제
          </button>

          <span className="SideCart__orders__item__price">
            {(price * quantity).toLocaleString()}원
          </span>
          <div className="SideCart__orders__item__quantity">
            <button
              onClick={e =>
                this.handleQuantityMinus(parseInt(id), parseInt(price))
              }
            >
              감소
            </button>
            <span>{quantity}</span>
            <button
              onClick={e =>
                this.handleQuantityPlus(parseInt(id), parseInt(price))
              }
            >
              추가
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { foodInCart, loading } = this.state;
    let cartLength = foodInCart.length;

    // console.log(this.props.orderList);
    console.log(foodInCart);
    return (
      <div className="SideCart">
        <div className="SideCart__header">
          <h1 className="SideCart__header__title">주문표</h1>
          {cartLength > 0 ? (
            <button
              onClick={() => {
                this.props.handleDeleteAll();
                this.props.updateCart();
              }}
              className="SideCart__header__all-delete"
            >
              <FontAwesomeIcon icon={faTrashAlt} color={'white'} />
            </button>
          ) : null}
        </div>
        {/* foodInCart[0] -> 이렇게 표시한 이유는 그냥 첫번째 배열의 배달값만 가져오면 되기 때문  */}
        <div className="SideCart__orders">
          {cartLength > 0 ? (
            <h3 className="SideCart__orders__store">
              <FontAwesomeIcon icon={faStore} />

              {foodInCart[0].storeName}
            </h3>
          ) : null}
          {cartLength > 0 ? (
            <div key={foodInCart.id}>
              {foodInCart.map(f => this.renderItem(f))}
            </div>
          ) : (
            <div className="SideCart__orders__empty">
              주문표에 담긴 메뉴가 없습니다.
            </div>
          )}
        </div>
        {cartLength > 0 ? (
          <div className="SideCart__deliveryㄴ_fee">
            배달료 : {foodInCart[0].deliveryFee.toLocaleString()}원
          </div>
        ) : null}
        {cartLength > 0 ? (
          <div className="SideCart__min_price">
            최소주문가격 : {foodInCart[0].minAmount.toLocaleString()}원
          </div>
        ) : null}
        {cartLength > 0 ? (
          <div className="SideCart__sum">
            합계 :
            {foodInCart
              .reduce((acc, item) => acc + item.totalPrice, 0)
              .toLocaleString()}
            원
          </div>
        ) : null}

        <div
          className="
        SideCart__btn"
        >
          {cartLength > 0 &&
          foodInCart.reduce((acc, item) => acc + item.totalPrice, 0) >
            foodInCart[0].minAmount ? (
            <Link to="/pay">
              <button onClick={() => this.handleToPay()}>주문하기</button>
            </Link>
          ) : (
            <Link to="#none" id="SideCart__btn-disabled">
              <button disabled>주문하기</button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}
