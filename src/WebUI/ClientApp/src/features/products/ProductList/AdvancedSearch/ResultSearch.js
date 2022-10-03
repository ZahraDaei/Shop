import React, { useState } from "react";
import PropTypes from "prop-types";
import Wrapper from "./Wrapper";
import { CloseButton } from "react-bootstrap";

const ResultSearch = () => {
  const [close, setClose] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const changeHandle = (e) => {
    var value = e.target.value;
    setClose(true);
    setSearchValue(value);
  };

  const closeHandle = () => {
    setSearchValue(null);
    setClose(false);
  };

  return (
    <Wrapper title="جستجو در نتایج:">
      <div className="inputBox">
        <input
          value={searchValue || ""}
          onChange={changeHandle}
          placeholder="نام محصول یا برند مورد نظر را بنویسید"
        />
        <span>{close ? <CloseButton onClick={closeHandle} /> : null}</span>
      </div>
    </Wrapper>
  );
};

ResultSearch.propTypes = {};

export default ResultSearch;
