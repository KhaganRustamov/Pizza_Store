import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { ISort, changeSort } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";

import "./sort.scss";

import sortIcon from "../../assets/img/sort.png";

export const sortList: ISort[] = [
  { name: "Best rating", sortProperty: "-rating" },
  { name: "Increasing price", sortProperty: "price" },
  { name: "Decreasing price", sortProperty: "-price" },
  { name: "Alphabet A-Z", sortProperty: "title" },
];

const Sort: React.FC = () => {
  const [showList, setShowList] = useState(false);
  const sort = useSelector((state: RootState) => state.filter.sort);
  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const onSelectList = (item: ISort) => {
    dispatch(changeSort(item));
    setShowList(false);
  };

  useEffect(() => {
    const handleBodyClick = (e: Event) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowList(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => document.body.removeEventListener("click", handleBodyClick);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <img src={sortIcon} width="20" height="20"></img>
        <b>Sort by:</b>
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
                  sort.sortProperty === item.sortProperty ? "active" : ""
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
};

export default Sort;
