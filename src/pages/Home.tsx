import Categories from "../components/categories";
import Sort, {list} from "../components/sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import Index from "../components/PizzaBlock";
import React from "react";
import Pagination from "../components/Pagination";
import {useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from '../redux/slices/filterStore'
import {fetchPizzas} from '../redux/slices/pizzasSlice'
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {RootState, useAppDispatch} from "../redux/store";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);


    const {categoryId, sortId, currentPage, searchValue} = useSelector((state: RootState) => state.filter);
    const {pizzas, status} = useSelector((state: RootState) => state.pizzas);


    const changeCategoryId = (id:number) => {
        dispatch(setCategoryId(id));
    }
    const onChangePage = (number:number) => {
        dispatch(setCurrentPage(number));
    }

    const getPizzas = async () => {
        dispatch(fetchPizzas({currentPage: String(currentPage), categoryId, sortId, searchValue}));
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
            getPizzas();
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
            {
                status === 'error' ? <div className='content__error-info'>
                    <h2>Произошла ошибка</h2>
                    <p>Не получилось получить пиццы(</p>
                </div> : <div className="content__items">
                    {
                        status === 'loading'
                            ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                            : pizzas.map((el) => (<Index key={el.id} {...el} />))
                    }
                </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>)


}
export default Home