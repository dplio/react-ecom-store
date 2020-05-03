// wrapping collectionsOverviewWithSpinner to abstract rendering logic away from shop page
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

// isLoading object key is set in WithSpinner HOC
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

// compose fires from right to left using currying
// we can chain multiple functions that return functions in this way
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

// above is equivalent to:
// export const CollectionsOverviewContainer = connect(mapStateToProps)(
//   WithSpinner(CollectionsOverview)
// );

export default CollectionsOverviewContainer;
