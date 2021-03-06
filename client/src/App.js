import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";
// import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

const App = ({ checkUserSession, currentUser }) => {
  // componentDidMount equivalent
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
};

// class App extends Component {
//   componentDidMount() {
//     const { checkUserSession } = this.props;
//     checkUserSession();
//   }

//   render() {
//     const { currentUser } = this.props;
//     return (
//       <div>
//         <Header />
//         <Switch>
//           <Route exact path="/" component={HomePage} />
//           <Route path="/shop" component={ShopPage} />
//           <Route
//             exact
//             path="/signin"
//             render={() =>
//               currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
//             }
//           />
//           <Route exact path="/checkout" component={CheckoutPage} />
//         </Switch>
//       </div>
//     );
//   }
// }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
