import React from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-bootstrap";

const Caro = (props) => {

    const caroImgs = [
        { src:"01._coffee_machine_depot_usa_-_fiorenzato_f64_jaxo.jpg",h:"",p:""},
        //{ src:"ceado-e37k-conical-coffee-grinder-jaxo5.jpg",h:"",p:""},
        { src:"Cimbali-CMonDemand-jaxo.jpg",h:"",p:""},
        { src:"Cimbali-Magnum-onDemand-jaxo.jpg",h:"",p:""},
        { src:"coffee_machine_fiorenzato_f64evo_jaxo.jpg",h:"",p:""},
        { src:"coffee-grinder-WPM-ZD-18-black-jaxo.jpg",h:"",p:""},
        { src:"GRINDER_SIMONELLI_MDX_JAXO.jpg",h:"",p:""},
        { src:"mahlkonig_ek43_jaxo-1.jpg",h:"",p:""},
        { src:"mahlkoning_k30_vario_jaxo.jpg",h:"",p:""},
        { src:"MITO-ON-DEMAND-75-jaxo.jpg",h:"",p:""},
    ]

    return (
        <div className="homeCaro">
          <Carousel>
              {caroImgs.map((item, index) =>               
                  <Carousel.Item key={ index}>
          <img
            width="50%"
            height="50%"
            className="d-block w-100"
            src={`images/product/${item.src}`}
            alt={`images/product/${item.src}`}
          />
          <Carousel.Caption>
                          <h3 style={{ color: "white" }}>{item.h }</h3>
                          <p style={{ color: "white" }}>{item.p }</p>
          </Carousel.Caption>
        </Carousel.Item>
)}

      </Carousel>
    </div>
  );
};

Caro.propTypes = {};

export default Caro;
