import React from "react";
import { connect } from "react-redux";
import { clearItem, addItem, removeItem } from "../../redux/cart/cart.actions";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem, dispatch }) => (
  <div className="checkout-item">
    <div className="image-container">
      <img src={cartItem.imageUrl} alt="item" />
    </div>
    <span className="name">{cartItem.name}</span>
    <span className="quantity">
      <span className="arrow" onClick={() => dispatch(removeItem(cartItem))}>
        &#10094;
      </span>
      <span className="value">{cartItem.quantity}</span>
      <span className="arrow" onClick={() => dispatch(addItem(cartItem))}>
        &#10095;
      </span>
    </span>
    <span className="price">{cartItem.price}</span>
    <div
      className="remove-button"
      onClick={() => dispatch(clearItem(cartItem))}
    >
      &#10005;
    </div>
  </div>
);

export default connect(null)(CheckoutItem);
