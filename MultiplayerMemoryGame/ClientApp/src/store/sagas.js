import { take, delay, put } from 'redux-saga/effects';
import * as mutations from "./mutations";

export function* initiateCompareCards() {
    while (true) {
        const { name, index } = yield take(mutations.REQUEST_COMPARE_CARDS);
        yield delay(1300);
        yield put(mutations.compareOpenedCards(name, index));
    }
}
