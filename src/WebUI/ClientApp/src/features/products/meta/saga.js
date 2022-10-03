import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects'
import { ProductClient } from "../../../client-api";



export const fetchProducts = async () => {
    var prod = new ProductClient();
    return await prod.get();
}



// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchProduct() {
    try {
        const products = yield call(fetchProducts);
        yield put({ type: "PRODUCT_FETCH_SUCCEEDED" });
        yield put({ type: "product/getProducts", payload: products.productDto });
    } catch (e) {
        yield put({ type: "PRODUCT_FETCH_FAILED", message: e.message });
    }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* watchGetProducts() {
    yield takeEvery("PRODUCT_FETCH_START", fetchProduct);
}







