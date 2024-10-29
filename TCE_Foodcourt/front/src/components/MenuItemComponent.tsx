import React, {useState} from "react";
import "../css/menu.css";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../store/cartSlice";


export default function MenuItemComponent(props: any) {
  const dispatch = useDispatch()
  
  const cart = useSelector((state:any) => state.cart);
    // console.log(cart)
    // console.log(props)
    const [value, setValue] = useState(0)

    const increment = () => {
        setValue(value + 1)
        addToCart();
    }

    const decrement = () => {
        if (value > 0) {
        setValue(value - 1)
        removeFromCart();
        }
    }
    
    const addToCart = () =>{
        dispatch(add(props.item))
    }

    const removeFromCart = () =>{
      dispatch(remove(props.item))
  }

  return (
    <>
        <div className="item-card">
          <div className="item-details">
            <h3 className="item-name">{props.item.name}</h3>
            <p className="item-description">{props.item.description}</p>
            <p className="item-description"> Price: ${props.item.price}</p>
          </div>
          <div className="item-actions">
            <button className="btn-minus" onClick={decrement} >-</button>
            <span className="quantity">{value}</span>
            <button className="btn-plus" onClick={increment}>+</button>
          </div>
        </div>
 
    </>
  );
}
