import Categories from "../components/categories";
import Sort from "../components/sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import Index from "../components/PizzaBlock";
import React, {useState} from "react";

const Home = () => {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    React.useEffect(()=>{
        fetch('https://651d472344e393af2d597c5b.mockapi.io/pizzas')
            .then((res) => res.json())
            .then((arr)=>{
                setPizzas(arr)
                setIsLoading(false)
            })
    },[])

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [... new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : pizzas.map((el) => (<Index key={el.id} {...el} />))
                }
            </div>
    </>)



}
export default Home