import {
    useHistory
} from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { selectAlert } from "features/alert/alertSlice";
import { selectCategoryList, selectLoading as categoryLoading, selectLoadingTree } from "features/category/categorySlice";
import { selectProducts, selectProductById, selectLoadingProduct } from "features/products/productSlice";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CategoryTree from "./CategoryTree";
import schema from "./schema";

export default function EditProduct() {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")

    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "alert/hideAlert" })
        dispatch({ type: "GET_PRODUCT_BY_ID_START", payload: id })
        dispatch({ type: "CATEGORY_TREE_FETCH_START" })
        dispatch({ type: "CATEGORY_FETCH_START" })
    }, [])
    const product = useSelector(selectProductById);
    const loading = useSelector(selectLoadingProduct);

    const [file, setFile] = useState();
    const [specifications, setSpecifications] = useState([]);
    const [content, setContent] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleClick = () => {

        setShow(true);
    }

    const products = useSelector(selectProducts);

    var catLoading = useSelector(selectLoadingTree);
    var catListLoading = useSelector(categoryLoading);
    var categoryList = useSelector(selectCategoryList);

    const dispatch = useDispatch()




    const methods = useForm({
        resolver: yupResolver(schema), defaultValues: {
            //productCategories: [],
            //productSpecifications: [],
            name: product?.name,
            farsiName: product?.farsiName,
            brandName: product?.brandName,
            price: product?.price,
            image: product?.image,
            shortDescription: product?.shortDescription,
            description: product?.description,
            productCategory: `${product?.categoryId}`,
            productSpecifications: product?.specifications,
        }
    });
    var errors = methods.formState.errors;

    const onSubmit = data => {
        data.id = product.id;
        data.name = data.name.trim().toLowerCase();
        data.farsiName = data.farsiName.trim().toLowerCase();
        data.image = file;
        // data.specifications = data.specifications.map(item=>item=item.specificationKey)
        dispatch({ type: 'PRODUCT_UPDATE_START', payload: data });
        // methods.reset();
        // setFile(null);
        // setSpecifications([]);
    };


    const preventNonNumber = (e) => {
        if (!/^\d+$/.test(e.key))
            e.preventDefault();
    }

    const DisplayCategory = () => {
        return categoryList.filter(x => x.id == methods.getValues('productCategory'))[0]?.farsiName;
    }

    useEffect(() => {
        if (catLoading || catListLoading || loading) {
            setContent(<div style={{ display: "flex", alignItems: "center" }}><Spinner animation="border" variant="primary" /></div>)
        } else {
            setContent(
                <div className="borderStyle formStyle w-50" >
                    <FormProvider {...methods} >
                        <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit, (e) => console.log(e))}>
                            <div className="grid-container">
                                <div>
                                    <div className=" inputFlexBox justifyLeft" >
                                        <label>نام محصول (انگلیسی):</label>
                                        <input className="inputStyle" autoFocus  {...methods.register("name")} />
                                    </div>
                                    <div className="inputErrorStyle">  {errors?.name?.message}</div>
                                </div>
                                <div>
                                    <div className=" inputFlexBox justifyLeft" >
                                        <label>نام محصول (فارسی):</label>
                                        <input className="inputStyle"   {...methods.register("farsiName")} />
                                    </div>
                                    <div className="inputErrorStyle">  {errors?.farsiName?.message}</div>
                                </div>
                                <div>
                                    <div className=" inputFlexBox justifyLeft" >
                                        <label>برند (فارسی):</label>
                                        <input className="inputStyle"   {...methods.register("brandName")} />
                                    </div>
                                    <div className="inputErrorStyle">  {errors?.brandName?.message}</div>
                                </div>
                                <div>
                                    <div className=" inputFlexBox justifyLeft" >
                                        <label>قیمت:</label>
                                        <input className="inputStyle"
                                            onKeyPress={preventNonNumber}
                                            {...methods.register("price")} />
                                    </div>
                                    <div className="inputErrorStyle">  {errors?.price?.message}</div>
                                </div>

                            </div>
                            <div className="inputBoxStyle ">
                                <label >تصویر:</label>
                                <Button variant="primary" ><label htmlFor="files" >انتخاب تصویر</label></Button>

                                <input
                                    id="files"
                                    type="file"
                                    {...methods.register('image', { onChange: (e) => setFile(e.target.files[0]) })}
                                    style={{ visibility: "hidden" }}
                                    accept="image/png, image/jpeg" />
                                <div style={{ height: "40px" }}> {file?.name ?? methods.getValues("image")}</div>
                            </div>
                            <div className="inputErrorStyle">  {errors?.image?.message}</div>

                            <div className="mb-2 d-flex flex-direction-row">
                                <label >دسته بندی:</label>
                                <Button variant="primary" onClick={handleClick}>
                                    انتخاب دسته بندی
                                </Button>
                                <div className="mr-3">{DisplayCategory()}</div>
                                <CategoryTree show={show} handleClose={handleClose} specifications={specifications} setSpecifications={setSpecifications} />
                            </div>


                            <div className=" inputFlexBox justifyRight" >
                                <label>توصیف کوتاه (فارسی):</label>
                                <textarea cols="60" className="inputStyle" {...methods.register("shortDescription")} placeholder="توصیف کوتاه محصول" />

                            </div>
                            <div className="inputErrorStyle">  {errors?.shortDescription?.message}</div>
                            <div className=" inputFlexBox justifyRight" >
                                <label>توصیف (فارسی):</label>
                                <textarea cols="60" rows="10" className="inputStyle" {...methods.register("description")} placeholder="توصیف محصول" />

                            </div>
                            <div className="inputErrorStyle">  {errors?.description?.message}</div>

                            <button type="submit" className="btn btn-primary" style={{ "float": "left", "width": "20%","marginTop": "40px"}}>ثبت</button>
                            <button type="button" onClick={history.goBack} className="btn btn-secondary" style={{ "float": "left", "width": "20%", "marginTop": "40px" }}>بازگشت</button>
                        </form>
                    </FormProvider>
                </div>
            )
        }
    }, [catLoading, file, errors, products, catListLoading, specifications, show, loading])
    return (
        <Container>
            <Alert variant={useSelector(selectAlert).variant} show={Boolean(useSelector(selectAlert).variant)} >
                <div>{useSelector(selectAlert).message}</div>
            </Alert>
            <div className="d-flex justify-content-center">
                {content}
            </div>
        </Container>
    );

}