import { useEffect, useState} from "react";
import "../pagesStyles/authPage.css"
import {Link} from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom";



const base = import.meta.env.VITE_URL_BASE;

export function AuthPage(){
  const navigate = useNavigate();

  function swithForms(hide , show){
    const h = document.getElementById(`${hide}`);
    const s = document.getElementById(`${show}`);

    h.setAttribute("hidden", true);
    s.removeAttribute("hidden");
  }

useEffect(()=>{
swithForms('sign-up','login')
},[])

const [newName,setNewName] = useState('');
const [newPassword,setNewPassword] = useState('');
const [signMessage,setSignMessage] = useState(null);

const [name,setName] = useState('');
const [password,setPassword] = useState('');
const [loginMessage,setLoginMessage] = useState(null);

const way = localStorage.getItem('way')

const userLogin = async(e)=>{
  e.preventDefault()
 const check =  credentialsCheck(name,password)
 setLoginMessage(check)
 if(!check){
  const data = {username:name , password:password};
  await axios.post(base+'/auth/login',data).then(
    async(res)=>{
      await localStorage.setItem('token',res.data)
      navigate(`${way}`)
    }
  ).catch((res)=>{
    setLoginMessage(res.message)
  })
}
}


const userSignUp = async(e)=>{
  e.preventDefault()
 const check = credentialsCheck(newName,newPassword)
 setSignMessage(check)
 if(!check){
  const data = {username:newName , password:newPassword};
  await axios.post(base+'/auth/signup',data).then(
    async(res)=>{
     await localStorage.setItem('token',res.data)
navigate(`${way}`)
    }
  ).catch(setSignMessage('Username already in use or server error'))
}
}

function credentialsCheck(name,password){
if(!name || !password){
  return 'Username or password not inserted'
}
 if(password.length< 8){
  return 'Password needs to be 8 characters or higher'
} else return null
}


  return(
   <>
   <Link to={'/'}>
    <button className="go-back"></button>
   </Link>
   
   <div className="centerer" >
<section className="auth" id="login" >

<h1 className="header">Login</h1>
<p className="error-messages">{loginMessage ? `${loginMessage}` : ''}</p>
  <form className="credentials" onSubmit={userLogin} >
    <input 
    type="text" 
    placeholder="Username" 
    className="input-field"
    onChange={(e)=>{
     setName(e.target.value)
    }}
    />
    <input 
    type="password" 
    placeholder="Password" 
    className="input-field"
    onChange={(e)=>{
     setPassword(e.target.value)
    }}
    />
    <button className="auth-button" type="sumbit">Submit</button>
  </form>
   <div className="auth-switch" ><p>Don't have an account? </p>
   <button className="direction" 
   onClick={()=>{swithForms('login','sign-up')}}
   >Sign up</button>
   </div>
  </section>

  <section className="auth" id="sign-up" >
    <h1 className="header">Sign up</h1>
    <p className="error-messages">{signMessage ? `${signMessage}` : ''}</p>
  <form className="credentials" onSubmit={userSignUp}>
    <input 
    type="text" 
    placeholder="Username" 
    className="input-field"
    onChange={(e)=>{
      setNewName(e.target.value)
    }}
    />
    <input 
    type="password" 
    placeholder="Password" 
    className="input-field"
    onChange={(e)=>{
      setNewPassword(e.target.value)
    }}
    />
    <button className="auth-button" type="submit">Submit</button>
  </form>
   <div className="auth-switch" ><p>Already have an account? </p>
   <button className="direction" 
   onClick={()=>{swithForms('sign-up','login')}}
   >Login</button>
   </div>
  </section>
  

   </div>
   
   </>
  )
}