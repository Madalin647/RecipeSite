import axios from "axios"
import {  useEffect, useState } from "react";
import { Link } from "react-router";
import '../pagesStyles/accountPage.css'

export function AccountPage(){

  const token = localStorage.getItem('token')
  const base = import.meta.env.VITE_URL_BASE;

  const [details,setDetails] = useState('')
  const [gotData,setGotData] = useState(false)
  const [ownRecipes,setOwnRecipes] = useState([""])
  const [favorites,setFavorites] = useState([""])

useEffect(()=>{
axios.get(base + '/recipe'+'/',{
  headers:
  {
Authorization:token
  }

}).then((res)=>{
setDetails(res.data.user)
setOwnRecipes(res.data.ownRecipes)
setFavorites(res.data.favorites)
setGotData(true)
}
) 
},[])


  return(
  <>
<div className="a-body">
   <Link to={'/'} className="go-back"></Link>
<section className="top-section">

    <h1>Hello, {details.username}</h1>
    <div className="difer"></div>
    <Link to={'/Settings'} className="settings-button"></Link>
  </section>

  <section className="recipes-section">
    <div className="partition own-recipes">
      <p className="recipe-title">Own recipes</p>
      <div className="recipe-container">
        {gotData? <>{ownRecipes.map((el)=>{
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
        </>}

    <Link to={'/Create'} className="create-recipe recipe-button"><img src="/add.svg" alt="" onClick={()=>{
      localStorage.setItem('way','/Account')
    }} /> Create a recipe</Link>
      </div>
    </div>
<div className="line"/>
    <div className="partition favorites">
      <p className="recipe-title">Favorites</p>
        <div className="recipe-container">
    {gotData? <>{favorites.map((el)=>{
          return <Link to={`/Recipe/${el.recipe.id}`} className="element">
            <img src={`data:${el.recipe.image.mime};base64,${el.recipe.image.data}`} alt="recipe-image" className="postImg" />
          <p className="postT">{el.recipe.title}</p>
         <div className="postI-portion"> {el.recipe.ingredients.map((e)=>{
           return <div className="postI-element"><div className="ing-line"/>{e}</div>
          })}</div>
          <p className="postP">{el.recipe.prep}</p>
          </Link>
        })}</>:<>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
    <div className="elements"></div>
        </>}
    
    <Link to={'/Favorites'}
              onClick={localStorage.setItem('way','/Account')} 
    className="see-favorites recipe-button"><img src="/fav.svg" alt="" /> See all</Link>
    </div>
    </div>
  </section>
</div>
 

  </>)
}

