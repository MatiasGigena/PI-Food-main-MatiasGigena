import style from "./navBarModule.css";
import SearchBar from "../searchBar/searchBar";
import CreateRecipe from "../create/form";
const NavBar = () => {
  return (
    <div className={style.container}>
      <SearchBar />
      <div className={style.post}>
        <CreateRecipe />
      </div>
    </div>
  );
};

export default NavBar;
