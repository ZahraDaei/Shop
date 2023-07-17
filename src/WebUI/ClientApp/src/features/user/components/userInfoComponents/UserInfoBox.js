import React from "react";
import PropTypes from "prop-types";
import { BiEditAlt } from "react-icons/bi";


const UserInfoBox = ({text,handleShow,info}) => {
  return (
    <>
      <div>
        <p className="text-secondary">{text}</p>
        <p>{info}</p>
      </div>
      <div className="align-self-center">
        <button
          type="button"
          className="btn btn-link text-secondary"
          onClick={handleShow}
        >
          <BiEditAlt size={20} />
        </button>
      </div>
    </>
  );
};

UserInfoBox.propTypes = {};

export default UserInfoBox;
