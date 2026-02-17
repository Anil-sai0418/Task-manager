import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import List from './pages/List';
import Data from './pages/Data';
import TransactionGraph from './pages/TransactionGraph';

import './App.css';
import { UserContext } from './context/Usercontext';
import NotFound from './pages/NotFound';


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
    <UserContext.Provider value={{ loggedUser, setloggedUser }}>
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
          <Route path='*' element={<NotFound />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={loggedUser ? <Navigate to="/home" replace /> : <Login />} />
          <Route path='/register' element={loggedUser ? <Navigate to="/home" replace /> : <Register />} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/List' element={<ProtectedRoute><List /></ProtectedRoute>} />
          <Route path='/List/:id' element={<ProtectedRoute><Data /></ProtectedRoute>} />
          <Route path='/List/:id/graph' element={<ProtectedRoute><TransactionGraph /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
