import React,{useEffect, useState} from 'react'
import "./Payment.css"
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link,useNavigate } from 'react-router-dom'
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js'
import { getBasketTotal } from './reducer'
import axios from './axios'
import { db } from '../firebase'

const Payment = () => {
    const [state,dispatch]=useStateValue()
    const stripe= useStripe()
    const elements=useElements()
    const navigate=useNavigate()

    const [error,setError]=useState(null)
    const [disabled,setDisabled]=useState(true)
    const [succeeded,setSucceeded]=useState(false)
    const [processing,setProcessing]=useState(false)
    const [clientSecret,setClientSecret]=useState(true)

    useEffect(()=>{
        //generate the special stripe secret for the customer
        const getClientSecret= async()=>{
            const response= await axios({
                method:"post",
                url:`/payments/create?total=${getBasketTotal(state.basket).toFixed(2)*100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    },[state.basket])
    console.log(clientSecret)
    const handleSubmit=async (e)=>{
        e.preventDefault()
        setProcessing(true)
        const payload= await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            db.collection('users').doc(state.user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket : state.basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
            setSucceeded(true)
            setError(null)
            setProcessing(false)
            navigate("/orders")
        })
    }
    const handleChange=(e)=>{
        setDisabled(e.empty)
        setError(e.error ? e.error.message: "")
    }
  return (
    <div className='payment'>
        <div className="payment_container">

            <h1>Checkout <Link to="/checkout" style={{textDecoration:"none"}}>({state.basket.length} items)</Link></h1>
            {/* delivery address */}
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment_address">
                    <p>{state.user?.email}</p>
                    <p>Fului, Hooghly</p>
                    <p>West Bengal</p>
                    <p>712122</p>
                </div>
            </div>
            {/* products review */}
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment_items">
                    {state.basket.map((item)=>(
                        <CheckoutProduct {...item}/>
                    ))}
                </div>
            </div>
            {/* payment method */}
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="price_paymentContainer">
                                <h3>Order Value: ${getBasketTotal(state.basket).toFixed(2)} </h3>
                                <button disabled={processing ||disabled || succeeded}>
                                    <span>{processing ? "Processing":"Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment