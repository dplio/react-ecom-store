import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

// history object comes from withRouter call on export below
// redux connect method passes in dispatch object when mapDispatchToProps
// isn't passed as arg to connect()
// we can dispatch a redux action in shorthand this way
// in this case hiding the cart dropdown when checkout button clicked
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

//memoized with reselect!! see cart.selectors.js, below is synonymous with...
// const mapStateToProps = (state) => ({
//   cartItems: selectCartItems(state),
// });
// ...this:
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

// withRouter passes match, history and location objects to components
// withRouter taking CartDropdown component as argument
export default withRouter(connect(mapStateToProps)(CartDropdown));
