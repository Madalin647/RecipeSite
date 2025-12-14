
import { useState } from "react"
import "../pagesStyles/mainPage.css"
import {Link} from "react-router-dom"
import axios from "axios"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const base = import.meta.env.VITE_URL_BASE;

export function MainPage(){

  const location = useLocation();

  localStorage.setItem('way','/')

 const [logged, setLogged] = useState(false)
 const [data,setData] = useState([])

  const token =  localStorage.getItem('token')
 useEffect(()=>{
   axios.get(base + '/recipe/valid',{
  headers:
  {
Authorization:token
  }}).then((res)=>{
    if(res.data == 1){
      setLogged(true)
    }else{setLogged(false)}
  })
   axios.get(base + '/recipe/main',{
  headers:
  {
Authorization:token
  }}).then((res)=>{
setData(res.data.rI)
console.log(res.data.rI)
  })
  },[location.pathname,token])



  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen(prev => !prev);
  }

  return(
  <>
  
 <nav className="hamburgerMenu">
  <div className="sticky-container">
   <input type="checkbox" checked={open}   hidden id="menu-checkbox"/> 
  <button className="hM-button" onClick={toggleMenu}></button>
 <div className="account-menu">
<Link to={logged ?'/Account' :'/Auth'} className="menu-link" 
onClick={()=>localStorage.setItem('way','/Account')}>
<img src="/login.svg" alt="" />
<p className="menu-names">{logged ? "Account":"Login"}</p>
</Link>
<Link to={logged?'/Create':'/Auth'} className="menu-link" 
onClick={()=>localStorage.setItem('way','/Create')}>
<img src="/add.svg" alt="" />
<p className="menu-names" >New recipe</p>
</Link>
<Link to={logged?'/Favorites':'/Auth'} className="menu-link"
onClick={()=>localStorage.setItem('way','/Favorites')}
>
<img src="/fav.svg" alt="" />
<p className="menu-names">Favorites</p>
</Link>
 </div>
  </div>
 </nav>


  <section className="mainHeader">
    <h1>Welcome to Recipe platform</h1>
    <p>Find, create and save recipes</p>
  </section>

  <section className="futuredRecipies">
    <p className="fr-header">Futured Recipes</p>
     {data.length != 0 ? <>{data.map((el)=>{
          return <Link
          to={`/Recipe/${el.id}`} 
          className="element">
            <img src={`data:${el.image.mime};base64,${el.image.data}`} alt="recipe-image" className="postImg" />
          <p className="postT">{el.title}</p>
         <div className="postI-portion"> {el.ingredients.map((e)=>{
           return <div className="postI-element"><div className="ing-line"/>{e}</div>
          })}</div>
          <p className="postP">{el.prep}</p>
          </Link>
        })}</>:<>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
        </>}
  </section>
 
  </>
  )
}