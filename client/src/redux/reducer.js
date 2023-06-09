import {
  GET_RECIPES,
  FILTER,
  GET_RECIPE_BY_NAME,
  FILTER_DB,
  ORDER_BY_NAME,
} from "./actions";

const initialState = {
  recipes: [],
  aux: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        aux: action.payload,
      };
    case GET_RECIPE_BY_NAME:
      return { ...state, recipes: action.payload };
    case FILTER:
      const filterValue = action.payload;

      if (filterValue === "default") {
        return { ...state, recipes: state.aux };
      }

      let filteredRecipes = state.recipes.filter((recipe) =>
        recipe.diets.includes(filterValue)
      );
      if (filteredRecipes.length === 0) {
        window.alert("No hay recetas con todas estas dietas");
        filteredRecipes = state.aux;
      }

      return { ...state, recipes: filteredRecipes };
    case FILTER_DB:
      const createdFilter =
        action.payload === "createdInDb"
          ? state.recipes.filter((recipe) => recipe.createdInDb)
          : state.recipes.filter((recipe) => !recipe.createdInDb);
      return {
        ...state,
        recipes: createdFilter,
      };
    case ORDER_BY_NAME:
      let sortedArr =
        action.payload === "A"
          ? state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        recipes: sortedArr,
      };
    default:
      return state;
  }
};
export default reducer;
