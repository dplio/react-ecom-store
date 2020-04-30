import { shopActionTypes } from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

// old observer observable pattern
// export const updateCollections = (collectionsMap) => ({
//   type: shopActionTypes.UPDATE_COLLECTIONS,
//   payload: collectionsMap,
// });

// new async promise pattern with redux-thunk: see store.js for middleware application
export const fetchCollectionsStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
  payload: errorMessage,
});

// this is the function that redux thunk cares about, since it returns a function
// this is why we are able to use dispatch in the function as a param, since thunk
// provides it for us for use in asynchornous calls to our firestore
export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((err) => dispatch(fetchCollectionsFailure(err.message)));
  };
};
