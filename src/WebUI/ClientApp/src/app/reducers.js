import shoppingCartReducer from '../features/Cart/shoppingCartSlice'
import productReducer from '../features/products/productSlice'
import userReducer from '../features/user/userSlice'
import addressReducer from '../features/user/addressSlice'
import categoryReducer from '../features/category/categorySlice'
import alertReducer from '../features/alert/alertSlice'
import { combineReducers } from 'redux';


const rootReducer=combineReducers({
   
    shoppingCart: shoppingCartReducer,
    products: productReducer,
    user:userReducer,
    addresses: addressReducer,
    category: categoryReducer,
    alert:alertReducer
  
})
export default rootReducer;