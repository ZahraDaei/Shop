import React,{useState} from "react";
import PropTypes from "prop-types";
import ModalBox from "./ModalBox";
import UserInfoBox from "./UserInfoBox";

const Payback = (props) => {
  const [show,setShow]=useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
    <UserInfoBox
    handleShow={handleShow} 
    text="شماره شبا" />
    <ModalBox show={show} handleClose={handleClose}>
      <div>
        <form autoComplete="off">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputPassword4">رمز عبور</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary">
            ثبت
          </button>
        </form>
      </div>
    </ModalBox>
    </>
  );
};

Payback.propTypes = {};

export default Payback;
