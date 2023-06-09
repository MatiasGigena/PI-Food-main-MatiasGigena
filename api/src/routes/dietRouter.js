const { Router } = require("express");
const dietRouter = Router();
const { getDietsHandler } = require("../Handlers/dietsHandler");

//----------------Get ALL diets--------------------//
dietRouter.get("/", getDietsHandler);

module.exports = dietRouter;
