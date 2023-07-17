import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './Layout/Layout';
import Home from './Home/Home';
import Profile from './features/user/components/Profile';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import Product from "./features/products/ProductList/Product"
import './custom.css'
import './App.scss'
import ProductDetail from "./features/products/ProductDetail/ProductDetail";
import Cart from "./features/Cart/Cart";
import Shipping from "./features/Cart/Shipping";
import Payment from "./features/Cart/Payment";
import AdminCategory from "./features/AdminPanel/Category/AdminCategory";
import CreateCategory from "./features/AdminPanel/Category/components/CreateCategory";
import AdminProduct from "./features/AdminPanel/product/AdminProduct";
import CreateProduct from "./features/AdminPanel/product/components/CreateProduct";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { AppPath } from './AppPathConstant';

const AppLayout = props => {

    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/search/:categoryName' component={Product} />
            <Route exact path="/productdetail/:id" component={ProductDetail} />
            <Route exact path={AppPath.CheckoutCart} component={Cart} />
            <AuthorizeRoute path={AppPath.Profile} component={Profile} />
            <AuthorizeRoute exact path={AppPath.Category} component={AdminCategory} />
            <AuthorizeRoute exact path={AppPath.CreateCategory} component={CreateCategory} />
            <AuthorizeRoute exact path={AppPath.Product} component={AdminProduct} />
            <AuthorizeRoute exact path={AppPath.CreateProduct} component={CreateProduct} />
            <AuthorizeRoute exact path={AppPath.CheckoutShipping} component={Shipping} />
            <AuthorizeRoute exact path={AppPath.CheckoutPayment} component={Payment} />
        </Layout>
    )
}

AppLayout.propTypes = {}

export default AppLayout