import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import { MdExpandMore } from 'react-icons/md';
import { BiChevronLeft} from 'react-icons/bi';
import TreeItem from '@mui/lab/TreeItem';
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryTreeList, selectLoadingTree } from "../../../category/categorySlice"



export default function Tree() {
        var data = useSelector(selectCategoryTreeList);
   
        const renderTree = (nodes) => (
            <TreeItem key={nodes.Id} nodeId={nodes.Id} label={nodes.FarsiName}>
                {Array.isArray(nodes.Children)
                    ? nodes.Children.map((node) => renderTree(node))
                    : null}
            </TreeItem>
        );

        return (<>
            { useSelector(selectLoadingTree) ? < div > loading</div > :
                <TreeView
                    aria-label="rich object"
                    defaultCollapseIcon={<MdExpandMore />}
                    defaultExpanded={['root']}
                    defaultExpandIcon={<BiChevronLeft />}
                    sx={{ flexGrow: 1 }}
                >
                    {renderTree(data)}
                </TreeView>
            }
            </>
        
        );
    
    
   
}
