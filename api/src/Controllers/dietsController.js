const { Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const cleanArray = (arr) =>
  arr.map((e) => {
    return {
      //Eliminar guiones y espacios en blanco de las dietas
      diets: e.diets.map((diet) => diet + "--"),
    };
  });

const getAllDiets = async () => {
  const apiResponse = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    )
  ).data;

  const newApi = cleanArray(apiResponse.results);

  // Obtener nombres de dietas únicos
  const dietNames = new Set();
  newApi.forEach((item) => {
    item.diets.forEach((diet) => {
      dietNames.add(diet);
      dietNames.add("vegetarian--");
    });
  });

  // Convertir el conjunto de nombres de dietas a un array
  const uniqueDietNames = [...dietNames];
  console.log(uniqueDietNames);

  // Guardar los nombres de dietas en la base de datos usando Sequelize
  uniqueDietNames.forEach(async (dietName) => {
    await Diet.findOrCreate({
      where: { name: dietName },
    });
  });
  const databaseDiets = await Diet.findAll();
  console.log(databaseDiets);
  return databaseDiets;
};

module.exports = {
  getAllDiets,
};