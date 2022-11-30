import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router'
import { loadMenu } from '../redux/action/burgerActions'

export const HomeTemplate = (props) => {
  const {burgerState, dispatch} = props;

  const getLocalStorage = () => {
    let data = localStorage.getItem("burgerData");
    if(data) {
      data = JSON.parse(data);
      const action = loadMenu(data);
      dispatch(action);
    }
  }

  const setLocalStorage = () => {
    let data = JSON.stringify(burgerState);
    localStorage.setItem("burgerData", data);
  }

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    setLocalStorage();
  }, [burgerState]);

  return (
    <div className="container">
      <h1>
        Bài tập bánh burger
      </h1>
      <div className="row">
        <Outlet />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  burgerState: state.burgerState
});

export default connect(mapStateToProps)(HomeTemplate)