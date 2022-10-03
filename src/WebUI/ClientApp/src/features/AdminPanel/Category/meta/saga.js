import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects'
import { CategoryClient } from "../../../../client-api"



const CreateCategoryItem = async (payload) => {
    var cat = new CategoryClient();  

    return await cat.create(payload.name, payload.farsiName,
        { data: payload.image, fileName: payload.image.name }, +payload.parentId, payload.specifications);
}


// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* createCategory(action) {
    try {
        const result = yield call(CreateCategoryItem, action.payload);
        if (Boolean(result)) {
        yield put({ type: "CATEGORY_CREATE_SUCCEEDED" });
            yield put({ type: "CATEGORY_TREE_FETCH_START" });
            yield put({ type: "alert/showAlert", payload: {variant:"success",message:"عملیات ایجاد دسته بندی با موفقیت انجام شد"} });
        }
    } catch (e) {
        yield put({ type: "CATEGORY_CREATE_FAILED", message: e.message });
            yield put({ type: "alert/showAlert", payload: {variant:"danger",message:"خطا در ایجاد دسته بندی  "} });
    }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* watchCreateCategories() {
    yield takeEvery("CATEGORY_CREATE_START", createCategory);
}







