import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects'
import { ProductClient } from "../../../../client-api"



const CreateProductItem = async (payload) => {
    var pro = new ProductClient();  

    return await pro.create(
        payload.brandName,
        payload.description,
        payload.shortDescription,
        payload.name,
        payload.farsiName,
        +payload.price,
        { data: payload.image, fileName: payload.image.name },
        payload.productSpecifications,
        payload.productCategories);
}


// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* createProduct(action) {
    try {
        const result = yield call(CreateProductItem, action.payload);
        if (Boolean(result)) {
        yield put({ type: "PRODUCT_CREATE_SUCCEEDED" });
            yield put({ type: "PRODUCT_FETCH_START" });
            yield put({ type: "alert/showAlert", payload: {variant:"success",message:"عملیات ایجاد محصول با موفقیت انجام شد"} });
        }
    } catch (e) {
        yield put({ type: "PRODUCT_CREATE_FAILED", message: e.message });
            yield put({ type: "alert/showAlert", payload: {variant:"danger",message:"خطا در ایجاد محصول  "} });
    }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* watchCreateCategories() {
    yield takeEvery("PRODUCT_CREATE_START", createProduct);
}







