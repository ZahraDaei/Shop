import {
    useHistory
} from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { selectAlert } from "features/alert/alertSlice";
import { selectCategoryList, selectCategoryById, selectLoadingCategory, selectLoading as categoryLoading, selectLoadingTree } from "features/category/categorySlice";

import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import schema from "./schema";

export default function EditCategory() {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")

    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "alert/hideAlert" })
        dispatch({ type: "GET_CATEGORY_BY_ID_START", payload: id })
        //dispatch({ type: "CATEGORY_TREE_FETCH_START" })
        //dispatch({ type: "CATEGORY_FETCH_START" })
    }, [])
    const category = useSelector(selectCategoryById);
    const loading = useSelector(selectLoadingCategory);

    const [file, setFile] = useState();
    const [specifications, setSpecifications] = useState([]);
    const [content, setContent] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleClick = () => {

        setShow(true);
    }


    var catLoading = useSelector(selectLoadingTree);
    var catListLoading = useSelector(categoryLoading);
    var categoryList = useSelector(selectCategoryList);

    const dispatch = useDispatch()




    const methods = useForm({
        resolver: yupResolver(schema), defaultValues: {
            name: category?.name,
            farsiName: category?.farsiName,
            image: category?.image,
            specifications: category?.specifications,
            parentId: category?.parentId,
            content: category?.content           
        }
    });
    var errors = methods.formState.errors;

    const onSubmit = data => {
        data.id = category.id;
        if (data.parentId === undefined) {
            data.parentId = 0;
        }
        data.name = data.name.trim().toLowerCase();
        data.farsiName = data.farsiName.trim().toLowerCase();
        data.image = file;
        data.specifications = data.specifications.map(item => item = item.specificationKey)
        dispatch({ type: 'CATEGORY_UPDATE_START', payload: data });

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
                                    {...methods.register('image', { onChange: (e) => setFile(e.target.files[0]) })}
                                    style={{ visibility: "hidden" }}
                                    accept="image/png, image/jpeg" />
                                <div style={{ height: "40px" }}> {file?.name}</div>
                            </div>
                            <div className="inputErrorStyle">  {errors?.image?.message}</div>

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
            )        }
    }, [catLoading, file, errors, catListLoading, specifications, show, loading])
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