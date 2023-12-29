import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TopPart from './components/TopPart';
import MiddlePart from './components/MiddlePart';
import LastPart from './components/LastPart';
import { useDispatch } from "react-redux";
import "./Home.css";

const Home = (props) => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch({ type: 'PRODUCT_FETCH_START' });
        dispatch({ type: 'PRODUCT_CATEGORY_LIST_FETCH_START' });
    }, [])
    return <>
        <div className="fixedBgTop">
            <div className="insideFiexedBg">
                <p>
                    فروشگاه شهزاد
                </p>
            </div>
        </div>
        <TopPart />
        <MiddlePart />

        <div className="fixedBgBottom">
            <div className="insideFiexedBg" style={{ justifyContent: "center", fontSize: "40px", textAlign:"center" }}>
                <p >
                    واردکننده تجهیزات کارگاهی
                </p>
            </div>
        </div>

    </>
};

Home.propTypes = {};

export default Home;
