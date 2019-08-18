import { take, put } from "redux-saga/effects";
import * as mutations from "./mutations";

export function* initiateCompareCards() {
    while (true) {
        const {name, index} = yield take(mutations.REQUEST_COMPARE_CARDS);
        setTimeout(() => (yield put(mutations.compareOpenedCards(name, index))), 1300);
    }
}