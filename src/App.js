import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import Menu from './core/Menu';
import PrivateRoute from './auth/PrivateRoute';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AdminRoute from './auth/AdminRoute';
import AddCategory from './admin/AddCategory';

const App = () => {
  return (
    <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/user/dashboard" element={<PrivateRoute element={UserDashboard} />} />
        <Route path="/admin/dashboard" element={<AdminRoute element={AdminDashboard} />} />
        <Route path="/create/category" element={<AdminRoute element={AddCategory} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
