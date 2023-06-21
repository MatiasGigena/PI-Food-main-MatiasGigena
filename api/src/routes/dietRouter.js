const { Router } = require("express");
const dietRouter = Router();
const { getDietsHandler } = require("../Handlers/dietsHandler");

dietRouter.get("/", getDietsHandler);

module.exports = dietRouter;
