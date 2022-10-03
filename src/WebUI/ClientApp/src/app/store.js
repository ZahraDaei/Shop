import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import thunkMiddleware from 'redux-thunk'
import { watchGetCategories, watchGetCategoriesTree} from '../features/category/meta/saga'
import { watchGetProducts } from '../features/products/meta/saga'
import { watchCreateCategories} from '../features/AdminPanel/Category/meta/saga'
import { watchCreateProduct} from '../features/AdminPanel/product/meta/saga'
import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'




export function* mainSaga(getState) {
    yield all([watchGetCategories(), watchGetProducts(), watchCreateCategories(), watchGetCategoriesTree(), watchCreateProduct()])

}

export default function configureStore(preloadedState) {

    const sagaMiddleware = createSagaMiddleware()

    //const middlewares = [loggerMiddleware, thunkMiddleware, sagaMiddleware]
    const middlewares = [thunkMiddleware, sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)
    sagaMiddleware.run(mainSaga)

  return store
}