import { createSlice } from '@reduxjs/toolkit'
//import { products } from "../data";
export const productSlice = createSlice({
    name: 'product',
    initialState: {
        productList: [],
        selectedProduct: {},
        productListByCategory: [],
        allProductCategoryList: [],
        loadingProductCategoryList:true,
        loadingProduct: true,
        loadingProducts:true,
        loading: true

    },
    reducers: {
        getProductById: (state, action) => {
            state.selectedProduct = action.payload;
            state.loadingProduct = false;
        },
        clearProduct: (state, action) => {
            state.selectedProduct = {};
            state.loadingProduct = true;
        },
        getProducts: (state, action) => {
            state.productList = action.payload
            state.loadingProducts = false;
        },
        getAllProductCategoryList: (state, action) => {
            state.allProductCategoryList = action.payload
            state.loadingProductCategoryList=false
        },
        getProductsByCategory: (state, action) => {
            state.productListByCategory = state.allProductCategoryList?.filter(x => x.categoryName === action.payload);
            state.loading = false;

        }
    }
})

export const { getProductById, getProducts, getProductsByCategory, clearProduct } = productSlice.actions

export default productSlice.reducer


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProducts = state => state.products.productList;
export const selectAllProductCategoryList = state => state.products.allProductCategoryList;
export const selectProductByCategory = state => state.products.productListByCategory;
export const selectProductById = state => state.products.selectedProduct;

export const selectLoadingProducts = state => state.products.loadingProducts;
export const selectLoading = state => state.products.loading;
export const selectLoadingProduct = state => state.products.loadingProduct;
export const selectLoadingProductCategoryList = state => state.products.loadingProductCategoryList;