import React,{useState} from 'react'
import PropTypes from 'prop-types'

const Career = props => {
    const [show,setShow]=useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
      setShow(true);
    };
  return (
    <div>Career</div>
  )
}

Career.propTypes = {}

export default Career