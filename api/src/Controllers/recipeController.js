const { Recipe } = require("../db");
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

const searchRecipeByName = async (name) => {
  // Buscar por query, si no encuentra en la BD, busca en la api con un filter
  const databaseRecipe = await Recipe.findAll({
    where: { name: { [Op.like]: `%${name}%` } },
  });

  const apiRecipe = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    )
  ).data;
  const newApi = cleanArray(apiRecipe.results);

  const filteredApi = newApi.filter((recipe) =>
    //Se busca si el .name de recipe que llega incluye al name que llega por params
    recipe.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
  );
  //Concateno todos las recetas que sean iguales al nombre de la receta que me vino por query
  return [...databaseRecipe, ...filteredApi];
};

const getAllRecipes = async () => {
  //Traigo todas las recetas, ya sean de la BD o de la API
  const databaseRecipe = await Recipe.findAll();

  const apiRecipe = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    )
  ).data;
  const newApi = cleanArray(apiRecipe.results);
  //Concateno los resultados obtenidos de la api y limpio el array con la funcion anteriormente mencionada
  return [...databaseRecipe, ...newApi];
};

const createController = async (name, summary, image) =>
  //Crea una nueva receta en la base de datos
  await Recipe.create({ name, summary, image });

const getRecipeById = async (id, source) => {
  //Traigo la receta obtenida por ID, si la source es API, busco en la API, si es bdd, busca en la base de datos. Eso lo define el ID.
  const recipe =
    source === "api"
      ? (
          await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
          )
        ).data
      : //Si la source NO es "api", procedo a buscar por primary key en la BD, las recetas por ID
        await Recipe.findByPk(id);
  return recipe;
};
module.exports = {
  createController,
  getRecipeById,
  searchRecipeByName,
  getAllRecipes,
};
