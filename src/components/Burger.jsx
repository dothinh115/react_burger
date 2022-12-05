import React, { useEffect, useState } from 'react'
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

  const getDataDrag = element => {
    let name = element.getAttribute("data-drag");
    if(!name) {
      name = element.parentNode.getAttribute("data-drag");
    }
    return name;
  }

  const dragStartHandle = e => {
    if(!isDragged) {
      return;
    }
    const name = getDataDrag(e.target);
    setDragID({
      ...dragID,
      start: name
    });
    e.target.style.opacity = ".5";
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
    const name = getDataDrag(e.target);
    setDragID({
      ...dragID,
      end: name
    });
  }

  const dragEndHandle = e => {
    if(!isDragged) {
      return;
    }
    e.target.style.opacity = "1";
    setIsDragged(false);
  }

  useEffect(() => {
    if(!isDragged) {
      const action = updateDrag(dragID);
      dispatch(action);
      setDragID({
        start: "",
        end: ""
      });
    }
  }, [isDragged]);

  const showElement = (type, number) => {
    let html = [];
    for (let i=0; i < number; i++) {
      html.push(<div key={i} className={type}></div>); 
    }
    return html;
  } 

  return (
    <>
      <div className="col-6">
        <div className="breadTop"></div>
        {burgerMenu.map((item, index) => {
          return (
            <div data-drag={item.name} key={index} className={`parent ${item.name === dragID.end && item.name !== dragID.start && "onDrag"}`} draggable={isDragged ? true : false} onDragOver={e => dragOverHandle(e)} onDragStart={e => dragStartHandle(e)} onDragEnter={e => dragEnterHandle(e)} onDragEnd={e => dragEndHandle(e)}>
              <FontAwesomeIcon className="children" style={isDragged && {zIndex: -1}} icon={faSort} onMouseDown={e => setIsDragged(true)} onMouseUp={e => setIsDragged(false)}/>
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