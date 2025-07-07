import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import Home from './components/Home';
import List from './components/List';
import Data from './components/Data';
import Menu from './components/menu';
import Track from './components/Task'
import './App.css';
import { useState } from "react";
import { UserContext } from './context/usercontext';

function App() {
  const [loggedUser, setloggedUser] = useState(() => {
    const stored = localStorage.getItem("account-user");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <UserContext.Provider value={{ loggedUser, setloggedUser }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
