import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from "react";
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { selectProducts, selectLoading as productLoading } from "../../../products/productSlice";
import { selectCategoryList, selectLoading as categoryLoading } from "../../../category/categorySlice";
import Specification from "./Specification";
import { hideAlert, selectAlert } from "../../../alert/alertSlice"
import Tree from "./Tree.js";

export default function CreateProduct() {
    const [file, setFile] = useState();
    const schema = yup.object().shape({
        name: yup
            .string()
            .required("این فیلد الزامی است!")
            .test("english", "فقط نام انگلیسی مجاز است", (value) => { return /^[a-zA-Z\s]*$/.test(value); }),
        farsiName: yup.string().required("این فیلد الزامی است!")
            .test("farsi", "فقط نام فارسی مجاز است", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); }),
        brandName: yup.string().required("این فیلد الزامی است!")
            .test("farsi", "فقط نام فارسی مجاز است", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); }),
        description: yup.string().required("این فیلد الزامی است!")
            .test("farsi", "فقط حروف فارسی مجاز است", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); }),
        shortDescription: yup.string().required("این فیلد الزامی است!")
            .test("farsi", "فقط حروف فارسی مجاز است", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); }),
        price: yup.string().required("این فیلد الزامی است!")
            .test("price", "قیمت را به درستی وارد کنید!", (value) => { return /^[1-9]\d*$/.test(value); }),

        productSpecifications: yup.mixed()
            .test("lastLevelSelection", "انتخاب دسته بندی نهایی الزامی است", (value) => { return Object.keys(value).length !== 0 })
            .test("productSpecifications", "هر ویژگی بایستی دارای مقدار باشد!", (value) => { return Object.values(value).length === Object.keys(value).length }),

        productCategories: yup.mixed().test("productCategories", "انتخاب دسته بندی الزامی است", (value) => { return value?.length }),

        image: yup.mixed().test("fileNessesary", "بارگزاری تصویر الزامی است", (value) => { return value?.length })
            .test("fileSize", "حجم فایل بالاتر از حد مجاز است!", (value) => {
                if (value.length)
                    return value[0].size <= 100000
            }),
    }).required();
    const [categoryContent, setCategoryContent] = useState([]);


    const [content, setContent] = useState();
    const products = useSelector(selectProducts);
    const categories = useSelector(selectCategoryList);
    const catLoading = useSelector(categoryLoading);
    const proLoading = useSelector(productLoading);
    const selectOption = (e) => {
        let category = [...categoryContent];
        console.log("fina", e.target.value, typeof (category), category)
        category.push(<div id={e.target.value}>ass</div>)
        setCategoryContent(category)
    }
    useEffect(() => {
        console.log("tootia", typeof (categoryContent))
        if (Boolean(categories)) {
            var parent = categories.filter(c => c.parentId === 0)[0];
            var children = categories.filter(c => c.parentId === parent.id);
            let category = [];
            category.push(<select id="m" onChange={selectOption}>{children.map((c, i) => <option value={c.id} key={i}>{c.farsiName}</option>)}</select>)
            setCategoryContent(category)

        }

    }, [categories])



    const methods = useForm({ resolver: yupResolver(schema), defaultValues: { productCategories: [], productSpecifications: {} } });
    var errors = methods.formState.errors;
    //const watchShowSpec = methods.watch("lastLevel", false);
    //// Callback version of watch.  It's your responsibility to unsubscribe when done.
    //React.useEffect(() => {
    //    const subscription = methods.watch((value, { name, type }) => console.log(value, name, type));
    //    return () => subscription.unsubscribe();
    //}, [methods.watch]);

    const onSubmit = data => {
        data.name = data.name.trim().toLowerCase();
        data.farsiName = data.farsiName.trim().toLowerCase();
        data.image = file;
        console.log("ddd", data);
        //data.specifications = data.specifications.map(item=>item=item.specificationKey)
        // dispatch({ type: 'PRODUCT_CREATE_START', payload: data });
        //  methods.reset();
        //   setFile(null);
    };


    const dispatch = useDispatch()




    useEffect(() => {
        dispatch({ type: 'CATEGORY_FETCH_START' });

        return () => {
            hideAlert();
        }
    }, [])


    const preventNonNumber = (e) => {
        if (!/^\d+$/.test(e.key))
            e.preventDefault();
    }

    useEffect(() => {

        if (catLoading) {
            setContent(<div style={{ display: "flex", alignItems: "center" }}><Spinner animation="border" variant="primary" /></div>)
        } else {
            setContent(
                <div className="borderStyle formStyle" >
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
                                <div style={{ height: "40px" }}> {file?.name}</div>
                            </div>
                            <div className="inputErrorStyle">  {errors?.image?.message}</div>


                            <div id="select" style={{ width: "100%", height: "200px", overflowY: "auto" }}>
                                {categoryContent}

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

                            <Button style={{ float: "left", width: "100%", marginTop: "40px" }} type="submit" >ثبت</Button>
                        </form>
                    </FormProvider>
                </div>
            )
        }
    }, [catLoading, file, errors, products, categories, categoryContent])
    return (
        <Container>
            <Alert variant={useSelector(selectAlert).variant} show={Boolean(useSelector(selectAlert).variant)} >
                <div>{useSelector(selectAlert).message}</div>
            </Alert>
            <div style={{ display: "flex", justifyContent: "center", height: "1000px" }}>
                {content}
            </div>
        </Container>
    );

}