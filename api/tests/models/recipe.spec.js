const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));

    describe("name", () => {
      it("should throw an error if name is null", async () => {
        try {
          await Recipe.create({});
          throw new Error("It requires a valid name");
        } catch (error) {
          expect(error.name).to.equal("SequelizeValidationError");
        }
      });

      it("should work when it has a valid name", async () => {
        const recipe = await Recipe.create({
          name: "Milanesa a la napolitana",
        });
        expect(recipe.name).to.equal("Milanesa a la napolitana");
      });
    });

    // Agrega más pruebas para validar los otros campos del modelo
    describe("summary", () => {
      it("should work when it has a valid summary", async () => {
        const recipe = await Recipe.create({
          name: "Milanesa a la napolitana",
          summary: "Deliciosa milanesa napolitana a caballo con dos huevos",
        });
        expect(recipe.summary).to.equal(
          "Deliciosa milanesa napolitana a caballo con dos huevos"
        );
      });
    });

    describe("healthScore", () => {
      it("should throw an error if healthScore is not a number", async () => {
        try {
          await Recipe.create({
            name: "Milanesa a la napolitana",
            healthScore: "hola esto es una prueba de henry",
          });
          throw new Error("It requires a valid healthScore");
        } catch (error) {
          expect(error.name).to.equal("SequelizeValidationError");
        }
      });

      it("should work when it has a valid healthScore", async () => {
        const recipe = await Recipe.create({
          name: "Milanesa a la napolitana",
          healthScore: 9,
        });
        expect(recipe.healthScore).to.equal(9);
      });
    });

    // ...
  });
});
