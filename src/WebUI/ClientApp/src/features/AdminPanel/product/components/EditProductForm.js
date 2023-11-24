import {
    useHistory
} from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { selectCategoryList } from "features/category/categorySlice";
import React, { useState ,useEffect} from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CategoryTree from "./CategoryTree";
import {editSchema} from "./schema";
import { AiOutlineDelete } from "react-icons/ai";

import { selectProductById } from "features/products/productSlice";
import { selectAlert } from "features/alert/alertSlice";


export default function EditProductForm() {

    const product = useSelector(selectProductById);
    const alert = useSelector(selectAlert);
    const history = useHistory();
    const [files, setFiles] = useState();
    const [specifications, setSpecifications] = useState([]);
    const [show, setShow] = useState(false);
    const [editImages, setEditImages] = useState(product.images);
    const handleClose = () => setShow(false);
    useEffect(() => {
        setEditImages(product.images);
        setFiles(null);
    }, [product])

    const handleClick = () => {
        setShow(true);
    }

    var categoryList = useSelector(selectCategoryList);

    const dispatch = useDispatch()
    var schema = editSchema(editImages);
    const methods = useForm({
        resolver: yupResolver(schema), defaultValues: {
            //productCategories: [],
            //productSpecifications: [],
            name: product?.name,
            farsiName: product?.farsiName,
            brandName: product?.brandName,
            price: product?.price,
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
        //const formData = new FormData();
        //for (var i = 0; i < files.length; i++) {
        //    formData.Append(`image[${i}]`, files[i])
        //}
        var fileParameters = [];
        for (var i = 0; i < files?.length; i++) {
            fileParameters.push({ data: files[i], fileName: files[i].name  })
        }
        data.image = fileParameters;

        data.removedImages = product.images?.filter(x => !editImages.includes(x));
//console.log("focoha", removedImgs);
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


    const RemoveImage = (e,item) => {
        var index = editImages.indexOf(item);
        var imgs = editImages.filter(function (image) {
            return image !== item
        });
        setEditImages(imgs);
    }

    return <Container>
        <Alert variant={alert.variant} show={Boolean(alert.variant)} >
            <div>{alert.message}</div>
        </Alert>
        <div className="d-flex justify-content-center">
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
                                multiple
                                type="file"
                                {...methods.register("image", { onChange: (e) => setFiles(e.target.files) })}
                                style={{ visibility: "hidden" }}
                                accept="image/*" />
                            <div style={{ height: "40px" }}>
                                {
                                    files && Object.values(files).map(x => <span style={{marginRight:"10px"} }>{x.name}</span>)

                                }</div>
                        </div>
                        <div className="inputErrorStyle">  {errors?.image?.message}</div>
                        <div className=" d-flex flex-row m-2" style={{flexWrap:'wrap', overflow:'scroll', maxHeight:'200px'}}>
                            {editImages?.map((x,index) =>
                                <div key={index } className="border border-secondary rounded text-center m-2" style={{ maxWidth: "20%" }}>
                                    <AiOutlineDelete style={{ height: "20%", width: "20%",cursor:"pointer" }} onClick={(e)=>RemoveImage(e,x)} />
                                    <img
                                        src={`/images/product/${x}`}
                                        alt={product.name}
                                        style={{ maxWidth: "100%", maxHeight: "75%" }}
                                    />
                                </div>
                            )
                            }
                        </div>
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
        </div>
    </Container>

}