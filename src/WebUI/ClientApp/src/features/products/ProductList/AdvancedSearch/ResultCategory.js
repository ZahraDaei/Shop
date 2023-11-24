import React, { useEffect } from "react";
import { selectCategoryTreeList, selectLoadingTree, selectCategoryList} from "../../../category/categorySlice";
import Wrapper from "./Wrapper";
import TreeView from '@mui/lab/TreeView';
import { MdExpandMore } from 'react-icons/md';
import { BiChevronLeft } from 'react-icons/bi';
import TreeItem from '@mui/lab/TreeItem';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ResultCategory = ({ categoryName }) => {

    var history = useHistory();
    var dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState([10023]);
    const [selected, setSelected] = React.useState([]);
    const categories = useSelector(selectCategoryList);
    //const catLoading = useSelector(categoryLoading);
    const handleToggle = (event, nodeIds) => {

        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        var cat = categories.filter(c => c.id === nodeIds)[0];
        history.push(cat.name);
        setSelected(nodeIds);
    };
    useEffect(() => {
        dispatch({ type: "CATEGORY_TREE_FETCH_START" });
        dispatch({ type: 'CATEGORY_FETCH_START' });

    },[])

    var data = useSelector(selectCategoryTreeList);

    const renderTree = (nodes) => (
        <TreeItem key={nodes.Id} nodeId={nodes.Id} label={nodes.FarsiName}>
            {Array.isArray(nodes.Children)
                ? nodes.Children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    return (<>
        <Wrapper title="دسته بندی نتایج">
            {useSelector(selectLoadingTree) ? < div > loading</div > :
                <TreeView
                    aria-label="rich object"
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleSelect}
                    defaultCollapseIcon={<MdExpandMore />}
                    defaultExpandIcon={<BiChevronLeft />}
                    defaultExpanded={[10023]}

                    expanded={expanded}
                    selected={selected}
                    sx={{ height: 100, maxHeight: 300, flexGrow: 1, maxWidth: 1000, overflowX: 'auto', overflowY: 'auto' }}
                >
                    {renderTree(data)}
                </TreeView>
            }
        </Wrapper>
    </>

    );
    //  var category = useSelector(selectSubCategory)
    //  var mainCategory = useSelector(selectMainCategory)
    //  var margin = -30;

    //return (
    //  <Wrapper title="دسته بندی نتایج">
    //    {mainCategory.map((item, index) => {
    //      margin += 20;
    //      return (
    //        <ul key={index} className="categorySteps" style={{ marginRight: `${margin}px`,
    //        fontWeight:item.name==categoryName?"bold":"normal"}}>
    //              <span><Link to={`/${item?.name}`}>{item?.farsiName}</Link></span>
    //        </ul>
    //      );
    //    })}
    //    <ul style={{ marginRight: `${margin+20}px`, listStyle: "none", }}>
    //      {category.map((item, index) => (
    //        <li key={index} style={{marginBottom:"10px",
    //              fontWeight: item.name == categoryName ? "bold" : "normal"
    //          }}><Link to={`/${item.name}`}>{item.farsiName}</Link></li>
    //      ))}
    //    </ul>
    //  </Wrapper>
    //);
};

ResultCategory.propTypes = {};

export default ResultCategory;
