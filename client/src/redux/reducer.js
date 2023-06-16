import {
  GET_RECIPES,
  FILTER,
  GET_RECIPE_BY_NAME,
  FILTER_DB,
  ORDER_BY_NAME,
  POST_RECIPE,
  GET_DIETS,
  GET_DETAIL,
  ORDER_BY_HS,
} from "./actions";

const initialState = {
  recipes: [],
  recipesFiltered: [],
  aux: [],
  diets: [],
  detail: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        aux: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case GET_RECIPE_BY_NAME:
      return { ...state, recipes: action.payload };
    case FILTER:
      const filterValue = action.payload;

      if (filterValue === "default") {
        return { ...state, recipes: state.aux };
      }
      const estadoGlobal = [...state.recipes];
      let filteredRecipes = estadoGlobal.filter((recipe) =>
        recipe.diets.includes(filterValue)
      );

      return {
        ...state,
        recipesFiltered: filteredRecipes,
        recipes: filteredRecipes,
      };
    case FILTER_DB:
      if (action.payload === "default") {
        return { ...state, recipes: state.aux };
      }
      const estadoGlobel = [...state.aux];
      const createdFilter =
        action.payload === "createdInDb"
          ? estadoGlobel.filter((recipe) => recipe.createdInDb)
          : estadoGlobel.filter((recipe) => !recipe.createdInDb);
      if (createdFilter.length === 0) {
        window.alert("No se encontraron recetas de esa proveniencia");
        return { ...state, recipes: state.aux };
      }
      return {
        ...state,
        recipes: createdFilter,
      };
    case ORDER_BY_NAME:
      if (action.payload === "default") {
        return { ...state, recipes: state.aux };
      }
      const estadoGlobx = [...state.recipes];
      let sortedArr =
        action.payload === "A"
          ? estadoGlobx.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : estadoGlobx.sort(function (a, b) {
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
    case POST_RECIPE:
      return {
        ...state,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case ORDER_BY_HS:
      if (action.payload === "default") {
        return { ...state, recipes: state.aux };
      }
      const estadoGlob = [...state.recipes];
      let sortArrayHS =
        action.payload === "A"
          ? estadoGlob.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : estadoGlob.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        recipes: sortArrayHS,
      };
    default:
      return state;
  }
};
export default reducer;
