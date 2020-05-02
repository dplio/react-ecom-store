import { all, call } from "redux-saga/effects";
// all takes array of sagas, allowing for concurrent saga runs
import { fetchCollectionsStart } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";

export default function* rootSaga() {
  yield all([call(fetchCollectionsStart), call(userSagas)]);
}
