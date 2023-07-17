import React,{useState} from "react";
import PropTypes from "prop-types";
import UserInfoBox from "./UserInfoBox";
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BiEditAlt } from "react-icons/bi";
import { hideAlert, selectAlert } from "../../../alert/alertSlice";
import ModalBox from "./ModalBox"

const ChangeEmail = (props) => {
  
  const [show,setShow]=useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const dispatch = useDispatch();
  const schema = yup
    .object()
    .shape({
      name: yup
        .string()
        .required("این فیلد الزامی است!")
        .test("english", "فقط نام انگلیسی مجاز است", (value) => {
          return /^[a-zA-Z\s-]*$/.test(value);
        }),
      farsiName: yup
        .string()
        .required("این فیلد الزامی است!")
        .test("farsi", "فقط نام فارسی مجاز است", (value) => {
          return /^[\u0600-\u06FF\s]+$/.test(value);
        }),
      brandName: yup
        .string()
        .required("این فیلد الزامی است!")
        .test("farsi", "فقط نام فارسی مجاز است", (value) => {
          return /^[\u0600-\u06FF\s]+$/.test(value);
        }),
      description: yup
        .string()
        .required("این فیلد الزامی است!")
        .test("farsi", "فقط حروف فارسی مجاز است", (value) => {
          return /^[\u0600-\u06FF\s]+$/.test(value);
        }),
      shortDescription: yup
        .string()
        .required("این فیلد الزامی است!")
        .test("farsi", "فقط حروف فارسی مجاز است", (value) => {
          return /^[\u0600-\u06FF\s]+$/.test(value);
        }),
      price: yup
        .string()
        .required("این فیلد الزامی است!")
        .test("price", "قیمت را به درستی وارد کنید!", (value) => {
          return /^[1-9]\d*$/.test(value);
        }),

      productSpecifications: yup
        .mixed()
        .test(
          "lastLevelSelection",
          "انتخاب دسته بندی نهایی الزامی است",
          (value) => {
            return Object.keys(value).length !== 0;
          }
        )
        .test(
          "productSpecifications",
          "هر ویژگی بایستی دارای مقدار باشد!",
          (value) => {
            return Object.values(value).length === Object.keys(value).length;
          }
        ),

      productCategories: yup
        .mixed()
        .test("productCategories", "انتخاب دسته بندی الزامی است", (value) => {
          return value?.length;
        }),

      image: yup
        .mixed()
        .test("fileNessesary", "بارگزاری تصویر الزامی است", (value) => {
          return value?.length;
        })
        .test("fileSize", "حجم فایل بالاتر از حد مجاز است!", (value) => {
          if (value.length) return value[0].size <= 100000;
        }),
    })
    .required();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { productCategories: [], productSpecifications: [] },
  });
  var errors = methods.formState.errors;
  //const watchShowSpec = methods.watch("categoryId", false);

  const onSubmit = (data) => {
    // data.name = data.name.trim().toLowerCase();
    // data.farsiName = data.farsiName.trim().toLowerCase();
    //data.image = file;
    // dispatch({ type: 'PRODUCT_CREATE_START', payload: data });
    methods.reset();
  };

  return (
    <>
      <UserInfoBox text="ایمیل"  handleShow={handleShow}  />
      <ModalBox show={show} handleClose={handleClose}>
        <form autoComplete="off">
          <div className="form-row">
            <div
              className="form-group col-md-6 "
              style={{ textAlign: "right" }}
            >
              <label for="inputEmail4">ایمیل</label>
              <input
                type="email"
                className="form-control "
                id="inputEmail4"
                placeholder="Email"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            ثبت
          </button>
        </form>
      </ModalBox>
    </>
  );
};

ChangeEmail.propTypes = {};

export default ChangeEmail;
