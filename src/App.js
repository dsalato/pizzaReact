import './App.css';
import React, {useState} from "react";
import './scss/app.scss'
import Header from "./components/Header";
import Categories from "./components/categories";
import Sort from "./components/sort";
import PizzaBlock from "./components/PizzaBlock";


function App() {
    const [pizzas, setPizzas] = useState([])

    React.useEffect(()=>{
        fetch('https://651d472344e393af2d597c5b.mockapi.io/pizzas')
            .then((res) => res.json())
            .then((arr)=>{
            setPizzas(arr)
        })
    },[])

  return (
      <div className="wrapper">
          <Header/>
          <div className="content">
              <div className="container">
                  <div className="content__top">
                      <Categories/>
                      <Sort/>
                  </div>
                  <h2 className="content__title">Все пиццы</h2>
                  <div className="content__items">
                      {pizzas.map((el)=>(
                          <PizzaBlock key={el.id} {...el}/>
                      ))}

                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
