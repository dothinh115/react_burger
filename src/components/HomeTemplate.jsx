import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { updateMenu } from '../redux/action/burgerActions'
import Burger from './Burger';
import Menu from './Menu';
import { loadMenu } from '../redux/action/burgerActions';

export const HomeTemplate = (props) => {
  const {burgerState, burgerMenu, dispatch} = props;

  const getLocalStorage = () => {
    let data = localStorage.getItem("burgerData");
    let menu = localStorage.getItem("burgerMenu");
    if(data) {
      data = JSON.parse(data);
      const action = updateMenu(data);
      dispatch(action);
    }
    if(menu) {
      menu = JSON.parse(menu);
      const action_2 = loadMenu(menu);
      dispatch(action_2);
    }
  }

  const setLocalStorage = () => {
    let data = JSON.stringify(burgerState);
    let menu = JSON.stringify(burgerMenu);
    localStorage.setItem("burgerData", data);
    localStorage.setItem("burgerMenu", menu);
  }

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    setLocalStorage();
  }, [burgerState, burgerMenu]);

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
  burgerState: state.burgerState,
  burgerMenu: state.burgerMenu
});

export default connect(mapStateToProps)(HomeTemplate)