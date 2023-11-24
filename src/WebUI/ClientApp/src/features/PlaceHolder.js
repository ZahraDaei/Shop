import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PlaceHolder = ({  }) => {
    return (
        <div className="productCard">
                <img src={`/images/placeholder.png`} style={{ maxWidth: "100%" }} />
            <div style={{ padding: "20px" }}>
                <div style={{ backgroundColor:"#d3d0d0",width:"100%",height:"20px",margin:"10px 0",borderRadious:"5px" }}></div>
                <div style={{ backgroundColor:"#d3d0d0",width:"100%",height:"20px",margin:"10px 0",borderRadious:"5px" }}></div>
                <div style={{ backgroundColor:"#d3d0d0",width:"100%",height:"20px",margin:"10px 0",borderRadious:"5px" }}></div>
               
            </div>
        </div>
    );
};


export default PlaceHolder;
