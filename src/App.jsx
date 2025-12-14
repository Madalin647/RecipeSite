import './App.css'
import { Routes,Route} from 'react-router-dom'
import { MainPage } from './Pages/MainPage.jsx'
import { AuthPage } from './Pages/AuthPage.jsx'
import { AccountPage } from './Pages/AccountPage.jsx'
import { CreateRecipe } from './Pages/CreateRecipe.jsx'
import { RecipePage } from './Pages/RecipePage.jsx'
import { FavoritesPage } from './Pages/FavoritesPage.jsx'
import { SettingsPage } from './Pages/SettingsPage.jsx'

function App() {

  return (
    <Routes>
      <Route index element={<MainPage/>}/>
      <Route path='Auth' element={<AuthPage/>}/>
      <Route path='Account' element={<AccountPage/>}/>
      <Route path='Create' element={<CreateRecipe/>}/>
      <Route path='Recipe/:id' element={<RecipePage/>}/>
      <Route path='Favorites' element={<FavoritesPage/>}/>
      <Route path='Settings' element={<SettingsPage/>}/>
    </Routes>
  )
}

export default App
