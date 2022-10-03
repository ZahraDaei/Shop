//import { productCategories } from '../../data';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { selectCategoryList} from "../../category/categorySlice"

const CategoryMaker = (categoryName) => {
    var array = new Array();
    var index = 0;

    var productCategories = useSelector(selectCategoryList);
    console.log('productCategories', productCategories)
    var parentCategory = productCategories.filter(
      (x) => x.name === categoryName
    );
    console.log('parentCategory', parentCategory)
    var category = productCategories.filter(
      (x) => x.parentId === parentCategory[0]?.id
    );
    console.log('category', category)
    if (category.length===0) {
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
  return [category,array.reverse()];
};

CategoryMaker.propTypes = {};

export default CategoryMaker;
