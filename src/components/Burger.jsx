import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateDrag } from '../redux/action/burgerActions';

export const Burger = (props) => {
  const {burgerState, burgerMenu, dispatch} = props;

  const [dragID, setDragID] = useState({
    start: "",
    end: ""
  });

  const showElement = (type, number) => {
    let html = [];
    for (let i=0; i < number; i++) {
      html.push(<div key={i} className={type}></div>); 
    }
    return html;
  } 

  const dragStartHandle = e => {
    const name = e.target.getAttribute("data-name");
    setDragID({
      ...dragID,
      start: name
    });
  }

  const dragOverHandle = e => {
    e.preventDefault();
  }

  const removeClass = arr => {
    Object.entries(arr).forEach(([key, value]) => {
      if(value.classList.contains("dragable")){
        value.classList.remove("drag-preview");
      }
    });
  }

  const dropHandle = e => {
    const parent = e.target.parentNode;
    if(parent.classList.contains("burger") || parent.parentNode.classList.contains("burger")) {
      const children = parent.children;
      removeClass(children);
      const secondChildren = parent.parentNode.children;
      removeClass(secondChildren);
    }
    const action = updateDrag(dragID);
    dispatch(action);
  }

  const dragEnterHandle = e => {
    const parent = e.target.parentNode;
    if(parent.classList.contains("dragable")){
      const name = parent.getAttribute("data-name");
      if(dragID.start !== name) {
        parent.classList.add("drag-preview");
        setDragID({
          ...dragID,
          end: name
        });
      }
    }
  }

  const dragExitHandle = e => {
    if(e.target.classList.contains("dragable") || e.target.parentNode.classList.contains("draggable")){
      e.target.classList.remove("drag-preview");
    }
  }

  return (
    <>
      <div className="col-6 burger">
        <div className="breadTop"></div>
        {burgerMenu.map((item, index) => {
          return (
            <div className="dragable" data-name={item.name} style={{cursor: "move"}} key={index} draggable="true" onDragStart={e => dragStartHandle(e)} onDragOver={e => dragOverHandle(e)} onDragEnter={e => dragEnterHandle(e)} onDragLeave={e => dragExitHandle(e)} onDrop={e => dropHandle(e)}>
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