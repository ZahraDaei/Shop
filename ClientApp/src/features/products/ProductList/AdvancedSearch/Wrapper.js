import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = ({title,children}) => {
  return (
    <div style={{textAlign:"right",marginBottom:"15px",lineHeight:"15px",backgroundColor:"white",border:"1px solid #80808036",padding:"4px",borderRadius:"5px",color:"grey",}}>
    <p style={{fontWeight:"bold",padding:"5px 10px 0 10px"}}>{title}</p>
          <hr />
          <div style={{ padding: "0 10px 10px 10px" }}>
    {children}
    </div>
      </div>);
  
};

Wrapper.propTypes = {};

export default Wrapper;
