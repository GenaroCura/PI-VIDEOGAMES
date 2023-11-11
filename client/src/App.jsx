import './App.css';
import {Route, Routes, useLocation} from 'react-router-dom'; 
import { Landing, Home, Detail , Form } from './views';
import NavBar from './components/NavBar/NavBar';

function App() {
  //Utilizo  el useLocation para que mi navBar no se muestre en landingpage.
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}
      <Routes>
        <Route path='/' element = {<Landing/>}/>

        <Route path='/home' element ={<Home/>}/>

        <Route path='/detail/:id' element ={<Detail/>}/>

        <Route path='/create' element ={<Form/>}/>

      </Routes>
    </div>
  );
}

export default App;
