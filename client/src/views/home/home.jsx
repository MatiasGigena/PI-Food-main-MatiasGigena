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
  console.log(recipes);
  return (
    <div className={style.container}>
      <NavBar setCurrentPage={setCurrentPage} />
      {/* <button onClick={handleClick} className={style.refresh}>
        ⟳
      </button> */}
      <button className={style.botonepico} onClick={() => setFiltros(!filtros)}>
        <BsFilterLeft />
      </button>
      {filtros === true && (
        <div className={style.filtros}>
          <select onChange={handleOrder} className={style.selector}>
            <option value="default">Default</option>
            <option value="A">Z-A</option>
            <option value="D">A-Z</option>
          </select>
          <select onChange={handleO} className={style.selector1}>
            <option value="default">Default</option>
            <option value="D"> + Healthier</option>
            <option value="A"> - Healthier</option>
          </select>
          <select className={style.selector3} onChange={handleFilterDiets}>
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
            className={style.selector2}
            onChange={(e) => handleFilterCreated(e)}
          >
            <option value="default">All</option>
            <option value="createdInDb">Created</option>
            <option value="api">Existing</option>
          </select>
        </div>
      )}

      <h1 className={style.text}>Food addicts</h1>
      <div className={style.paginado}>
        <Paginado
          recipesPerPage={recipesPerPage}
          recipes={recipes.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>

      <Cards currentRecipes={currentRecipes} />
    </div>
  );
};
export default Home;
