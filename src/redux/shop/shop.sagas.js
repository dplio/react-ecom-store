import { takeLatest, call, put } from "redux-saga/effects";
// takeEvery listens for every matching action dispatched in our component
// takeLatest cancels all previous action call, running only the latest
// call passes function calls to saga middleware
// put is saga version of dispatch
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";
import { shopActionTypes } from "./shop.types";

// this is like async await pattern, but with yield in generator fn handling promises
export function* fetchCollectionsAsync() {
  yield console.log("I am fired");

  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

// 1 action dispatched to redux
// 2 caught by takeEvery Effect on below generator function
// 3 which fires above generator function
// 4 which completes async action lifecycle to success or failure
// 5 which updates reducer, thus store, thus state
export function* fetchCollectionsStart() {
  yield takeLatest(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
