const {
  getRecipeById,
  createController,
  searchRecipeByName,
  getAllRecipes,
} = require("../Controllers/recipeController");

const recipeHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name
      ? await searchRecipeByName(name)
      : await getAllRecipes();
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ error: "No se han podido renderizar las receta/s" });
  }
};
const recipeByIdHandler = async (req, res) => {
  const { id } = req.params;
  //Ternario, si el id es NAN significa que la receta pertenece a la base de datos, sino, es API .
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const recipeId = await getRecipeById(id, source);
    res.status(200).json(recipeId);
  } catch (error) {
    res.status(500).json({ error: "No existe la receta buscada por ID" });
  }
};
const recipePostHandler = async (req, res) => {
  const { name, summary, image, stepByStep, healthScore, diets } = req.body;
  try {
    if (!name) res.status(400).json({ error: "Missing name" });
    const newRecipe = await createController(
      name,
      summary,
      image,
      stepByStep,
      healthScore,
      diets
    );
    res.status(200).json("Receta creada con exito!");
  } catch (error) {
    res.status(500).json({ error: "No se ha podido crear tu receta" });
  }
};
module.exports = {
  recipeHandler,
  recipeByIdHandler,
  recipePostHandler,
};
