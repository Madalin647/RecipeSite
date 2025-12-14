import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "../pagesStyles/recipePage.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export function RecipePage(){

  const [recipe,setRecipe]  = useState(null)
  const [fav,setFav] = useState(false)
  const [own,setOwn] = useState(false)

  const navigate = useNavigate()
  const way = localStorage.getItem('way')
  const token = localStorage.getItem('token')
  const base = import.meta.env.VITE_URL_BASE;

const id = useParams();


useEffect(()=>{
  axios.get(base+`/recipe/one/${id.id}`,
    {
  headers:
  {
Authorization:token
  }
}
  ).then((res)=>{
    setRecipe(res.data.recipe)
    setFav(res.data.isFav)
    setOwn(res.data.own)
    console.log(res.data.own)
  })
},[])


  return(<>
  {recipe ? <div className="centerer oneRecipe-centerer">
    <Link to={way} onClick={()=>{
      localStorage.setItem('way',localStorage.getItem('pWay'))
    }} className="go-back"></Link>
    <div className="oneRecipe-body">
      <img src={`data:${recipe.image.mime};base64,${recipe.image.data}`} alt="recipe-image" className="postImg oneRecipe-image" />
      <p className="oneR-T">{recipe.title}</p>
         <div className="oneR-I-portion"> {recipe.ingredients.map((e)=>{
           return <div className="postI-element"><div className="ing-line"/>{e}</div>
          })}</div>
          <p className="oneR-P">{recipe.prep}</p>
          <button className="fav-button" 
          onClick={()=>{
            console.log(fav)
            if(!fav){
              axios.post(base+'/recipe/fav',id,{
                 headers:
                 {
                  Authorization:token,
                 }
              })
            }if(fav){
              axios.post(base+'/recipe/unfav',id,
                {
                 headers:
                 {
                  Authorization:token
                 }
              })
            }
            setFav(!fav)
          }}
          style={{backgroundImage:fav?"url('/hearts.svg')":"url('/fav.svg')"}} ></button>
          {own?<button onClick={popUp} className="delete-ownRecipe"></button>:''}
      </div>
      </div>:''}
      <div className="delete-popup" id="delete-popup" hidden>
        <div className="flex-container">
        <button onClick={popUp} className="cancel-button"></button>
        <div className="dP-message">
        <p className="delete-message">Are you srue you want to delete this recipe ?</p>
        <button className="delete-button" 
        onClick={()=>{
           
          axios.delete(base+`/recipe/delete/${id.id}`,
    {
  headers:
  {
Authorization:token
  }
}).then(
          navigate(way))
        }}
        >Delete</button>
        </div>
        </div>
      </div>
  </>)
}

function popUp(){
 const popup = document.getElementById('delete-popup')

 if(Boolean(popup.hidden)==true){
  popup.removeAttribute('hidden')
 }
 else{
  popup.setAttribute('hidden',true)
}
}