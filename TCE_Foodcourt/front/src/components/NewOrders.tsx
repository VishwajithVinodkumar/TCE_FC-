import { useEffect, useState } from 'react';
import '../css/profile.css'
import { socket, socketID } from "../sockets";



function NewOrder(props:any) {
  const [status, setStatus] = useState('')


  console.log(props)

  socket.on('order-update', (order_update)=>{
    console.log(socket.id)
    console.log("an update came : ", order_update)
    setStatus(order_update);
    // setOrder({...order, status: order_update })
    console.log("Status on order update",status)
    
  })


  useEffect(()=>{
    setStatus(props.order.status)
    console.log("Status on load", status)

  }, [])
  return (
    <>
    <div className="order-card my-2">
        <div className="order-details">
            <p>
            <strong>Items: </strong>{props.order.items && props.order.items.map((item:any, index:any)=>{return (<>{item.name} x{item.quantity} </>)})}
            
            </p>
            <p><strong>Total Price:</strong> ${props.order.total.toFixed(2)}</p>
            <p><strong>Status:</strong> {status}</p>
        </div>
    </div>
    </>
  )
}

export default NewOrder