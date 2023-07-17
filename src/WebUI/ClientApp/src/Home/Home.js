import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TopPart from './components/TopPart';
import MiddlePart from './components/MiddlePart';
import LastPart from './components/LastPart';
import { useDispatch } from "react-redux";


const Home = (props) => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch({ type: 'PRODUCT_FETCH_START' });
        dispatch({ type: 'PRODUCT_CATEGORY_LIST_FETCH_START' });
    }, [])
  return <div>
      <TopPart/>
      <MiddlePart/>
  </div>;
};

Home.propTypes = {};

export default Home;
