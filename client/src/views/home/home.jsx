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
          <label htmlFor="my-drawer" className="absolute top-0 -mt-14 text-[3rem] z-50 bg-transparent text-white ">
            <BsFilterLeft />
          </label>
        </div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer" className="drawer-overlay z-50"></label>
          <ul className="menu p-4 w-60 sm:w-80 h-full bg-gray-200 z-50 text-base-content">
            {/* Sidebar content here */}
            {filtros === true && (
              <div className={style.filtros}>
                <h3 className="text-4xl flex items-end justify-between font-medium font-[Poppins]">Filters <span className=" hover:underline text-xs">clean filters</span> </h3>
                <select onChange={handleOrder} className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Alphatebical order
                  </option>
                  <option value="default">Default</option>
                  <option value="A">Z-A</option>
                  <option value="D">A-Z</option>
                </select>
                <select onChange={handleO} className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                 + or - Healthier order
                  </option>
                  <option value="default">Default</option>
                  <option value="D"> + Healthier</option>
                  <option value="A"> - Healthier</option>
                </select>
                <select className="select select-bordered w-full max-w-xs" onChange={handleFilterDiets}>
                  <option disabled selected>
                    Filter by diet types
                  </option>
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
                <select className="select select-bordered w-full max-w-xs" onChange={(e) => handleFilterCreated(e)}>
                  <option disabled selected>
                    Filter by created or existing
                  </option>
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
      <Cards currentRecipes={currentRecipes} />
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
