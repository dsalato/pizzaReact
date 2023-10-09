import React from 'react';

function Categories({categoryId, setCategoryId}) {
    const categories = ['Все','Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];



    return (
            <div className="categories">
                <ul>
                    { categories.map((el,key) => {
                        return(
                            <li key={key} onClick={() => setCategoryId(key)} className={categoryId === key ? 'active' : '' }>{el}</li>
                        )
                    })}
                </ul>
            </div>
        );
}


export default Categories;