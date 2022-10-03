import { createSlice } from '@reduxjs/toolkit'


export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categoryList: [],
        loading: true,
        loadingTree: true,
        subCategory: [],
        mainCategory: [],
        categoryTreeList:null
    },
    reducers: {
        getCategoriesTree: (state, action) => { state.categoryTreeList = action.payload; state.loadingTree=false },
        getCategories: (state, action) => {
            state.categoryList = action.payload; state.loading=false },
        getSubCategories: (state, action) => {
            var parent = state.categoryList.filter(c => c.name == action.payload);
            console.log("ppp", parent)
            state.subCategory = state.categoryList.filter(c => c.parentId == parent[0].id);
        },
      
           
    }
})

export const { getCategories, getSubCategories, getCategoriesTree } = categorySlice.actions

export default categorySlice.reducer




// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectLoading = state => state.category.loading;
export const selectLoadingTree = state => state.category.loadingTree;
export const selectCategoryTreeList = state => state.category.categoryTreeList;
export const selectCategoryList = state => state.category.categoryList;
export const selectMainCategory = state => state.category.mainCategory;
export const selectSubCategory = state => state.category.subCategory;