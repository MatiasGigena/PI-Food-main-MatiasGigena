import style from "./searchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../redux/actions";

const SearchBar = ({ setCurrentPage }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipeByName(name))
      .then(() => setCurrentPage(1))
      .then(() => setName(""));
  };

  const handleClick = (e) => {
    e.target.placeholder = "";
  };
  const handleLeave = (e) => {
    e.target.placeholder = " Search recipe";
  };
  return (
    <div>
      <input
        className={style.barra}
        type="search"
        placeholder=" Search recipe"
        onChange={handleChange}
        onClick={handleClick}
        onMouseLeave={handleLeave}
        value={name}
      />
      <button type="submit" onClick={handleSubmit} className={style.boton}>
        🔎
      </button>
    </div>
  );
};

export default SearchBar;
