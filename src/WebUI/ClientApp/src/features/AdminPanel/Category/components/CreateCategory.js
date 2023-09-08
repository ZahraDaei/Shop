import {
    useHistory
} from 'react-router-dom'; import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from "react";
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { selectCategoryTreeList, selectLoadingTree } from "../../../category/categorySlice";
import Specification from "./Specification";
import { selectAlert } from "../../../alert/alertSlice"

import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { FcExpand } from 'react-icons/fc';
import { BsChevronLeft } from 'react-icons/bs';



export default function CreateCategory() {
    const history = useHistory();

    const [file, setFile] = useState();
    const schema = yup.object().shape({
        name: yup
            .string()
            .required("این فیلد الزامی است!")
            .test("english", "فقط نام انگلیسی مجاز است", (value) => { return /^[a-zA-Z\s-]*$/.test(value); }),
        farsiName: yup.string().required("این فیلد الزامی است!")
            .test("farsi", "فقط نام فارسی مجاز است", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); }),

        image: yup.mixed().test("fileNessesary", "بارگزاری تصویر الزامی است", (value) => { return value?.length })
            .test("fileSize", "حجم فایل بالاتر از حد مجاز است!", (value) => {
                if (value.length)
                    return value[0].size <= 20000
            }),
        firstLevel: yup.boolean(),
        lastLevel: yup.boolean(),
        specifications: yup
            .mixed()
            .when("lastLevel", {
                is: true,
                then: yup.mixed()
                    .test("valueNessesary", "تعریف ویژگی الزامی است", (value) => { return value?.length })
                // .test("farsiValue", "فقط حروف فارسی مجاز است!", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); })
            })



    }).required();

    const methods = useForm({ resolver: yupResolver(schema), defaultValues: { specifications: [], image: [] } });
    var errors = methods.formState.errors;
    const watchShowSpec = methods.watch("lastLevel", false);


    const onSubmit = data => {
        if (data.parentId === undefined) {
            data.parentId = 0;
        }
        data.name = data.name.trim().toLowerCase();
        data.farsiName = data.farsiName.trim().toLowerCase();
        data.image = file;
        data.specifications = data.specifications.map(item => item = item.specificationKey)
        dispatch({ type: 'CATEGORY_CREATE_START', payload: data });
        methods.reset();
        setFile(null);
    };
    const [content, setContent] = useState();

    const dispatch = useDispatch()




    useEffect(() => {
        dispatch({ type: "alert/hideAlert" })
        dispatch({ type: "CATEGORY_TREE_FETCH_START" })

        return () => {
        }
    }, [])



    var productCategories = useSelector(selectCategoryTreeList);
    var loading = useSelector(selectLoadingTree);


    //const renderTree = (nodes) => {
    //    return nodes.map(n =>
    //        <TreeItem key={n.item.id} nodeId={`${n.item.id}`} label={n.item.farsiName}>
    //            {Array.isArray(n.children)
    //                ? renderTree(n.children)
    //                : null}
    //        </TreeItem>
    //    );
    //}


    const renderTree = (nodes) => (
        <TreeItem key={nodes.item.id} nodeId={nodes.item.id} label={nodes.item.farsiName}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    const [imageFile, setImageFile] = useState("/images/placeholder.png");

    function handleChange(e) {
        console.log(e.target.files);
        setFile(e.target.files[0])
        setImageFile(URL.createObjectURL(e.target.files[0]));
    }

    const alert = useSelector(selectAlert);
    if (loading) {
        return <div style={{ display: "flex", alignItems: "center" }}><Spinner animation="border" variant="primary" /></div>
    }
    else {
        return (
            <Container>
                <Alert variant={alert.variant} show={Boolean(alert.variant)} >
                    <div>{alert.message}</div>
                </Alert>
                <div className="d-flex justify-content-center">

                    <div className="borderStyle formStyle w-50" >
                        <FormProvider {...methods} >
                            <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit, (e) => console.log(e))}>
                                <div className=" inputFlexBox" >
                                    <label>نام دسته بندی (انگلیسی):</label>
                                    <input className="inputStyle" autoFocus  {...methods.register("name")} />
                                </div>
                                <div className="inputErrorStyle">  {errors?.name?.message}</div>
                                <div className=" inputFlexBox" >
                                    <label>نام دسته بندی (فارسی):</label>
                                    <input className="inputStyle"   {...methods.register("farsiName")} />
                                </div>
                                <div className="inputErrorStyle">  {errors?.farsiName?.message}</div>
                                <div className="inputBoxStyle">
                                    <label >تصویر:</label>
                                    <Button variant="primary" ><label htmlFor="files" >انتخاب تصویر</label></Button>

                                    <input
                                        id="files"
                                        type="file"
                                        {...methods.register('image', { onChange: (e) => handleChange(e) })}
                                        style={{ visibility: "hidden" }}
                                        accept="image/png, image/jpeg" />
                                    <div style={{ height: "40px" }}> {file?.name}</div>
                                </div>
                                <div className="inputErrorStyle">  {errors?.image?.message}</div>
                             
                                    <img
                                        src={imageFile}
                                        alt="MISSING JPG"
                                        style={{ maxWidth: "20%" }}
                                    />
                                <div className="mb-3">
                                    <label>در صورتی که دسته غیر اصلی تعریف می کنید در زیر دسته آن را انتخاب کنید در غیر این صورت دکمه ثبت را بزنید.</label>
                                </div>

                                <div >
                                    <Controller
                                        name={"parentId"}
                                        control={methods.control}
                                        render={({ field: { onChange, value } }) => (

                                            <TreeView
                                                aria-label="rich object"
                                                defaultCollapseIcon={<FcExpand />}
                                                defaultExpandIcon={<BsChevronLeft />}
                                                onNodeSelect={(e, id) => onChange(id)}
                                                sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                                            >
                                                {renderTree(productCategories)}
                                            </TreeView>
                                        )}

                                    />
                                </div>
                                <div>
                                    <input  {...methods.register("lastLevel")} type="checkbox" />
                                    <label>دسته بندی بعنوان پایین ترین سطح </label>
                                    {watchShowSpec && <Specification />}
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ "float": "left", "width": "20%", "marginTop": "40px" }}>ثبت</button>
                                <button type="button" onClick={history.goBack} className="btn btn-secondary" style={{ "float": "left", "width": "20%", "marginTop": "40px" }}>بازگشت</button>
                            </form>
                        </FormProvider>
                    </div>

                </div>
            </Container>
        );
    }

}