import {
    useHistory
} from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectAlert } from "features/alert/alertSlice";
import { selectCategoryList, selectLoading as categoryLoading, selectLoadingTree } from "features/category/categorySlice";
import { selectProducts } from "features/products/productSlice";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CategoryTree from "./CategoryTree";
import { schema } from "./schema";

export default function CreateProduct() {
    const [files, setFiles] = useState();
    const [specifications, setSpecifications] = useState([]);
    const [content, setContent] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const history = useHistory();

    const handleClick = () => {

        setShow(true);
    }
    const products = useSelector(selectProducts);

    var catLoading = useSelector(selectLoadingTree);
    var catListLoading = useSelector(categoryLoading);
    var categoryList = useSelector(selectCategoryList);

    const dispatch = useDispatch()




    const methods = useForm({ resolver: yupResolver(schema), defaultValues: { productCategories: [], productSpecifications: [] } });
    var errors = methods.formState.errors;

    const onSubmit = data => {
        data.name = data.name.trim().toLowerCase();
        data.farsiName = data.farsiName.trim().toLowerCase();
        data.images = files;
        // data.specifications = data.specifications.map(item=>item=item.specificationKey)
        dispatch({ type: 'PRODUCT_CREATE_START', payload: data });
       // methods.reset();
       // setFiles(null);
      //  setSpecifications([]);
    };



    useEffect(() => {
        dispatch({ type: "alert/hideAlert" })
        dispatch({ type: "CATEGORY_TREE_FETCH_START" })
        dispatch({ type: "CATEGORY_FETCH_START" })
    }, [])



    const preventNonNumber = (e) => {
        if (!/^\d+$/.test(e.key))
            e.preventDefault();
    }

    const DisplayCategory = () => {
        return categoryList.filter(x => x.id == methods.getValues('productCategory'))[0]?.farsiName
    }



    useEffect(() => {

        if (catLoading || catListLoading) {
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
                                <Button variant="primary" ><label htmlFor="imgfiles" >انتخاب تصویر</label></Button>

                                <input
                                    id="imgfiles"
                                    type="file"
                                    multiple
                                    {...methods.register('image', {
                                        onChange: (e) => {
                                            var imageFiles = [];
                                            var objFiles = e.target.files;
                                            for (var i = 0; i < objFiles.length; i++) {
                                                imageFiles = [... imageFiles,objFiles[i]]
                                            }
                                            setFiles(imageFiles)
                                        }
                                    })}
                                    style={{ visibility: "hidden" }}
                                    accept="image/png, image/jpeg" />
                                <div style={{ height: "40px" }}> {files?.map(x => <div>{x.name}</div>)}</div>
                            </div>
                            <div className="inputErrorStyle">  {errors?.image?.message}</div>
                            <img
                                src={`${methods.getValues("image")}`}
                                alt="MISSING JPG"
                                style={{ maxWidth: "20%" }}
                            />
                            <div className="mb-2 d-flex flex-direction-row">
                                <label >دسته بندی:</label>
                                <Button variant="primary" onClick={handleClick}>
                                    انتخاب دسته بندی
                                </Button>
                                <div className="mr-3">{DisplayCategory()}</div>
                                <CategoryTree show={show} handleClose={handleClose} specifications={specifications} setSpecifications={setSpecifications} />
                                <div className="inputErrorStyle">  {errors?.productSpecifications?.message}</div>

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

                            <button type="submit" className="btn btn-primary" style={{ "float": "left", "width": "20%", "marginTop": "40px" }}>ثبت</button>
                            <button type="button" onClick={history.goBack} className="btn btn-secondary" style={{ "float": "left", "width": "20%", "marginTop": "40px" }}>بازگشت</button>
                        </form>
                    </FormProvider>
                </div>
            )
        }
    }, [catLoading, files, errors, products, catListLoading, specifications, show])
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