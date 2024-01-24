import React,{useEffect} from 'react'
import Header from './components/Header'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "./App.css"
import Checkout from './components/Checkout'
import SignIn from './components/SignIn'
import { auth } from './firebase'
import { useStateValue } from './components/StateProvider'
import Payment from './components/Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './components/Orders'

const promise=loadStripe('pk_test_51LJGT9SBsdwPi0alN7YlAfvBFul7as0bc1jyafFLYY8TKne38QBkKoITuA6VzihgUH56veLjK0tms2v4w16Q5jg700Mh2621Uf');
const App = () => {
  const [state,dispatch]=useStateValue()

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      console.log(authUser)
      if(authUser){
        dispatch({type:"SET_USER", user: authUser})
      }else{
        dispatch({type:"SET_USER", user: null})
      }
    })
  },[])
  return (
    <Router>
    <div className='app'>
      <Routes>
        <Route path='/' element={ <div><Header/> <Home/></div>
        }/>
        <Route path='/checkout' element={<div><Header/> <Checkout/></div>}/>
        <Route path='/signin' element={ <SignIn/>}/>
        <Route path='/payment' element={<Elements stripe={promise}><Payment/></Elements> }/>
        <Route path='/orders' element={ <Orders/>}/>
      </Routes>
    </div>
    </Router>

  )
}

export default App