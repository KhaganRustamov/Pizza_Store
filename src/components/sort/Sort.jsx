import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { changeSort } from "../../redux/slices/filterSlice";

import "./sort.scss";

function Sort() {
  const [showList, setShowList] = useState(false);
  const sort = useSelector((state) => state.filter.sort);
  const sortRef = useRef();
  const dispatch = useDispatch();

  const sortList = [
    { name: "популярности", sortProperty: "-rating" },
    { name: "возрастающей цене", sortProperty: "price" },
    { name: "убывающей цене", sortProperty: "-price" },
    { name: "алфавиту", sortProperty: "title" },
  ];

  const onSelectList = (item) => {
    dispatch(changeSort(item));
    setShowList(false);
  };

  useEffect(() => {
    const handleBodyClick = (e) => {
      if (sortRef.current.contains(e.target)) {
        console.log("ok");
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => document.body.removeEventListener("click", handleBodyClick);
  }, []);

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
        <span onClick={() => setShowList(!showList)}>{sort.name}</span>
      </div>
      {showList && (
        <div className="sort__popup">
          <ul>
            {sortList.map((item, i) => (
              <li
                key={i}
                onClick={() => onSelectList(item)}
                className={
                  sort.sortProperty === item.sortProperty ? "active" : null
                }
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;