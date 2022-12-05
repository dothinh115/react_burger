import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateDrag } from '../redux/action/burgerActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort  } from '@fortawesome/free-solid-svg-icons'



export const Burger = (props) => {
  const {burgerState, burgerMenu, dispatch} = props;

  const [dragID, setDragID] = useState({
    start: "",
    end: ""
  });

  const [isDragged, setIsDragged] = useState(false);

  const dragStartHandle = e => {
    if(!isDragged) {
      return;
    }
    const name = e.target.getAttribute("data-drag");
    if(name) {
      setDragID({
        ...dragID,
        start: name
      });
    }
    e.target.style.opacity = ".5";
    console.log(e.target);
  }

  const dragOverHandle = e => {
    if(!isDragged) {
      return;
    }
    e.preventDefault();
  }

  const dragEnterHandle = e => {
    if(!isDragged) {
      return;
    }
    const name = e.target.getAttribute("data-drag");
    if(name) {
      setDragID({
        ...dragID,
        end: name
      });
    }
  }

  const dragEndHandle = e => {
    if(!isDragged) {
      return;
    }
    e.target.style.opacity = "1";
    const action = updateDrag(dragID);
    dispatch(action);
    setDragID({
      start: "",
      end: ""
    });
    setIsDragged(false);
  }

  const showElement = (type, number) => {
    let html = [];
    for (let i=0; i < number; i++) {
      html.push(<div key={i} className={type}></div>); 
    }
    return html;
  } 

  return (
    <>
      <div className="col-6 burger">
        <div className="breadTop"></div>
        {burgerMenu.map((item, index) => {
          return (
            <div data-drag={item.name} key={index} className={`parent ${item.name === dragID.end && "onDrag"}`} draggable={isDragged ? true : false} onDragOverCapture={e => dragOverHandle(e)} onDragStartCapture={e => dragStartHandle(e)} onDragEnterCapture={e => dragEnterHandle(e)} onDragEnd={e => dragEndHandle(e)}>
              <FontAwesomeIcon className="children" icon={faSort} onMouseDown={e => setIsDragged(true)}/>
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