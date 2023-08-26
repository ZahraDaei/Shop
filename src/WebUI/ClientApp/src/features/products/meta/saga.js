import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects'
import { ProductClient } from "../../../client-api";



export const fetchProducts = async () => {
    var prod = new ProductClient();
    return await prod.getlist();
}



// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchProduct() {
    try {
        const products = yield call(fetchProducts);
        yield put({ type: "PRODUCT_FETCH_SUCCEEDED" });
        yield put({ type: "product/getProducts", payload: products.productDtos });
    } catch (e) {
        yield put({ type: "PRODUCT_FETCH_FAILED", message: e.message });
    }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* watchGetProducts() {
    yield takeEvery("PRODUCT_FETCH_START", fetchProduct);
}

export const fetchProductCategoryList = async () => {
    var prod = new ProductClient();
    return await prod.getProductCategoryList();
}




// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchProductCategory() {
    try {
        const products = yield call(fetchProductCategoryList);
        yield put({ type: "PRODUCT_CATEGORY_LIST_FETCH_SUCCEEDED" });
        yield put({ type: "product/getAllProductCategoryList", payload: products.productCategoryDtos });
    } catch (e) {
        yield put({ type: "PRODUCT_CATEGORY_LIST_FETCH_FAILED", message: e.message });
    }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* watchGetProductCategoryList() {
    yield takeEvery("PRODUCT_CATEGORY_LIST_FETCH_START", fetchProductCategory);
}





export const getProduct = async (payload) => {
    var prod = new ProductClient();
    return await prod.getProductById(payload);
}
// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchProductById(action) {
    try {
        const product = yield call(getProduct,action.payload);
        yield put({ type: "GET_PRODUCT_BY_ID_SUCCEEDED" });
        yield put({ type: "product/getProductById", payload: product });
    } catch (e) {
        yield put({ type: "GET_PRODUCT_BY_ID_FAILED", message: e.message });
    }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* watchGetProductById() {
    yield takeEvery("GET_PRODUCT_BY_ID_START", fetchProductById);
}







