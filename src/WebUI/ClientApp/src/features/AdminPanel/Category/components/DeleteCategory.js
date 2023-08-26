import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux'
function DeleteCategory({ show, handleClose, id }) {
    var dispatch = useDispatch();
    const handleDelete = () => {
        dispatch({ type: "CATEGORY_DELETE_START", payload: id });
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header >
                    <Modal.Title>حذف دسته بندی</Modal.Title>
                </Modal.Header>
                <Modal.Body>آیا از حذف این دسته بندی مطمئن هستید؟</Modal.Body>
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

export default DeleteCategory;