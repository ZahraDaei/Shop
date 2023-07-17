import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BiEditAlt } from "react-icons/bi";
import { hideAlert, selectAlert } from "../../alert/alertSlice";
import ModalBox from "./userInfoComponents/ModalBox";
import Phone from "./userInfoComponents/Phone";
import Email from "./userInfoComponents/Email";
import Password from "./userInfoComponents/Password";
import Payback from "./userInfoComponents/Payback";
import BirthDate from "./userInfoComponents/BirthDate";
import Career from "./userInfoComponents/Career";
import Name from "./userInfoComponents/Name";
import IdCode from "./userInfoComponents/IdCode";
const UserInfo = (props) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const modals = {
    Name: "نام و نام خانوادگی",
    Id: "کد ملی",
    phone: "شماره موبایل",
    email: "ایمیل",
    password: "رمز عبور",
    sheba: "روش بازگرداندن پول من",
    birthDate: "تاریخ تولد",
    career: "شغل",
  };

  return (
    <>
      <Row className="border rounded p-3">
        <div className="container">
          <div className="row">
            <div className="col border-start border-bottom d-flex justify-content-between p-2 overflow-hidden">
              <Name />
            </div>
            <div className="col border-bottom d-flex justify-content-between p-2 overflow-hidden">
              <IdCode />
            </div>
            <div className="w-100 d-flex  justify-content-between"></div>
            <div className="col border-start d-flex border-bottom justify-content-between p-2 overflow-hidden">
              <Phone />
            </div>
            <div className="col d-flex border-bottom justify-content-between p-2">
              <Email />
            </div>
          </div>
          <div className="row">
            <div className="col border-start border-bottom d-flex justify-content-between p-2 overflow-hidden">
              <Password />
            </div>
            <div className="col border-bottom d-flex justify-content-between p-2">
              <Payback />
            </div>
            <div className="w-100 d-flex justify-content-between"></div>
            <div className="col border-start d-flex justify-content-between p-2 overflow-hidden">
              <BirthDate />
            </div>
            <div className="col d-flex justify-content-between p-2">
              <Career />
            </div>
          </div>
        </div>
      </Row>

    </>
  );
};

UserInfo.propTypes = {};

export default UserInfo;
