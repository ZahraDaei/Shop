import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import thunkMiddleware from 'redux-thunk'
import { watchGetCategories, watchGetCategoriesTree } from '../features/category/meta/saga'
import { watchGetProducts, watchGetProductCategoryList, watchGetProductById } from '../features/products/meta/saga'
import { watchGetUser } from '../features/user/meta/saga'
import { watchCreateCategories, watchUpdateCategory, watchDeleteCategory, watchGetCategoryById } from '../features/AdminPanel/Category/meta/saga'
import { watchCreateProduct, watchUpdateProduct, watchDeleteProduct } from '../features/AdminPanel/product/meta/saga'
import { watchGetAddresses } from '../features/user/meta/saga'
import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

//import { configureStore } from "@reduxjs/toolkit";
//import userReducer from "./slices/userSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export function* mainSaga(getState) {
    yield all([
        watchGetCategories(),
        watchGetProducts(),
        watchCreateCategories(),
        watchGetCategoryById(),
        watchDeleteCategory(),
        watchGetCategoryById(),
        watchUpdateCategory(),
        watchGetCategoriesTree(),
        watchCreateProduct(),
        watchDeleteProduct(),
        watchUpdateProduct(),
        watchGetProductCategoryList(),
        watchGetUser(),
        watchGetAddresses(),
        watchGetProductById()])

}

export const store = configureStore()

function configureStore(preloadedState) {

    const sagaMiddleware = createSagaMiddleware()

    //const middlewares = [loggerMiddleware, thunkMiddleware, sagaMiddleware]
    const middlewares = [thunkMiddleware, sagaMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(persistedReducer, preloadedState, composedEnhancers)
    sagaMiddleware.run(mainSaga)

    return store
}

export const persistor = persistStore(store)