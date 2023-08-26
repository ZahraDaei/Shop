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



const UpdateCategoryItem = async (payload) => {
    var cat = new CategoryClient();

    return await cat.update(
        payload.id,
        payload.name,
        payload.farsiName,
        payload.image,
        payload.parentId,
        payload.specifications
       );
}
function* updateCategory(action) {
    try {
        const result = yield call(UpdateCategoryItem, action.payload);
        if (Boolean(result)) {
            yield put({ type: "CATEGORY_UPDATE_SUCCEEDED" });
            yield put({ type: "CATEGORY_FETCH_START" });
            yield put({ type: "alert/showAlert", payload: { variant: "success", message: "عملیات به روزرسانی دسته بندی با موفقیت انجام شد" } });
        }
    } catch (e) {
        // var err =Object.values(e.response.errors).toString();
        var err = Object.values(JSON.parse(e.response).errors).toString();
        yield put({ type: "CATEGORY_UPDATE_FAILED", message: err });
        yield put({ type: "alert/showAlert", payload: { variant: "danger", message: err } });
    }
}

export function* watchUpdateCategory() {
    yield takeEvery("CATEGORY_UPDATE_START", updateCategory);
}

const DeleteCategoryItem = async (payload) => {
    var pro = new CategoryClient();
    await pro.softDelete(payload);
}
function* deleteCategory(action) {
    try {
        yield call(DeleteCategoryItem, action.payload);

        yield put({ type: "CATEGORY_DELETE_SUCCEEDED" });
        yield put({ type: "CATEGORY_FETCH_START" });
        yield put({ type: "alert/showAlert", payload: { variant: "success", message: "عملیات حذف دسته بندی با موفقیت انجام شد" } });

    } catch (e) {
        yield put({ type: "CATEGORY_DELETE_FAILED", message: e.message });
        yield put({ type: "alert/showAlert", payload: { variant: "danger", message: "خطا در حذف دسته بندی  " } });
    }
}

export function* watchDeleteCategory() {
    yield takeEvery("CATEGORY_DELETE_START", deleteCategory);
}



export const getCategory = async (payload) => {
    var prod = new CategoryClient();
    return await prod.getCategoryById(payload);
}
// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchCategoryById(action) {
    try {
        const category = yield call(getCategory, action.payload);
        yield put({ type: "GET_CATEGORY_BY_ID_SUCCEEDED" });
        yield put({ type: "category/getCategoryById", payload: category });
    } catch (e) {
        yield put({ type: "GET_CATEGORY_BY_ID_FAILED", message: e.message });
    }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* watchGetCategoryById() {
    yield takeEvery("GET_CATEGORY_BY_ID_START", fetchCategoryById);
}







