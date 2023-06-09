const { Router } = require("express");
const recipeRouter = require("./recipeRouter");
const dietRouter = require("./dietRouter");

const router = Router();
//----------------En el endpoint /recipes, utilizo mi router de Recipes--------------------//
router.use("/recipes", recipeRouter);
//----------------En el endpoint /diets, utilizo mi router de Diets--------------------//
router.use("/diets", dietRouter);

module.exports = router;
