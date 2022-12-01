import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadMenu } from '../redux/action/burgerActions'
import Burger from './Burger';
import Menu from './Menu';

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
        <Burger />
        <Menu />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  burgerState: state.burgerState
});

export default connect(mapStateToProps)(HomeTemplate)