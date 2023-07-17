import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects'
import { UserClient, AddressClient } from "../../../client-api";




export const fetchUser = async () => {
    var user = new UserClient();
    return await user.get();
}



// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* getUser() {
    try {
        const user = yield call(fetchUser);
        yield put({ type: "USER_FETCH_SUCCEEDED" });
        yield put({ type: "user/getUser", payload: user.userDto });
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* watchGetUser() {
    yield takeEvery("USER_FETCH_START", getUser);
}


export const fetchAddresses = async () => {
    var add = new AddressClient();
    return await add.getUserAddressList();
}



function* fetchAddressList() {
    try {
        const addressList = yield call(fetchAddresses);
        yield put({ type: "ADDRESSES_FETCH_SUCCEEDED" });
        yield put({ type: "address/getAddressList", payload: addressList.userAddressListDto });
    } catch (e) {
        yield put({ type: "ADDRESSES_FETCH_FAILED", message: e.message });
    }
}


export function* watchGetAddresses() {
    yield takeEvery("ADDRESSES_FETCH_START", fetchAddressList);
}









