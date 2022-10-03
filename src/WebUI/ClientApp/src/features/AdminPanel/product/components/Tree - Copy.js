import React, { useState } from 'react';
import TreeView from 'react-treeview';

// This example data format is totally arbitrary. No data massaging is
// required and you use regular js in `render` to iterate through and
// construct your nodes.
const dataSource = [
    ['Apple', 'Orange'],
    ['Facebook', 'Google'],
    ['Celery', 'Cheeseburger'],
];

// A controlled TreeView, akin to React's controlled inputs
// (http://facebook.github.io/react/docs/forms.html#controlled-components), has
// many benefits. Among others, you can expand/collapse everything (i.e. easily
// trigger those somewhere else).
const Tree = ()=>{
    //getInitialState() {
    //    return {
    //        collapsedBookkeeping: dataSource.map(() => false),
    //    };
    //},
    const [collapsedBookkeeping, setCollapsedBookkeeping] = useState(dataSource.map(() => false))
   const handleClick=(e,i)=> {
       let collapsedBook = [...collapsedBookkeeping];
       collapsedBook[i] = !collapsedBook[i];
       setCollapsedBookkeeping([...collapsedBook] );
    }

    const collapseAll=()=> {
        setCollapsedBookkeeping( collapsedBookkeeping.map(() => true)  );
    }

    const renderTree = (nodes) => (
        <div className="info" key={entry}>{entry}
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
            </div>
    );
     
        return (
            <div>
                <button onClick={collapseAll}>Collapse all</button>
                {dataSource.map((node, i) => {
                    // Let's make it so that the tree also toggles when we click the
                    // label. Controlled components make this effortless.
                    const label =
                        <span className="node" onClick={()=>handleClick(null, i)}>
                            Type {i}
                        </span>;
                    return (
                        <TreeView
                            key={i}
                            nodeLabel={label}
                            collapsed={collapsedBookkeeping[i]}
                            onClick={()=>handleClick(null, i)}>
                            {node.map(entry => <div className="info" key={entry}>{entry}</div>)}
                        </TreeView>
                    );
                })}
            </div>
        );
};

export default Tree;