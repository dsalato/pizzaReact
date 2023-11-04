import './App.css';
import React from "react";
import './scss/app.scss'
import Home from "./pages/Home";
import FullPizza from "./pages/FullPizza";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";


function App() {

  return (
      <Routes>
          <Route path='/' element={<MainLayout/>}>
              <Route path='' element={<Home/>}/>
              <Route path='cart' element={<Cart/>}/>
              <Route path='*' element={<NotFound/>}/>
              <Route path='pizza/:id' element={<FullPizza/>}/>
          </Route>
      </Routes>

  );
}

export default App;
