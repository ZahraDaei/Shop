import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const ModalBox=({handleClose,show,children})=> {
 

  return (
    <>    
      <Modal  show={show} onHide={handleClose}>        
      <Modal.Header closeButton>
      </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalBox;

