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
  filterValue: "default",
  filterDbValue: "default",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        aux: [...action.payload],
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
      const allRecipes = [...state.aux];
      let filteredRecipes = [];

      if (filterValue === "default") {
        filteredRecipes = allRecipes;
      } else {
        filteredRecipes = allRecipes.filter((recipe) => {
          if (recipe.diets.includes(filterValue)) {
            return true;
          } else if (
            filterValue !== "" &&
            recipe.createdInDb &&
            recipe.diets.find((diet) => diet.name === filterValue)
          ) {
            return true;
          }
          return false;
        });
      }

      const filterDbValue = state.filterDbValue;
      if (filterDbValue === "createdInDb") {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.createdInDb
        );
      } else if (filterDbValue === "api") {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => !recipe.createdInDb
        );
      }

      return {
        ...state,
        recipes: filteredRecipes,
        filterValue: filterValue,
      };
    case FILTER_DB:
      const allRecipess = [...state.aux];
      let createdFilter = [];

      if (action.payload === "default") {
        createdFilter = allRecipess;
      } else if (action.payload === "createdInDb") {
        createdFilter = allRecipess.filter((recipe) => recipe.createdInDb);
      } else if (action.payload === "api") {
        createdFilter = allRecipess.filter((recipe) => !recipe.createdInDb);
      }

      const filterValuue = state.filterValue;
      if (filterValuue !== "default") {
        createdFilter = createdFilter.filter((recipe) => {
          if (recipe.diets.includes(filterValuue)) {
            return true;
          } else if (
            filterValuue !== "" &&
            recipe.createdInDb &&
            recipe.diets.find((diet) => diet.name === filterValuue)
          ) {
            return true;
          }
          return false;
        });
      }

      return {
        ...state,
        recipes: createdFilter,
        filterDbValue: action.payload,
      };
    case ORDER_BY_NAME:
      if (action.payload === "default") {
        let filteredRecipes = [...state.aux];

        const filterValue = state.filterValue;
        if (filterValue !== "default") {
          filteredRecipes = filteredRecipes.filter((recipe) => {
            if (recipe.diets.includes(filterValue)) {
              return true;
            } else if (
              filterValue !== "" &&
              recipe.createdInDb &&
              recipe.diets.find((diet) => diet.name === filterValue)
            ) {
              return true;
            }
            return false;
          });
        }

        const filterDbValue = state.filterDbValue;
        if (filterDbValue === "createdInDb") {
          filteredRecipes = filteredRecipes.filter(
            (recipe) => recipe.createdInDb
          );
        } else if (filterDbValue === "api") {
          filteredRecipes = filteredRecipes.filter(
            (recipe) => !recipe.createdInDb
          );
        }

        return { ...state, recipes: filteredRecipes };
      }
      const estadoGlobx = [...state.recipes];
      let sortedArr =
        action.payload === "D"
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
        let filteredRecipes = [...state.aux];

        const filterValue = state.filterValue;
        if (filterValue !== "default") {
          filteredRecipes = filteredRecipes.filter((recipe) => {
            if (recipe.diets.includes(filterValue)) {
              return true;
            } else if (
              filterValue !== "" &&
              recipe.createdInDb &&
              recipe.diets.find((diet) => diet.name === filterValue)
            ) {
              return true;
            }
            return false;
          });
        }

        const filterDbValue = state.filterDbValue;
        if (filterDbValue === "createdInDb") {
          filteredRecipes = filteredRecipes.filter(
            (recipe) => recipe.createdInDb
          );
        } else if (filterDbValue === "api") {
          filteredRecipes = filteredRecipes.filter(
            (recipe) => !recipe.createdInDb
          );
        }

        return { ...state, recipes: filteredRecipes };
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
