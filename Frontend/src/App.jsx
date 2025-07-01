import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import Home from './components/Home';
import List from './components/List';
import Data from './components/Data'; // ✅ Add this line
import Menu from './components/menu'
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path = '/home' element ={<Home/>}/>
        <Route path = '/List' element ={<List/>}/>
        <Route path='/Data' element = {<Data/>}/>
        <Route path= '/menu'element = {<Menu/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
