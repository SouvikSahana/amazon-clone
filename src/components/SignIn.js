import React,{useState} from 'react'
import { auth } from '../firebase'
import "./SignIn.css"
import { Link ,useNavigate} from 'react-router-dom'

const SignIn = () => {
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const signIn=(e)=>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password).then((auth)=>{
            if(auth){
                navigate("/")
            }
        }).catch(error=> alert(error.message))
        

    }
    const register=(e)=>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,password).then((auth)=>{
            if(auth){
                navigate("/")
            }
            console.log(auth)
        }).catch(error=> alert(error.message))
        
    }
  return (
    <div className='login'>
        <Link to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="amazon logo" className='login_logo'/> </Link>

        <div className="login_container">
            <h1>Sign-In</h1>

            <form onSubmit={signIn}>
                <h5>E-mail</h5>
                <input type="text" required value={email} onChange={(e)=>setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type="password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>

                <button type='submit' onClick={signIn}>Sign In</button>
            </form>
            <p>By Signing-in you agree to the term of condition of amazon privacy & policy.</p>
            
            <button onClick={register}>Crate Amazon Account</button>
        </div>

    </div>
  )
}

export default SignIn