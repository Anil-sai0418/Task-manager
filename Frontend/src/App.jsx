import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/register';
import Home from './components/Home';
import List from './components/List';
import Data from './components/Data';
import Menu from './components/menu';

import './App.css';
import Add from './components/Add';
import { UserContext } from './context/Usercontext';
import NotFound from './components/404';


function App() {
  const [loggedUser, setloggedUser] = useState(() => {
    const stored = localStorage.getItem("account-user");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <UserContext.Provider value={{loggedUser,setloggedUser}}>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path = '/home' element ={<Home/>}/>
        <Route path = '/List' element ={<List/>}/>
        <Route path='/Data' element = {<Data/>}/>
        <Route path= '/menu'element = {<Menu/>}/>
        <Route path='/add' element = {<Add/>}/>
        
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
