import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux'
function DeleteProduct({ show, handleClose, id }) {
    var dispatch = useDispatch();
    const handleDelete = () => {
        dispatch({ type: "PRODUCT_DELETE_START", payload: id });
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header >
                    <Modal.Title>حذف محصول</Modal.Title>
                </Modal.Header>
                <Modal.Body>آیا از حذف این محصول مطمئن هستید؟</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        بازگشت
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        حذف
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteProduct;