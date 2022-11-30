import React from 'react'
import { connect } from 'react-redux'
import { updateMenu, updateTotalPrice } from '../redux/action/burgerActions';

export const Menu = (props) => {
  const {burgerState, totalPrice, dispatch} = props;
  const menu = [
    {
      name: "salad",
      price: 10
    },
    {
      name: "cheese",
      price: 20
    },
    {
      name: "beef",
      price: 55
    }
  ]; 

  const priceCounting = (amount, price) => {
    return amount * price;
  }
  return (
    <>
      <div className="col-6">
        <div className="card">
          <div className="card-header">
            Chọn thức ăn
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    Thức ăn
                  </th>
                  <th>
                    Đơn giá
                  </th>
                  <th colSpan={2}>
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {menu.map((item, index) => {
                  return (<tr key={index}>
                      <td>
                        {item.name}
                      </td>
                      <td>
                        {item.price}
                      </td>
                      <td>
                        {priceCounting(burgerState[item.name], item.price)}
                      </td>
                      <td align="right">
                        {burgerState[item.name] > 1 && <button className="btn btn-danger mx-2" onClick={e=> {
                          const action = updateMenu({[item.name]: burgerState[item.name]-1});
                          dispatch(action);
                          const updatePrice = -priceCounting(1, item.price);
                          const action_2 = updateTotalPrice(updatePrice);
                          dispatch(action_2);
                        }}>
                          -
                        </button>}
                        <b>{burgerState[item.name]}</b>
                        <button className="btn btn-success mx-2" onClick={e=> {
                          const action = updateMenu({[item.name]: burgerState[item.name]+1});
                          dispatch(action);
                          const updatePrice = priceCounting(1, item.price);
                          const action_2 = updateTotalPrice(updatePrice);
                          dispatch(action_2);
                        }}>
                          +
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={2}>
                    Tổng cộng:
                  </td>
                  <td colSpan={2}>
                    <b>{totalPrice}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  burgerState: state.burgerState,
  totalPrice: state.totalPrice
});


export default connect(mapStateToProps)(Menu)