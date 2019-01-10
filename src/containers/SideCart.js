import React, { Component } from 'react';
import SideCartView from '../components/SideCartView';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderList: JSON.parse(sessionStorage.cart),
    };

    this.handleAddMenu.bind(this);
    this.handleToPay.bind(this);

    this.checkFoodIndex = this.checkFoodIndex.bind(this);
  }

  handleToPay() {
    let newOrderList = this.state.orderList;
    this.setState({ orderList: newOrderList });
    sessionStorage.setItem('cart', JSON.stringify(this.state.orderList));
  }

  handleAddMenu() {
    let newOrderList = this.state.orderList;
    this.setState({ orderList: newOrderList });
    sessionStorage.setItem('cart', JSON.stringify(this.state.orderList));
  }

  async handleDelete(selectedId) {
    let newOrderList = this.state.orderList;

    let currentIndex = newOrderList.findIndex(i => {
      return i.id === selectedId;
    });

    newOrderList.splice(currentIndex, 1);

    this.setState({ orderList: newOrderList });

    sessionStorage.setItem('cart', JSON.stringify(newOrderList));
  }

  checkFoodIndex(id) {
    let list = this.state.orderList;
    return list.some(i => {
      return i.id === id;
    });
  }

  handleDeleteAll() {
    let newOrderList = this.state.orderList;
    newOrderList.splice(0, newOrderList.length);
    this.setState({ orderList: newOrderList });
    sessionStorage.setItem('cart', JSON.stringify(newOrderList));
  }

  render() {
    console.log(this.state.orderList);
    return (
      <SideCartView
        updateCart={this.props.updateCart}
        orderList={this.state.orderList}
        handleAddMenu={this.handleAddMenu}
        handleToPay={this.handleToPay}
        handleDelete={this.handleDelete.bind(this)}
        handleDeleteAll={this.handleDeleteAll.bind(this)}
        key={this.state.orderList.length}
      />
    );
  }
}
