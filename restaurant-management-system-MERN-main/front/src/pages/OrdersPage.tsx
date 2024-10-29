import React, {useState} from 'react'
import '../css/orders.css'
import NavbarComponent from '../components/NavbarComponent'
import { io } from "socket.io-client";
import MyOrderComponent from '../components/MyOrderComponent';
import { socket, socketID } from '../sockets';

export default function OrdersPage() {

    const [orders, setOrders] = useState<any>([])
    socket.on('place-order', (order)=>{
        setOrders([...orders, order])
    })

    if (orders) {console.log(orders)}
  return (
    <>
    <NavbarComponent />

    <div className="container-orders-page">
        
        <h2 className='m-5'>Orders</h2>
        {/* {JSON.stringify(orders)} */}
        <div className="orders">
            {orders && orders.map((order:any, index:any)=>{
                return(
                    <MyOrderComponent key={index} data={order} />        
                )
            })}
            {/* <!-- Add more order cards here --> */}
        </div>
    </div>
    </>
  )
}
