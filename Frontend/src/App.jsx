import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'sonner';
import Login from './components/Login';
import Register from './components/register';
import Home from './components/Home';
import List from './components/List';
import Data from './components/Data';
import TransactionGraph from './components/TransactionGraph';

import './App.css';
import { UserContext } from './context/Usercontext';
import NotFound from './components/404';


function App() {
  const [loggedUser, setloggedUser] = useState(() => {
    const stored = localStorage.getItem("account-user");
    return stored ? JSON.parse(stored) : null;
  });

  const ProtectedRoute = ({ children }) => {
    if (!loggedUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <UserContext.Provider value={{loggedUser,setloggedUser}}>
    <Toaster
      position={window.innerWidth >= 768 ? "top-right" : "bottom-center"}
      richColors
      expand
      offset={window.innerWidth >= 768 ? 60 : 20}
      toastOptions={{
        className: 'toast-custom',
      }}
    />  
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={loggedUser ? <Navigate to="/home" replace /> : <Login />} />
        <Route path='/register' element={loggedUser ? <Navigate to="/home" replace /> : <Register />} />
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='/List' element={<ProtectedRoute><List/></ProtectedRoute>} />
        <Route path='/List/:id' element={<ProtectedRoute><Data/></ProtectedRoute>} />
        <Route path='/List/:id/graph' element={<ProtectedRoute><TransactionGraph/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
