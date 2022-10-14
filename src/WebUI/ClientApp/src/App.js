import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './Layout/Layout';
import Home from './Home/Home';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import Product from "./features/products/ProductList/Product"
import './custom.css'
import './App.scss'
import ProductDetail from "./features/products/ProductDetail/ProductDetail";
import Cart from "./features/Cart/Cart";
import Shipping from "./features/Cart/Shipping";
import AdminCategory from "./features/AdminPanel/Category/AdminCategory";
import CreateCategory from "./features/AdminPanel/Category/components/CreateCategory";
import AdminProduct from "./features/AdminPanel/product/AdminProduct";
import CreateProduct from "./features/AdminPanel/product/components/CreateProduct";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/:categoryName' component={Product} />
                <Route exact path='/Admin/category' component={AdminCategory} />
                <Route exact path='/Admin/category/CreateCategory' component={CreateCategory} />
                <Route exact path='/Admin/product' component={AdminProduct} />
                <Route exact path='/Admin/product/CreateProduct' component={CreateProduct} />
                <Route exact path="/productdetail/:id" component={ProductDetail } />
                <Route exact path="/checkout/cart" component={Cart } />
                <Route exact path="/checkout/shipping" component={Shipping } />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}
