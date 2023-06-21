const { Router } = require("express");
const {
  recipeHandler,
  recipeByIdHandler,
  recipePostHandler,
} = require("../Handlers/recipeHandlers");
const recipeRouter = Router();

recipeRouter.get("/", recipeHandler);

recipeRouter.get("/:id", recipeByIdHandler);

recipeRouter.post("/", recipePostHandler);

module.exports = recipeRouter;
