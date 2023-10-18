import Categories from "../components/categories";
import Sort from "../components/sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import Index from "../components/PizzaBlock";
import React, {useContext, useState} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import { setCategoryId } from '../redux/slices/filterStore'


const Home = () => {
    const {categoryId, sortId} = useSelector((state) => state.filter);

    const dispatch = useDispatch();
    const {searchValue} = useContext(SearchContext);
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);

    const changeCategoryId = (id) => {
        dispatch(setCategoryId(id));
    }

    React.useEffect(()=>{
        setIsLoading(true)
        fetch(`https://651d472344e393af2d597c5b.mockapi.io/pizzas?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortId.sort}&order=desc${searchValue !== '' ? `&search=${searchValue}` : ''}`)
            .then((res) => res.json())
            .then((arr)=>{
                setPizzas(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)

    },[categoryId, sortId, searchValue, currentPage])

    return (
        <>
            <div className="content__top">
                <Categories categoryId={categoryId} setCategoryId={changeCategoryId}/>
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
            <Pagination onChangePage={number => setCurrentPage(number)}/>
    </>)



}
export default Home