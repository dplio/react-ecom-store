// wrapping collectionsPageWithSpinner to abstract rendering logic away from shop page
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection.component";

// isLoading object key is set in WithSpinner HOC
const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state),
});

// compose fires from right to left using currying
// we can chain multiple functions that return functions in this way
const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

// above is equivalent to:
// export const CollectionPageContainer = connect(mapStateToProps)(
//   WithSpinner(CollectionPage)
// );

export default CollectionPageContainer;
