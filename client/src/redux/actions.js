import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const FILTER = "FILTER";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const FILTER_DB = "FILTER_DB";
export const ORDER_BY_NAME = "ORDER_BY_NAME";

export const getRecipes = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/recipes");
    const recipes = apiData.data;
    return dispatch({ type: GET_RECIPES, payload: recipes });
  };
};
export const getRecipeByName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `http://localhost:3001/recipes?name=${name}`
    );
    const recipeName = apiData.data;
    return dispatch({
      type: GET_RECIPE_BY_NAME,
      payload: recipeName,
    });
  };
};

export const filterRecipesDiets = (payload) => {
  return {
    type: FILTER,
    payload,
  };
};

export const filterCreatedInDb = (payload) => {
  return {
    type: FILTER_DB,
    payload,
  };
};
export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};
