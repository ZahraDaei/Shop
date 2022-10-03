import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from "react";
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { selectCategoryList, selectLoading } from "../../../category/categorySlice";
import Specification from "./Specification";
import { hideAlert, selectAlert } from "../../../alert/alertSlice"


export default function CreateCategory() {
    const [file, setFile] = useState();
    const schema = yup.object().shape({
        name: yup
            .string()
            .required("این فیلد الزامی است!")
            .test("english", "فقط نام انگلیسی مجاز است", (value) => { return /^[a-zA-Z\s]*$/.test(value); }),
        farsiName: yup.string().required("این فیلد الزامی است!")
            .test("farsi", "فقط نام فارسی مجاز است", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); }),

        image: yup.mixed().test("fileNessesary", "بارگزاری تصویر الزامی است", (value) => { return value?.length })
            .test("fileSize", "حجم فایل بالاتر از حد مجاز است!", (value) => {
                if (value.length)
                    return value[0].size <= 20000
            }),
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

    const methods = useForm({ resolver: yupResolver(schema), defaultValues: { specifications: [], image:[]} });
    var errors = methods.formState.errors;
    const watchShowSpec = methods.watch("lastLevel", false);
    //// Callback version of watch.  It's your responsibility to unsubscribe when done.
    //React.useEffect(() => {
    //    const subscription = methods.watch((value, { name, type }) => console.log(value, name, type));
    //    return () => subscription.unsubscribe();
    //}, [methods.watch]);

    const onSubmit = data => {
        data.name = data.name.trim().toLowerCase();
        data.farsiName = data.farsiName.trim().toLowerCase();
        data.image = file;
        data.specifications = data.specifications.map(item=>item=item.specificationKey)
        dispatch({ type: 'CATEGORY_CREATE_START', payload: data });
        methods.reset();
        setFile(null);
    };
    const [content, setContent] = useState();
    const categories = useSelector(selectCategoryList);
    const loading = useSelector(selectLoading);

    const dispatch = useDispatch()




    useEffect(() => {
        dispatch({ type: 'CATEGORY_FETCH_START' });

        return () => {
            hideAlert();
        }
    }, [])




    useEffect(() => {

        if (loading) {
            setContent(<div style={{ display: "flex", alignItems: "center" }}><Spinner animation="border" variant="primary" /></div>)
        } else {
            setContent(
                <div className="borderStyle formStyle" >
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

                        <div >
                            <label >سر دسته:</label>
                                <select className="inputStyle"  {...methods.register("parentId")}>
                                <option value="0">ندارد</option>
                                {categories.map((item, index) => <option key={index} value={item.id}>{item.farsiName}</option>)}
                            </select>
                        </div>
                            <div>
                                <input  {...methods.register("lastLevel")} type="checkbox"/>
                                <label>دسته بندی بعنوان پایین ترین سطح </label>
                                {watchShowSpec && <Specification />}
                        </div>
                        <Button style={{ float: "left", width: "100%", marginTop: "40px" }} type="submit" >ثبت</Button>
                        </form>
                    </FormProvider>
                </div>
            )
        }
    }, [loading, file, errors, watchShowSpec, categories])
    return (
        <Container>
            <Alert variant={useSelector(selectAlert).variant} show={Boolean(useSelector(selectAlert).variant)} >
                <div>{useSelector(selectAlert).message }</div>
                </Alert>
            <div style={{ display: "flex", justifyContent: "center" }}>

                {content}
            </div>
        </Container>
    );

}