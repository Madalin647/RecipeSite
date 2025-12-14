import '../pagesStyles/settingsPage.css'
import { useNavigate } from 'react-router';
import axios from 'axios';

export function SettingsPage(){

  const token = localStorage.getItem('token')
  const base = import.meta.env.VITE_URL_BASE;

  const navigate = useNavigate();

 async function LogOut(){
  await localStorage.clear();
  navigate('/')
  }

  async function AccoutDelete() {
    
  }

  return(<>
  <section className='settings-body'>
    <div className='settings-content'>
     
     <div className='account-deletion'>
       <h1>Delete account</h1>
       <button className='action-button' onClick={popUp}>Delete</button>
     </div>
     <div className='white-line'></div>
     <div className='logout'>
      <h1>Log Out</h1>
      <button className='action-button' onClick={LogOut}>Log Out</button>
     </div>

    </div>
  </section>
  <section className="delete-popup" id='delete-popup' hidden>
     <div className="flex-container">
        <button onClick={popUp} className="cancel-button"></button>
        <div className="dP-message">
        <p className="delete-message">Are you srue you want to delete your account ?</p>
        <button className="delete-button" 
        onClick={()=>{
           
          axios.delete(base+'/recipe/deleteAccount',
    {
  headers:
  {
Authorization:token
  }
}).then(
        localStorage.clear(),
          navigate('/'))
        }}
        >Delete</button>
        </div>
        </div>
  </section>
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