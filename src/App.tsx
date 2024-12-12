import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter,Routes,Route, useLocation} from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import CartScreen from './pages/CartScreen';

function App() {

  const location=useLocation()
  const [routeState,setRouteState]=useState('route_stable')

  useEffect(()=>{
    setRouteState('route_change')
    setTimeout(()=>{
      setRouteState('route_stable')
    },200)
  },[location])
  

  return (
    <div id='route_changer' className={routeState}>
      
      <Routes>
        <Route path='/'>
          <Route index  element={<SplashPage/>}/>
          <Route path='signup' element={<SignupPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='home' element={<HomePage/>}/>
          <Route path='cart' element={<CartScreen/>}/>
        </Route>
        <Route path='/product/:productId' element={<ProductPage/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
