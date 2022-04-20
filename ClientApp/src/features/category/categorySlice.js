import { createSlice } from '@reduxjs/toolkit'


export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categoryList: [],
        loading: true,
        loadingTree: true,
        subCategory: [], mainCategory: [],
        categoryTreeList:null
    },
    reducers: {
        getCategories: (state, action) => { state.categoryList = action.payload;state.loading=false },
        getCategoriesTree: (state, action) => {
            state.categoryTreeList = JSON.parse(action.payload)[0];state.loadingTree=false },
        generateMainAndSubCategory: (state, action) => {
            catMaker(state, action)
        },        
    }
})

export const { getCategories, generateMainAndSubCategory, getCategoriesTree } = categorySlice.actions

export default categorySlice.reducer



const catMaker = (state, action) => {
    var array = new Array();
    var index = 0;

    var productCategories = state.categoryList;
    var parentCategory = productCategories.filter(
        (x) => x.name === action.payload
    );
    var category = productCategories.filter(
        (x) => x.parentId === parentCategory[0]?.id
    );
    if (category.length === 0) {
        category = productCategories.filter(
            (x) => x.parentId === parentCategory[0]?.parentId
        ); 
    } else {
        array.push(parentCategory[0]);
    }
    do {
        if (parentCategory[0]?.parentId > 0) {
            parentCategory = productCategories.filter(
                (x) => x.id === parentCategory[0]?.parentId
            );
            array.push(parentCategory[0]);
            index = array.length - 1;
        }
    } while (array[index]?.parentId > 0);

    state.subCategory = category;
    state.mainCategory = array.reverse();
}
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectLoading = state => state.category.loading;
export const selectLoadingTree = state => state.category.loadingTree;
export const selectCategoryTreeList = state => state.category.categoryTreeList;
export const selectCategoryList = state => state.category.categoryList;
export const selectMainCategory = state => state.category.mainCategory;
export const selectSubCategory = state => state.category.subCategory;