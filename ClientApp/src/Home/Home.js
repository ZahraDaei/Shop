import React from 'react';
import PropTypes from 'prop-types';
import TopPart from './components/TopPart';
import MiddlePart from './components/MiddlePart';
import LastPart from './components/LastPart';

const Home = (props) => {
  return <div>
      <TopPart/>
      <MiddlePart/>
  </div>;
};

Home.propTypes = {};

export default Home;
