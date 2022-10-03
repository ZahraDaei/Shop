import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects'
import { CategoryClient, } from "../../../client-api"


const fetchCategoryList = async () => {
    var cat = new CategoryClient();
    return await cat.getCategoryList();
}
const fetchTree = async () => {
    var cat = new CategoryClient();
    return await cat.get();
}



function* fetchCategory() {
    try {
        const category = yield call(fetchCategoryList);
        yield put({ type: "CATEGORY_FETCH_SUCCEEDED" });
        yield put({ type: "category/getCategories", payload: category.categoryDtos });
    } catch (e) {
        yield put({ type: "CATEGORY_FETCH_FAILED", message: e.message });
    }
}
// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchCategoryTree() {
    try {
        const category = yield call(fetchTree);
        yield put({ type: "CTEGORY_TREE_FETCH_SUCCEEDED" });
        var catObj = {
            item: {
                farsiName: "دسته اصلی",
                name: "parent",
                parentId: "ندارد",
                id: 0, 
                specifications:[]
            },
            children: category
        }
        yield put({ type: "category/getCategoriesTree", payload: catObj });
    } catch (e) {
        yield put({ type: "CATEGORY_TREE_FETCH_FAILED", message: e.message });
    }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* watchGetCategories() {
    yield takeEvery("CATEGORY_FETCH_START", fetchCategory);
}
export function* watchGetCategoriesTree() {
    yield takeEvery("CATEGORY_TREE_FETCH_START", fetchCategoryTree);
}








