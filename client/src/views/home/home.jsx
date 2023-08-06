import Cards from "../../components/Cards/cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterRecipesDiets,
  filterCreatedInDb,
  orderByName,
  orderByHealthscore,
} from "../../redux/actions";
import style from "./home.module.css";
import Paginado from "../../components/Paginado/paginado";
import NavBar from "../../components/navBar/navBar";
import { BsFilterLeft } from "react-icons/bs";

const Home = () => {
  const dispatch = useDispatch();
  const [filtros, setFiltros] = useState(false);
  const [loading, setLoading] = useState(true);
  const recipes = useSelector((state) => state.recipes);
  //Declaro estado con pagina y modificador d pagina
  const [currentPage, setCurrentPage] = useState(1);
  //Declaro la cantidad de recetas por pagina
  const [recipesPerPage] = useState(9);
  //Sobre la pagina actual, multiplicame la pagina actual por recetas por pagina
  const indexLastRec = currentPage * recipesPerPage;
  //Necesito tener el indice del primer personaje, entonces sacas el ultimo - la cantidad de recetas da el primero
  const indexFirstRec = indexLastRec - recipesPerPage;
  //Constante que declara cuantas recetas se van a renderizar por pagina
  const currentRecipes = recipes.slice(indexFirstRec, indexLastRec);

  const paginado = (pageNumber) => {
    //Setea la pagina depende del numero que vaya apretando
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    //Traigo las recetas
    dispatch(getRecipes());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch]);

  const handleFilterDiets = (e) => {
    //Manejo el filtro de dietas
    dispatch(filterRecipesDiets(e.target.value));
    setCurrentPage(1);
  };
  const handleFilterCreated = (e) => {
    //Manejo el filtro de creados en DB
    dispatch(filterCreatedInDb(e.target.value));
    setCurrentPage(1);
  };
  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    //Seteo que cuando se ordene la pagina sea 1 === la primera
    setCurrentPage(1);
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getRecipes());
  };
  const handleO = (e) => {
    e.preventDefault();
    dispatch(orderByHealthscore(e.target.value));
    setCurrentPage(1);
  };
  return (
    <div className={`${style.container}`}>
      <NavBar setCurrentPage={setCurrentPage} />
      <div className="drawer z-50">
        <input id="my-drawer" type="checkbox" onClick={() => setFiltros(!filtros)} className="drawer-toggle" />
        <div className="drawer-content z-50">
          <label
            htmlFor="my-drawer"
            className="absolute  cursor-pointer top-0 -mt-14 text-[3rem] z-50 bg-transparent text-white ">
            <BsFilterLeft />
          </label>
        </div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer" className="drawer-overlay z-50"></label>
          <ul className="menu p-4 w-60 sm:w-80 h-full bg-gray-200 z-50 text-base-content">
            {filtros === true && (
              <div className={style.filtros}>
                <h3 className="text-4xl flex items-end bg-transparent justify-between font-medium font-[Poppins]">
                  Filters <span className=" hover:underline bg-transparent text-xs">clean filters</span>{" "}
                </h3>
                <select
                  defaultValue="Alphatebical order"
                  onChange={handleOrder}
                  className="select select-bordered w-full max-w-xs">
                  <option disabled>Alphatebical order</option>
                  <option value="default">Default</option>
                  <option value="A">Z-A</option>
                  <option value="D">A-Z</option>
                </select>
                <select
                  defaultValue="+ or - Healthier order"
                  onChange={handleO}
                  className="select select-bordered w-full max-w-xs">
                  <option disabled>+ or - Healthier order</option>
                  <option value="default">Default</option>
                  <option value="D"> + Healthier</option>
                  <option value="A"> - Healthier</option>
                </select>
                <select
                  defaultValue="Filter by diet types"
                  className="select select-bordered w-full max-w-xs"
                  onChange={handleFilterDiets}>
                  <option disabled>Filter by diet types</option>
                  <option value="default">All</option>
                  <option value="dairy free--">dairy free</option>
                  <option value="gluten free--">gluten free</option>
                  <option value="lacto ovo vegetarian--">lacto ovo vegetarian</option>
                  <option value="vegan--">vegan</option>
                  <option value="pescatarian--">pescatarian</option>
                  <option value="paleolithic--">paleolithic</option>
                  <option value="primal--">primal</option>
                  <option value="vegetarian--">vegetarian</option>
                  <option value="fodmap friendly--">fodkmap friendly</option>
                  <option value="ketogenic--">ketogenic</option>
                </select>
                <select
                  defaultValue="Filter by created or existing"
                  className="select select-bordered w-full max-w-xs"
                  onChange={(e) => handleFilterCreated(e)}>
                  <option disabled>Filter by created or existing</option>
                  <option value="default">All</option>
                  <option value="createdInDb">Created</option>
                  <option value="api">Existing</option>
                </select>
              </div>
            )}
          </ul>
        </div>
      </div>
      <h1 className={`${style.text}`}>The Recipe Bookshelf</h1>
      {loading ? (
        <div className="h-[60vh] w-full flex items-center justify-center">
          <div className={style.loader}>
            <div>
              <ul>
                <li>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                  </svg>
                </li>
                <li>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                  </svg>
                </li>
                <li>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                  </svg>
                </li>
                <li>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                  </svg>
                </li>
                <li>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                  </svg>
                </li>
                <li>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                  </svg>
                </li>
              </ul>
            </div>
            <p className="text-white flex justify-center font-medium text-xl">Loading</p>
          </div>
        </div>
      ) : (
        <Cards currentRecipes={currentRecipes} />
      )}
      <div className="w-full relative mb-5 flex justify-center items-center">
        <Paginado
          recipesPerPage={recipesPerPage}
          recipes={recipes.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
export default Home;
