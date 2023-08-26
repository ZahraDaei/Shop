import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects'
import { ProductClient, ProductSpecificationKeyValue } from "../../../../client-api"



const CreateProductItem = async (payload) => {
    var pro = new ProductClient();  
    //var productSpec = [];
    //var specs = payload.productSpecifications;
    //for (var i = 0; i < specs.length; i++) {
    //    var item = new ProductSpecificationKeyValue();
    //    item.id = specs[i].id;
    //    item.value = specs[i].value;
    //    productSpec = [...productSpec,item]
    //}
    var spec=JSON.stringify(payload.productSpecifications)
    return await pro.create(
        payload.brandName,
        payload.description,
        payload.shortDescription,
        payload.name,
        payload.farsiName,
        +payload.price,
        { data: payload.image, fileName: payload.image.name },
        spec, 
        payload.productCategory);
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
export function* watchCreateProduct() {
    yield takeEvery("PRODUCT_CREATE_START", createProduct);
}


const UpdateProductItem = async (payload) => {
    var pro = new ProductClient();  
  
    var spec = JSON.stringify(payload.productSpecifications)
    return await pro.update(
        payload.id,        
        payload.brandName,
        payload.description,
        payload.shortDescription,
        payload.name,
        payload.farsiName,
        +payload.price,
        { data: payload.image, fileName: payload.image.name },
        spec, 
        payload.productCategory);
}
function* updateProduct(action) {
    try {
        const result = yield call(UpdateProductItem, action.payload);
        if (Boolean(result)) {
        yield put({ type: "PRODUCT_UPDATE_SUCCEEDED" });
            yield put({ type: "PRODUCT_FETCH_START" });
            yield put({ type: "alert/showAlert", payload: {variant:"success",message:"عملیات به روزرسانی محصول با موفقیت انجام شد"} });
        }
    } catch (e) {
       // var err =Object.values(e.response.errors).toString();
        var err = Object.values(JSON.parse(e.response).errors).toString();
        yield put({ type: "PRODUCT_UPDATE_FAILED", message: err });
        yield put({ type: "alert/showAlert", payload: { variant: "danger", message: err } });
    }
}

export function* watchUpdateProduct() {
    yield takeEvery("PRODUCT_UPDATE_START", updateProduct);
}

const DeleteProductItem = async (payload) => {
    var pro = new ProductClient();  
    await pro.softDelete(payload);
}
function* deleteProduct(action) {
    try {
        yield call(DeleteProductItem, action.payload);
        
        yield put({ type: "PRODUCT_DELETE_SUCCEEDED" });
            yield put({ type: "PRODUCT_FETCH_START" });
            yield put({ type: "alert/showAlert", payload: {variant:"success",message:"عملیات حذف محصول با موفقیت انجام شد"} });
        
    } catch (e) {
        yield put({ type: "PRODUCT_DELETE_FAILED", message: e.message });
            yield put({ type: "alert/showAlert", payload: {variant:"danger",message:"خطا در حذف محصول  "} });
    }
}

export function* watchDeleteProduct() {
    yield takeEvery("PRODUCT_DELETE_START", deleteProduct);
}




