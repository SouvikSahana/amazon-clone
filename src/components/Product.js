import React from 'react'
import "./Product.css"
import { useStateValue } from './StateProvider'

const Product =React.memo( ({id,title,price,image,rating}) => {
    const [state, dispatch]=useStateValue()
    const addToBasket=()=>{
        //dispatch item into the data layer
        dispatch({type:"ADD_TO_BASKET", item:{
            id, title, price, image, rating
        }})
    }
  return (
    <div className='product'>
        <div className="product_info">
            <p>{title}</p>
            <p className='product_price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className="product_rating">
                {Array(rating).fill().map((_,i)=>(
                    <span> * </span>
                ))}
            </div>
        </div>
        <img src={image} alt="product image" />
        
        <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}
)
export default Product