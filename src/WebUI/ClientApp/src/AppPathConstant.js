
const profilePfx="/Profile"
export const Profile={
    User_Info:"user_info"
}


const adminPfx="/admin"
export const Admin={
    Category:"category",
    CreateCategory:"createcategory",
    Product:"product",
    CreateProduct:"/createproduct"
}

const checkoutPfx="/checkout"
export const Checkout={
    Cart:"cart",
    Shipping:"shipping",
    Payment:"payment"
}

export const AppPath={
    Profile:`${profilePfx}`,
    User_Info:`${profilePfx}/${Profile.User_Info}`,
    Category:`${adminPfx}/${Admin.Category}`,
    CreateCategory:`${adminPfx}/${Admin.Category}/${Admin.CreateCategory}`,
    Product:`${adminPfx}/${Admin.Product}`,
    CreateProduct:`${adminPfx}/${Admin.Product}/${Admin.CreateProduct}`,
    CheckoutCart:`${checkoutPfx}/${Checkout.Cart}`,
    CheckoutShipping: `${checkoutPfx}/${Checkout.Shipping}`,
    CheckoutPayment: `${checkoutPfx}/${Checkout.Payment}`
    
}
