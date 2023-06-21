const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");

const cleanArray = (arr) =>
  //Limpiar el array, me quedo con solo lo que necesito.
  arr.map((elm) => {
    return {
      id: elm.id,
      name: elm.title,
      image: elm.image,
      healthScore: elm.healthScore,
      diets: elm.diets.map((e) => e + "--"),
      createdInDb: elm.createdInDb,
    };
  });
const cleanArrayID = (arr) =>
  arr.map((elm) => {
    let step = elm.analyzedInstructions.map((a) => {
      return a.steps.map((as) => {
        return `Step ${as.number}: ${as.step}.`;
      });
    });
    return {
      id: elm.id,
      name: elm.title,
      summary: elm.summary.replace(/<[^>]+>/g, ""), //Elimino guiones, barras y letras xtra por espacios sin strings vacios
      image: elm.image,
      healthScore: elm.healthScore,
      stepByStep: step[0],
      diets: elm.diets.map((e) => e + "--"),
      createdInDb: elm.createdInDb,
    };
  });

const searchRecipeByName = async (name) => {
  const databaseRecipe = await Recipe.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const apiRecipe = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    )
  ).data;
  const newApi = cleanArray(apiRecipe.results);

  const filteredApi = newApi.filter((recipe) =>
    recipe.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
  );

  return [...databaseRecipe, ...filteredApi];
};

const getAllRecipes = async () => {
  const databaseRecipe = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const apiRecipe = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    )
  ).data;
  const newApi = cleanArray(apiRecipe.results);
  return [...databaseRecipe, ...newApi];
};

const createController = async (
  name,
  summary,
  image,
  stepByStep,
  healthScore,
  diets
) => {
  const nRecipe = await Recipe.create({
    name,
    summary,
    image,
    stepByStep,
    healthScore,
  });
  diets.map(async (diet) => await nRecipe.addDiet(diet));
  return nRecipe;
};

const getRecipeById = async (id, source) => {
  const recipe =
    source === "api"
      ? (
          await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
          )
        ).data
      : await Recipe.findByPk(id);
  return source === "api" ? cleanArrayID([recipe]) : recipe;
};
module.exports = {
  createController,
  getRecipeById,
  searchRecipeByName,
  getAllRecipes,
};
