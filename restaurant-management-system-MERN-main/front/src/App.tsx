import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MyOrderComponent from './components/MyOrderComponent';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import OrdersPage from './pages/OrdersPage';
import SignupPage from './pages/SignupPage';
import MyOrderPage from './pages/MyOrderPage';
import { useDispatch, useSelector } from 'react-redux';
import { set } from './store/userSlice';
import { Navigate, Route, Routes,  } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import MissingPage from './pages/MissingPage';
import { emplace } from '@reduxjs/toolkit/dist/utils';


function App() {
  // const dispatch = useDispatch();

  // const  changeUser = (user:any) =>{
  //   //dispatch action 
  //   dispatch(set(user));   // action and payload in action 
  // }

  // changeUser({name: "Mak", email: "abc123"});  // on button click

  // console.log(user);
  // const user = useSelector((state: any) => state.user);

  const { user } = useAuth(); 

  console.log(user)

  if (!user) {
    return (
      <Routes>
        <Route path = '/' >
          <Route index element={<LoginPage />} />
          <Route path = 'signup' element={<SignupPage />} />
        </Route>
        <Route path="*" element={<MissingPage />} />
      </Routes>
      )
  }

    return (
     <Routes>
      <Route path = '/' >
          <Route index element={<LoginPage />} />
          <Route path = 'signup' element={<SignupPage />} />
        </Route>
        <Route path="/user/">
          <Route path="/user/profile" element={user?<ProfilePage />:<LoginPage/>} />
          <Route path="/user/home" element={user?<HomePage />:<LoginPage/>} />
          <Route path="/user/menu" element={user?<MenuPage />:<LoginPage/>} />
          <Route path="/user/orders" element={user?<OrdersPage />:<LoginPage/>} />
        </Route>

        <Route path="*" element={<MissingPage />} />
     </Routes>
    )
  



}

export default App;
