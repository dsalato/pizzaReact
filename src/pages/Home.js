import Categories from "../components/categories";
import Sort, {list} from "../components/sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import Index from "../components/PizzaBlock";
import React, {useContext, useState} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from '../redux/slices/filterStore'
import axios from "axios";
import qs from "qs";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);


    const {categoryId, sortId, currentPage} = useSelector((state) => state.filter);
    const {searchValue} = useContext(SearchContext);

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const changeCategoryId = (id) => {
        dispatch(setCategoryId(id));
    }
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    }

    const fetchPizzas = () => {
        setIsLoading(true)

        axios.get(`https://651d472344e393af2d597c5b.mockapi.io/pizzas?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortId.sort}&order=desc${searchValue !== '' ? `&search=${searchValue}` : ''}`
        ).then(response => {
            setPizzas(response.data)
            setIsLoading(false)
        })
    };

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = list.find(obj => obj.sort === params.sortId)

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
            isSearch.current = true;
        }
    }, [])

    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;

    }, [categoryId, sortId, searchValue, currentPage])

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortId: sortId.sort,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortId, currentPage])

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
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : pizzas.map((el) => (<Index key={el.id} {...el} />))
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>)


}
export default Home