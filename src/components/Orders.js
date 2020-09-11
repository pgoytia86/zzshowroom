import React, { Component } from 'react'
import { connect } from "react-redux";
import {fetchOrders} from "../actions/orderActions";
import formatCurrency from '../util';

 class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        const { orders } = this.props;
    return !orders ? (
      <div>Pedidos</div>
    ) : (
      <div className="orders">
        <h2>Pedidos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>FECHA</th>
              <th>TOTAL</th>
              <th>NOMBRE</th>
              <th>EMAIL</th>
              <th>DIRECCION</th>
              <th>ARTICULOS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td> {formatCurrency(order.total)}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>
                  {order.cartItems.map((item) => (
                    <div>
                      {item.count} {" x "} {item.title}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default connect ( 
    (state) => ({
        orders:state.order.orders,

    }),
    {
        fetchOrders,
    }

)(Orders);