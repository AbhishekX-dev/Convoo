import './App.css'
import {Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './stores/authStore.js'

const App = () => {
  const {checkAuth,authUser}=useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log({authUser});
  
  return (
  <>
  <Navbar/>

  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/settings' element={<SettingsPage/>}/>
    <Route path='/signup' element={<SignUpPage/>}/>
    <Route path='/login' element={<LoginPage/>}/> 
    <Route path='/profile' element={<ProfilePage/>}/>
  </Routes>
 
  </>
  )
} 

export default App
