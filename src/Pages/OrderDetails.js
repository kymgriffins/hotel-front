import React, {useState} from 'react'
import { useLocation } from "react-router-dom";
const OrderDetails = () => {
    const location = useLocation()
    console.log(location.state)
    const [details] = useState(location.state.row)
    console.log("details", details)
  return (
    <>
    <div>{details.ordered_time}</div>
    Customer Name: {details.customer.username}
    Food Ordered:{details.food.map((food, key) =>(
      <>
{food.name}
{food.price}

      </>
    ))}
    {details.quantity}
    {details.status ==="true" &&(
        <>
       
        </>
    )}
     {details.status === "false" &&(
        <>
        Status : Awaiting
        </>
    )}
    {details.status}
    </>
  )
}

export default OrderDetails