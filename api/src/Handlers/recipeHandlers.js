const {
  getRecipeById,
  createController,
  searchRecipeByName,
  getAllRecipes,
} = require("../Controllers/recipeController");

const recipeHandler = async (req, res) => {
  //ESTA FUNCION VA A BUSCAR POR QUERY y SINO, MUESTRA TODAS LAS RECETAS
  const { name } = req.query;
  //Ternario, si no se busco una receta por query, mostra todas las recetas
  const results = name ? await searchRecipeByName(name) : await getAllRecipes();

  res.status(200).json(results);
};
const recipeByIdHandler = async (req, res) => {
  //ESTA FUNCION VA A BUSCAR POR ID
  const { id } = req.params;
  //Ternario, si el id es NAN significa que la receta pertenece a la base de datos, sino, es API .
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const recipeId = await getRecipeById(id, source);
    res.status(200).json(recipeId);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};
const recipePostHandler = async (req, res) => {
  //ESTA FUNCION VA A SERVIR PARA POSTEAR NUEVAS RECETAS
  const { name, summary, image, stepByStep, healthScore, diets } = req.body;
  try {
    // Crear nuevas recetas
    const newRecipe = await createController(
      name,
      summary,
      image,
      stepByStep,
      healthScore,
      diets
    );
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = {
  recipeHandler,
  recipeByIdHandler,
  recipePostHandler,
};
