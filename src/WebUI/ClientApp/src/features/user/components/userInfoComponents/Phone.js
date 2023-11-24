import React,{useState} from "react";
import PropTypes from "prop-types";
import ModalBox from "./ModalBox";
import UserInfoBox from "./UserInfoBox";

const Phone = (props) => {
  const [show,setShow]=useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  return (<>
    <UserInfoBox
    text="شماره همراه"
      handleShow={handleShow}  />

    <ModalBox show={show} handleClose={handleClose}>
      <div>
        <form autoComplete="off">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputPhone">شماره همراه</label>
              <input type="text" class="form-control" id="inputPhone" />
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

Phone.propTypes = {};

export default Phone;
