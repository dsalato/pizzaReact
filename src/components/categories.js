import React from 'react';

function Categories(){
    const[category, chooseCategory] = React.useState(3);
    const categories = ['Все','Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];


    return (
            <div className="categories">
                <ul>
                    { categories.map((el,key) => {
                        return(
                            <li onClick={() => chooseCategory(key)} className={category === key ? 'active' : '' }>{el}</li>
                        )


                    })}
                </ul>
            </div>
        );
}


export default Categories;