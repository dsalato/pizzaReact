import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSortId} from "../redux/slices/filterStore";
import {RootState} from "../redux/store";


type SortListItem = {
    name: string,
    sort: "rating" | "price" | "title"
}

type PopupClick = React.MouseEvent<HTMLBodyElement> & {
    path: Node[];
}

export const list: SortListItem[] = [
    {name: 'популярности', sort: 'rating'},
    {name: 'цене', sort: 'price'},
    {name: 'алфавиту', sort: 'title'},
]

export const Sort: React.FC = React.memo(({value}) => {
    const dispatch = useDispatch()
    const sortId = useSelector<RootState>(state => state.filter.sortId);
    const [open, setOpen] = useState(false);
    const sortRef = React.useRef(null);

    const closeListSort = (key: SortListItem) => {
        dispatch(setSortId(key));
        setOpen(false);
    }

    React.useEffect(() => {
        const outsideClosePopup = (event: PopupClick) => {
            if (open && sortRef.current && !sortRef.current.contains(event.target)) {
                setOpen(false);
            }

        };

        document.addEventListener("click", outsideClosePopup);

        return () => {
            document.removeEventListener("click", outsideClosePopup);
        }
    }, [open])

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{sortId.name}</span>
            </div>
            {open && <div className="sort__popup">
                <ul>
                    {list.map((el, key) => (
                        <li key={key} onClick={() => closeListSort(el)}
                            className={sortId.sort === el.sort ? "active" : ""}>{el.name}</li>
                    ))}
                </ul>
            </div>}

        </div>
    );

})

export default Sort;