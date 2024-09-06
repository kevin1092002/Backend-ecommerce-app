import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import Info from './pages/Info';
import Product from './pages/Product';
import Edit from './pages/Edit';
import Create from './pages/Create';



function App() {
  return (
    <Routes>  
      <Route exact path ='/' element ={<LandingPage/>}></Route>
      <Route exact path ='/home' element ={<Home/>}></Route>
      <Route exact path ='/product/:searchValue' element ={<Product/>}></Route>
      <Route exact path ='/signin'  element ={<Signin/>}></Route>
      <Route exact path ='/signup'  element ={<Signup/>}></Route>
      <Route exact path ='/info/:id'  element ={<Info/>}></Route>
      <Route exact path ='/edit/:id'  element ={<Edit/>}></Route>
      <Route exact path ='/create'  element ={<Create/>}></Route>
    </Routes> 
  );
}

export default App;
