`import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects'
import { ${name}Client } from "../../../client-api";



const Create${name}Item = async (payload) => {
    var pro = new ${name}Client();  
  
   
    return await pro.create();
}


// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* create${name}(action) {
    try {
        console.log("fitsan", action.payload);
        const result = yield call(Create${name}Item, action.payload);
        if (Boolean(result)) {
        yield put({ type: "${name.toUpperCase()}_CREATE_SUCCEEDED" });
            yield put({ type: "${name.toUpperCase()}_FETCH_START" });
            yield put({ type: "alert/showAlert", payload: {variant:"success",message:"عملیات ایجاد محصول با موفقیت انجام شد"} });
        }
    } catch (e) {
        yield put({ type: "${name.toUpperCase()}_CREATE_FAILED", message: e.message });
            yield put({ type: "alert/showAlert", payload: {variant:"danger",message:"خطا در ایجاد محصول  "} });
    }
}


export function* watchCreateProduct() {
    yield takeEvery("${name.toUpperCase()}_CREATE_START", createProduct);
}



export const fetch${name}s = async () => {
    var prod = new ${name}Client();
    return await prod.getlist();
}



function* fetch${name}() {
    try {
        const ${name}s = yield call(fetch${name}s);
        yield put({ type: "${name.toUpperCase()}_FETCH_SUCCEEDED" });
        yield put({ type: "${name}/get${name}s", payload: ${name}s.${name}Dtos });
    } catch (e) {
        yield put({ type: "${name.toUpperCase()}_FETCH_FAILED", message: e.message });
    }
}


export function* watchGet${name}s() {
    yield takeEvery("${name.toUpperCase()}_FETCH_START", fetch${name});
}
`