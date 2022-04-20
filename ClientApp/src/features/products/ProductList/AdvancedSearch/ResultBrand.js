import React from "react";
import PropTypes from "prop-types";
import Wrapper from "./Wrapper";
import { brands } from "../../../data";

const ResultBrand = () => {
  const filterBrand = (e) => {
    var name = e.target.name;
    console.log(name);
  };
  return (
    <Wrapper title="برند">
      {brands.map((item, key) => (
        <div key={key}
          style={{
            marginBottom: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "1px solid #80808021",
          }}
        >
          <p>
            <span style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                id="music"
                name={item.englishName}
                onChange={filterBrand}
              />
            </span>
            <span>{item.name}</span>
          </p>
          <p>
            <span style={{ fontSize: "smaller" }}>{item.englishName}</span>
          </p>
        </div>
      ))}
    </Wrapper>
  );
};

ResultBrand.propTypes = {};

export default ResultBrand;
