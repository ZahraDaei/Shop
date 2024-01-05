    
const profilePfx="/Profile"
export const Profile={
    User_Info:"user_info"
}


const adminPfx="/admin"
export const Admin={
    Category:"category",
    CreateCategory:"createcategory",
    Product:"product",
    Category:"category",
    CreateProduct:"createproduct",
    AdminProductDetail:"adminproductdetail",
    EditProduct:"EditProduct",
    DeleteProduct: "DeleteProduct",
    CategoryDetail: "CategoryDetail",
    EditCategory:"EditCategory",
    DeleteCategory:"DeleteCategory"
}

const checkoutPfx="/checkout"
export const Checkout={
    Cart:"cart",
    Shipping:"shipping",
    Payment:"payment"
}

const webSite = "/"
export const Pages = {
    CategoryList:"categoryList"
}

export const AppPath={
    Profile:`${profilePfx}`,
    User_Info:`${profilePfx}/${Profile.User_Info}`,
    Category:`${adminPfx}/${Admin.Category}`,
    CategoryList: `${webSite}${Pages.CategoryList}`,
    CreateCategory:`${adminPfx}/${Admin.Category}/${Admin.CreateCategory}`,
    Product:`${adminPfx}/${Admin.Product}`,
    CreateProduct:`${adminPfx}/${Admin.Product}/${Admin.CreateProduct}`,
    EditProduct: `${adminPfx}/${Admin.Product}/${Admin.EditProduct}`,
    DeleteProduct: `${adminPfx}/${Admin.Product}/${Admin.DeleteProduct}`,
    AdminProductDetail: `${adminPfx}/${Admin.Product}/${Admin.AdminProductDetail}`,
    EditCategory: `${adminPfx}/${Admin.Category}/${Admin.EditCategory}`,
    DeleteCategory: `${adminPfx}/${Admin.Category}/${Admin.DeleteCategory}`,
    CategoryDetail: `${adminPfx}/${Admin.Category}/${Admin.CategoryDetail}`,
    CheckoutCart:`${checkoutPfx}/${Checkout.Cart}`,
    CheckoutShipping: `${checkoutPfx}/${Checkout.Shipping}`,
    CheckoutPayment: `${checkoutPfx}/${Checkout.Payment}`
    
}
