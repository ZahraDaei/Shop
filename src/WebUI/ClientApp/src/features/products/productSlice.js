import { createSlice } from '@reduxjs/toolkit'
//import { products } from "../data";
export const productSlice = createSlice({
    name: 'product',
    initialState: {
        productList: [],
        selectedProduct: {},
        productListByCategory: [],
        loadingProduct: true,
        loading:true

    },
    reducers: {
        getProductById: (state, action) => {
            state.selectedProduct = state.productList?.filter(p => p.id === +action.payload)[0];
            state.loadingProduct = false;
        },
        getProducts: (state, action) => {
               state.productList = action.payload
            //state.productList = products;
            state.loading = false;
        }
        ,
        getProductsByCategory: (state, action) => {
            state.productListByCategory = state.productList?.filter(x => { return x.categoryName?.includes(action.payload) });
            state.loading = false;

        }
    }
})

export const { getProductById, getProducts, getProductsByCategory } = productSlice.actions

export default productSlice.reducer


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProducts = state => state.products.productList;
export const selectProductByCategory = state => state.products.productListByCategory;
export const selectProductById = state => state.products.selectedProduct;

export const selectLoading = state => state.products.loading;
export const selectLoadingProduct = state => state.products.loadingProduct;