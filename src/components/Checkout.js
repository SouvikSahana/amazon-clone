import React from 'react'
import "./Checkout.css"
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer'
import CheckoutProduct from "./CheckoutProduct"
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const [state,dispatch]= useStateValue()
    const navigate=useNavigate()
  return (
    <div className='checkout'>
        <div className="checkout_left">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA2mzQpi26HVNVHWkEKnZG00V_la1xvf5q4w&usqp=CAU" alt="ad image" className="checkout_ad" />
            <div>
                <h2 className="checkout_title">
                    Your Shopping Basket
                </h2>
                {/* basket items */}
                {state.basket?.map((data)=>{
                    return( <CheckoutProduct {...data}/> )
                })}
                   
            </div>
        </div>

        <div className="checkout_right">
            <h2>Subtotal ({state.basket.length} Items): ${getBasketTotal(state.basket).toFixed(2)}</h2>
            <button onClick={()=>navigate("/payment")}>Proceed to checkout</button>
        </div>
    </div>
  )
}

export default Checkout