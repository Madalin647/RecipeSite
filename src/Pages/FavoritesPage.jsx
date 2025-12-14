import { useEffect, useState } from "react"
import "../pagesStyles/favoritesPage.css"
import axios from "axios"
import { Link } from "react-router"

export function FavoritesPage(){
  
  const way = localStorage.getItem('way')
  localStorage.setItem('pWay',way)
  const token = localStorage.getItem('token')
  const base = import.meta.env.VITE_URL_BASE;

  const [recipe,setRecipe] = useState([""])
  const [gotData,setGotData] = useState(false)
  
  useEffect(()=>{
    axios.get(base + '/recipe'+'/favorites',
      {headers:{
        Authorization:token
      }}
    ).then((res)=>{
      setRecipe(res.data);
      setGotData(true);
    })
  },[])

  return (
  <>
     <Link to={way!='/Favorites'? way : '/'} className="go-back"></Link>
  <div className="recipes-section fav-section">
    <div className="recipe-container">
  {gotData? <>{recipe.map((el)=>{
          return <Link
          onClick={()=>{
            localStorage.setItem('way','/Favorites')
          }} 
          to={`/Recipe/${el.recipe.id}`} className="element">
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
    <div className="elements"></div>
        </>}
</div>
  </div>
  </>
  )
}