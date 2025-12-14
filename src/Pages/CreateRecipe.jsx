import {  useEffect, useState } from "react";
import "../pagesStyles/createRecipe.css"
import { Link,useNavigate } from "react-router"
import axios from "axios";

export function CreateRecipe(){

  const way = localStorage.getItem('way')

const navigate = useNavigate();

  const base = import.meta.env.VITE_URL_BASE;
  const token = localStorage.getItem('token')

  const [formData,setFormData] =useState( new FormData());
  const[completed,setCompleted]=useState(false)

function imageShow(){

  const image = document.getElementById('image')
  const file = image.files[0];

const formdata = new FormData();
formdata.append("photo",file)

  setFormData(formdata)


  if(file){
    const imageURL = URL.createObjectURL(file);

 document.getElementById('image-background').style.backgroundImage=
      `url(${imageURL})`
  setCompleted(true)
  }
}
  const [ideas, setIdeas] = useState([""]); // start with 1 empty input

  // Handle changing text in ANY input
  const handleChange = (value, index) => {
    const updated = [...ideas];
  
    updated[index] = value;
    setIdeas(updated);

    // If last input got filled → add new empty input
    if (index === ideas.length - 1 && value.trim() !== "") {
      setIdeas([...updated, ""]);
    }
    if( value.trim() == "" && index !== ideas[1].index){
        const deletedEmpty =[...ideas.slice(0,index), ...ideas.slice(index+1)]
      setIdeas(deletedEmpty)
    }
  };

  const [prepText, setPrepText]= useState('')
  const [title,setTitle]=useState('')

  useEffect(()=>{
     const button = document.getElementById('post-button')
    if(prepText!=='' && title!=='' && ideas[0]!=='' && formData.get('photo')){
 button.removeAttribute('hidden')
    }else{
button.setAttribute('hidden',true)
    }
  },
  [setTitle,setPrepText,setIdeas,imageShow])

  formData.append('payload',JSON.stringify({}))

 async function postRecipe(){
    const ingredients = ideas
    if(ingredients[ingredients.length-1]==""){
ingredients.pop()
    }
  const  dataBody={
    title,
    prepText,
    ingredients
  }
formData.set('payload',JSON.stringify(dataBody))

 await axios.post(base+'/recipe/post',formData,{
  headers:{
    Authorization:token
  }
  }).then((res)=>{
    if(res.data == 1){
      navigate('/Account')
    }else{
      console.warn('Recipe post did not succed')
    }
  })
  }
console.log(way)
  return(
    <>

    <div className="centerer">
         <Link to={way!='/Create'? way : '/'} className="go-back"></Link>
    <section className="recipe-template">
<div className="image-selector">
  <input type="file" placeholder="Choose an image" id="image" accept="image/*" 
  onChange={imageShow} hidden/>
  <button className="selector-button" id="image-background" onClick={()=>{
    document.getElementById('image').click()
  }}>{completed? '':'Choose and image'}</button>
</div>
<div className="title-container">
  <input type="text" placeholder="Title"  className="recipeTitle"
  onChange={(e)=>{setTitle(e.target.value)}}/>
</div>
    <div className="ingredients">

      {ideas.map((idea, index) => (
        <div className="ingredient-container">
          <div className="ing-line"></div>
        <input
        className="recipe-ingredient"
          key={index}
          type="text"
          value={idea}
          placeholder="ingredient"
          onChange={(e) => handleChange(e.target.value, index)}
        />
        </div>
      ))}
    </div>
    <div className="prep">
      <textarea placeholder="Preparation" className="prep-input"
      onChange={(e)=>{
       setPrepText(e.target.value)
      }}
      />

    </div>
    <button className="post-button" id="post-button" onClick={postRecipe} hidden></button>
    </section>
    </div>
    </>
  )
}