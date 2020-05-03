import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

// Container pattern:
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

const ShopPage = ({ fetchCollectionsStart, match }) => {
  // passing fetchCollectionsStart to useEffect array avoids firing the event twice,
  // thus mimicking componentDidMount...
  // we only re-run the effect if fetchCollectionsStart changes
  // fetchCollectionsStart is a PROP, otherwise we would be able to pass empty array!!
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

// class ShopPage extends Component {
//   componentDidMount() {
//     const { fetchCollectionsStart } = this.props;
//     fetchCollectionsStart();
//   }

//   render() {
//     const { match } = this.props;
//     return (
//       <div className="shop-page">
//         <Route
//           exact
//           path={`${match.path}`}
//           component={CollectionsOverviewContainer}
//         />
//         <Route
//           path={`${match.path}/:collectionId`}
//           component={CollectionPageContainer}
//         />
//       </div>
//     );
//   }
// }

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
