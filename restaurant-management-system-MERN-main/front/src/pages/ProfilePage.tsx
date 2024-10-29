import "../css/profile.css";
import NavbarComponent from "../components/NavbarComponent";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Order from "../components/Order";
import { socket, socketID } from "../sockets";
import NewOrder from "../components/NewOrders";



export default function ProfilePage() {
  const { user } = useAuth();

  const [order, setOrder] = useState(() => {
    // Initialize with data from localStorage if available
    const storedOrder = localStorage.getItem('myorder');
    return storedOrder ? JSON.parse(storedOrder) : null;
});


  const [myorders, setMyOrders] = useState<any>([]);
  const fetchOrders = async () => {
    try {
      let uri = "http://localhost:8000/user/get-orders";
      const response = await axios.post(uri, { user_id: user._id });
      console.log(response.data);
      setMyOrders(response.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };


 

  socket.on('place-order', (order_info)=>{
    console.log(socket.id)
    console.log("an update came : ", order_info)
  })

  useEffect(() => {
    console.log(socket.id)
    fetchOrders();


  }, []);

  return (
    <>
      <NavbarComponent />

      <div className="container-profile">
        <div className="profile">
          <h3 className="mt-5">Profile</h3>
          <div className=" card w-100 text-center my-3">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
          {user.role === "customer" && (
            <div>
              <h3>My Orders</h3>

              <div className="orders text-center">
                <div className="card w-100">
                  <h3 className="text-center">New Orders</h3>
                  {order && <NewOrder order={order} />}
                </div>

                <div className="card w-100">
                  <h3 className="text-center">Past Orders</h3>
                  {myorders.orders &&
                    myorders.orders.map((item: any) => <Order order={item} />)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
