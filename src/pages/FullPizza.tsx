import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title:string,
        price:number,
    }>();
    const {id} = useParams();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://651d472344e393af2d597c5b.mockapi.io/pizzas/${id}`);
                setPizza(data);
            } catch (e) {
                alert("Данной пиццы нет");
            }
        }

        fetchPizza();
    }, [])

    if (!pizza) {
        return 'Загрузка...';
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <h2>{pizza.price}</h2>
        </div>
    )
}

export default FullPizza;