import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { selectCategoryList, selectCategoryTreeList } from "features/category/categorySlice";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useFormContext } from "react-hook-form";
import { BsChevronLeft } from 'react-icons/bs';
import { FcExpand } from 'react-icons/fc';
import { useSelector } from "react-redux";
import showSpecifications from "./showSpecifications";


const CategoryTree = ({ show, handleClose, specifications, setSpecifications }) => {
    var productCategories = useSelector(selectCategoryTreeList);
    var categoryList = useSelector(selectCategoryList);

    const methods = useFormContext() // retrieve those props
    var errors = methods.formState.errors;

    const renderTree = (nodes) => (
        <TreeItem key={nodes.item.id} nodeId={`${nodes.item.id}`} label={nodes.item.farsiName}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    const categorySpecificationHandel = (id) => {

        var cat = categoryList.filter(c => c.id == id);
        if (cat.length != 0) {

            if (cat[0].specifications.length != 0) {
                var productSpecArr = cat[0].specifications.map(item => (
                    { id: item.id, value: null })
                )
                methods.setValue('productSpecifications', productSpecArr)
                setSpecifications(cat[0].specifications)
            }
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header >
                    <Modal.Title>انتخاب دسته بندی</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <div >
                        <p>دسته بندی کالا</p>
                        <Controller
                            name={"productCategory"}
                            control={methods.control}
                            render={({ field: { onChange, value } }) => (

                                <TreeView
                                    aria-label="rich object"
                                    defaultCollapseIcon={<FcExpand />}
                                    defaultExpandIcon={<BsChevronLeft />}

                                    onNodeSelect={(e, id) => { categorySpecificationHandel(id); onChange(id); }}
                                    sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                                >
                                    {renderTree(productCategories)}
                                </TreeView>
                            )}
                        />
                        <div className="inputErrorStyle">  {errors?.productCategory?.message}</div>

                    </div>
                    <div style={{ margin: "20px 0", display: "flex", flexDirection: "column" }}>
                        {specifications.length != 0 && <span>ویژگی های محصول:</span>}
                        {specifications.length != 0 && showSpecifications(methods, specifications)}
                    </div>
                    <div className="inputErrorStyle">  {errors?.productSpecifications?.message}</div>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        بازگشت
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        ثبت
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CategoryTree;