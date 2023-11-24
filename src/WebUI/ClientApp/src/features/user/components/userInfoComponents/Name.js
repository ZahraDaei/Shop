import React,{useState} from "react";
import PropTypes from "prop-types";
import ModalBox from "./ModalBox";
import UserInfoBox from "./UserInfoBox";

const Name = (props) => {
  const [show,setShow]=useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
     <UserInfoBox
      handleShow={handleShow} 
      text="نام و نام خانوادگی"
      />
    <ModalBox show={show} handleClose={handleClose}>
      <div>
        <form autoComplete="off">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputFirstName">نام</label>
              <input type="text" class="form-control" id="inputFirstName" />
            </div>

            <div class="form-group col-md-6">
              <label for="inputLastName">نام خانوادگی</label>
              <input type="text" class="form-control" id="inputLastName" />
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

Name.propTypes = {};

export default Name;
