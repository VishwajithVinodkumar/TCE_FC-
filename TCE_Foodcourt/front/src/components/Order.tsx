import '../css/profile.css'


function Order(props:any) {
  console.log(props)
  return (
    <>
    <div className="order-card my-2">
        <div className="order-details">
            <p>
            <strong>Items: </strong>
            {props.order.menu_items.map((item: Record<string, number>) => {
                const entry = Object.entries(item)[0];
                if (!entry) return null; // Skip this iteration if `item` has no properties
              
                const [name, quantity] = entry;
              return (
                <>
                <span key={name}>{name} x {quantity} </span>
                </>
                );
            })}
            </p>
            <p><strong>Total Price:</strong> ${props.order.total_price.toFixed(2)}</p>
            <p><strong>Status:</strong> {props.order.menu_status}</p>
        </div>
    </div>
    </>
  )
}

export default Order