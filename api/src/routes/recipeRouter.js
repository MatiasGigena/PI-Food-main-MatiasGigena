const { Router } = require("express");
const {
  recipeHandler,
  recipeByIdHandler,
  recipePostHandler,
} = require("../Handlers/recipeHandlers");
const recipeRouter = Router();

//---------------Validation POST------------------//
// const validate = (req, res, next) => {
//   const { name, summary } = req.body;
//   if (!name) res.status(400).json({ error: "Missing name" });
//   if (!summary) res.status(400).json({ error: "Missing summary" });
//   next();
// };

//----------------Get by query recipes--------------------//
recipeRouter.get("/", recipeHandler);
//----------------Get by ID recipes--------------------//
recipeRouter.get("/:id", recipeByIdHandler);
//----------------Post new recipes--------------------//
recipeRouter.post("/", recipePostHandler);

module.exports = recipeRouter;
