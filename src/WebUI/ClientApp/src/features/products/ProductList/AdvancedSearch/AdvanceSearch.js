import React from 'react';
import PropTypes from 'prop-types';
import ResultCategory from './ResultCategory';
import ResultSearch from './ResultSearch';
import ResultBrand from './ResultBrand';
import ResultPrice from './ResultPrice';
import ResultStore from './ResultStore';



const AdvanceSearch = ({categoryName}) => {
  return (
  <div style={{margin:"20px"}}>
      <ResultSearch  />
      <ResultBrand />
      <ResultStore />
      <ResultPrice />      
  </div>
  )
};

AdvanceSearch.propTypes = {};

export default AdvanceSearch;
