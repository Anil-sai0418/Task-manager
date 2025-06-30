import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path = '/home' element ={<Home/>}/>
        <Route path = '/hom' element ={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
