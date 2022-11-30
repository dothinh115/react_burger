import React from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router'
import {useState} from 'react'

export const Burger = (props) => {
  const {burgerState} = props;
  const [burger, setBurger] = useState({
    ...burgerState
  });

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
        {showElement("salad", burgerState.salad)}
        {showElement("cheese", burgerState.cheese)}
        {showElement("beef", burgerState.beef)}
        <div className="breadBottom"></div>
      </div>
    <Outlet />
    </>
  )
}

const mapStateToProps = (state) => ({
  burgerState: state.burgerState
});

export default connect(mapStateToProps)(Burger)