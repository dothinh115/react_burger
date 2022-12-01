import React from 'react'
import { connect } from 'react-redux'
import { updateMenu } from '../redux/action/burgerActions';
import { burgerMenuDefault } from '../redux/menuConfig';

export const Menu = (props) => {
  const {burgerState, dispatch} = props;

  const priceCounting = (amount, price) => {
    return amount * price;
  }

  const totalPriceCounting = () => {
    let total = 0;
    for (let value of burgerMenuDefault) {
       total += burgerState[value.name] * value.price;
    }
    return total;
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
                {burgerMenuDefault.map((item, index) => {
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
                        {burgerState[item.name] > item.numberDefault && <button className="btn btn-danger mx-2" onClick={e => {
                          const action = updateMenu({[item.name]: burgerState[item.name] - 1});
                          dispatch(action);
                        }}>
                          -
                        </button>}
                        <b>{burgerState[item.name]}</b>
                        <button className="btn btn-success mx-2" onClick={e => {
                          const action = updateMenu({[item.name]: burgerState[item.name] + 1});
                          dispatch(action);
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
                    <b>{totalPriceCounting()}</b>
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
  burgerState: state.burgerState
});


export default connect(mapStateToProps)(Menu)