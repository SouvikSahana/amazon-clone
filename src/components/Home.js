import React from 'react'
import "./Home.css"
import Product from './Product'

const Home = () => {
  return (
    <div className='home'>
        <div className="home_container">
            <img src="https://m.media-amazon.com/images/G/01/primevideo/seo/primevideo-seo-logo.png" alt="amazon brand image" className='home_image'/>

            <div className="home_row">
                <Product id="4895526" title="The lean startup" price={19.9} rating={3} image="https://media.shortform.com/covers/png/the-lean-startup-cover@8x.png"/>
                <Product id="4895527" title="The lean startup First" price={9.9} rating={2} image="https://media.shortform.com/covers/png/the-lean-startup-cover@8x.png"/>
            </div>

            <div className="home_row">
            <Product id="4895528" title="The lean startup" price={19.9} rating={3} image="https://media.shortform.com/covers/png/the-lean-startup-cover@8x.png"/>
                <Product id="4895529" title="The lean startup First" price={9.9} rating={2} image="https://media.shortform.com/covers/png/the-lean-startup-cover@8x.png"/>
                <Product id="4895530" title="The lean startup" price={19.9} rating={3} image="https://media.shortform.com/covers/png/the-lean-startup-cover@8x.png"/>
            </div>
            <div className="home_row">

                <Product id="4895531" title="The lean startup First" price={9.9} rating={2} image="https://media.shortform.com/covers/png/the-lean-startup-cover@8x.png"/>
            </div>
        </div>
    </div>
  )
}

export default Home