const { Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const cleanArray = (arr) =>
  arr.map((e) => {
    return {
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

  const uniqueDietNames = [...dietNames];

  for (const dietName of uniqueDietNames) {
    await Diet.findOrCreate({
      where: { name: dietName },
    });
  }

  const databaseDiets = await Diet.findAll();
  return databaseDiets;
};

module.exports = {
  getAllDiets,
};
