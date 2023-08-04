import style from "./searchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../redux/actions";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";

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
    <div className="flex gap-4 "> 
      <input type="text"
        placeholder="Search recipe"
        onChange={handleChange}
        onClick={handleClick}
        onMouseLeave={handleLeave}
        value={name} className="input input-bordered w-24 md:w-auto" />
      <button type="submit" onClick={handleSubmit}>
        <IconButton>
          <SearchIcon style={{ color: "white"}}/>
        </IconButton>
      </button>
    </div>
  );
};

export default SearchBar;
