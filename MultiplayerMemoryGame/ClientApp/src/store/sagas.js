import { takeEvery, delay, put } from 'redux-saga/effects';
import * as mutations from "./mutations";

export function* initiateCompareCards() {
    while (true) {
        yield takeEvery(mutations.REQUEST_COMPARE_CARDS);
        console.log('take action');
        yield delay(1300);
        yield put(mutations.compareOpenedCards());
    }
}
