import React, { Component } from "react";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

// import { updateCollections } from "../../redux/shop/shop.actions";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
// import {
//   selectIsCollectionFetching,
//   selectIsCollectionsLoaded,
// } from "../../redux/shop/shop.selectors";

// import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
// import CollectionPage from "../collection/collection.component";

// import {
//   firestore,
//   convertCollectionsSnapshotToMap,
// } from "../../firebase/firebase.utils";

// Container pattern:
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

// HOC!!! replaced with container pattern
// import WithSpinner from "../../components/with-spinner/with-spinner.component";
// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  // state = {
  //   loading: true,
  // };

  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    // const { dispatch } = this.props;
    // const collectionRef = firestore.collection("collections");
    // fetch pattern, ridiculously nested!!
    // fetch(
    //   "https://firestore.googleapis.com/v1beta1/projects/react-ecom-store-db/databases/(default)/documents/collections"
    // )
    //   .then((response) => response.json())
    //   .then((collections) => console.log(collections));
    // API call, promise pattern, caveat no live update, only fires once on componentDidMount
    // so we'll move it into an asynchronous redux action, see shop.actions
    // collectionRef.get().then((snapshot) => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   dispatch(updateCollections(collectionsMap));
    //   this.setState({ loading: false });
    // });
    // observer observable pattern with live update:
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
    //   async (snapshot) => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     dispatch(updateCollections(collectionsMap));
    //     this.setState({ loading: false });
    //   }
    // );
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  // componentWillUnmount() {
  //   this.unsubscribeFromSnapshot();
  // }

  render() {
    // const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
    const { match } = this.props;
    // const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          // render={(props) => (
          //   <CollectionsOverviewWithSpinner
          //     isLoading={isCollectionFetching}
          //     {...props}
          //   />
          // )}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          // render={(props) => (
          //   <CollectionPageWithSpinner
          //     isLoading={!isCollectionsLoaded}
          //     {...props}
          //   />
          // )}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

// moved mapStateToProps into collections page and overview containers!!
// const mapStateToProps = createStructuredSelector({
//   isCollectionFetching: selectIsCollectionFetching,
//   isCollectionsLoaded: selectIsCollectionsLoaded,
// });

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
