import React from 'react'
import { connect } from 'react-redux'
import { burgerMenuDefault } from '../redux/menuConfig';

export const Burger = (props) => {
  const {burgerState} = props;

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
        {burgerMenuDefault.map(item => {
          return showElement(item.name, burgerState[item.name])
        })}
        <div className="breadBottom"></div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  burgerState: state.burgerState
});

export default connect(mapStateToProps)(Burger)