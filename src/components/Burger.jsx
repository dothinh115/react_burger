import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateDrag } from '../redux/action/burgerActions';

export const Burger = (props) => {
  const {burgerState, burgerMenu, dispatch} = props;

  const [dragID, setDragID] = useState({
    start: "",
    end: ""
  });

  // const [dragged, setDragged] = useState();

  const showElement = (type, number) => {
    let html = [];
    for (let i=0; i < number; i++) {
      html.push(<div key={i} className={type}></div>); 
    }
    return html;
  } 

  const dragStartHandle = (e, name) => {
    setDragID({
      ...dragID,
      start: name
    });
    // setDragged(e.target);
  }

  const dragOverHandle = (e, name) => {
    e.preventDefault();
    if(dragID.end !== name) {
      setDragID({
        ...dragID,
        end: name
      });
    }
  }

  const dragEndHandle = e => {
    const action = updateDrag(dragID);
    dispatch(action);
  }

  // const dragEnterHandle = (e, index) => {
  //   const thisNode = e.target.parentNode;
  //   if(thisNode !== dragged) {
  //     let compare = thisNode.compareDocumentPosition(dragged);
  //     switch(compare) {
  //       case 2: { //thisNode đứng sau dragged
  //         //chuyển dragged ra đằng sau thisNode
  //         thisNode.parentNode.insertBefore(dragged, thisNode.nextSibling);
  //       }
  //       case 4: {// thisNode đứng trước dragged
  //         //chuyển dragged ra đằng trước thisNode
  //         thisNode.parentNode.insertBefore(dragged, thisNode)
  //       }
  //     }
  //   }
  // }

  return (
    <>
      <div className="col-6">
        <div className="breadTop"></div>
        {burgerMenu.map((item, index) => {
          return (
            <div data-name={item.name} style={{cursor: "move"}} key={index} draggable="true" onDragStart={e => dragStartHandle(e, item.name)} onDragOver={e => dragOverHandle(e, item.name)} onDragEnd={e => dragEndHandle()}>
            {showElement(item.name, burgerState[item.name])}
            </div>
            );
        })}
        <div className="breadBottom"></div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  burgerState: state.burgerState,
  burgerMenu: state.burgerMenu
});

export default connect(mapStateToProps)(Burger)