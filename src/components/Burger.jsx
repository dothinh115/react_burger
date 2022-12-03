import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateDrag } from '../redux/action/burgerActions';

export const Burger = (props) => {
  const {burgerState, burgerMenu, dispatch} = props;
  let [dragID, setDragID] = useState({
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

  const dragStartHandle = (e, name) => {
    setDragID({
      ...dragID,
      start: name
    });
  }

  const dragEndHandle = (e, name) => {
    if(dragID.end !== name) {
      setDragID({
        ...dragID,
        end: name
      });
    }
  }

  const dropHandle = e => {
    const action = updateDrag(dragID);
    dispatch(action);
    setDragID({
      start: "",
      end: ""
    });
  }

  return (
    <>
      <div className="col-6">
        <div className="breadTop"></div>
        {burgerMenu.map((item, index) => {
          return (
            <div style={{cursor: "move"}} key={index} draggable="true" onDragStart={e => dragStartHandle(e, item.name)} onDragOver={e => dragEndHandle(e, item.name)} onDragEnd={dropHandle} >
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