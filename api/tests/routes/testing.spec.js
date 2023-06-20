const request = require("supertest");
const app = require("../../src/app");
const { expect } = require("chai");

describe("Recipe Routes", () => {
  describe("GET /recipes", () => {
    it("should respond with all recipes", async function () {
      this.timeout(5000); // Establece un límite de tiempo de 5000ms (5 segundos)

      const response = await request(app).get("/recipes");

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
      // Agrega más expectativas según la estructura y el contenido de la respuesta
    });
  });

  describe("GET /recipes/:id", () => {
    it("should respond with a specific recipe by ID", async () => {
      const recipeId = "123"; // ID de la receta existente

      const response = await request(app).get(`/recipes/${recipeId}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
      // Agrega más expectativas según la estructura y el contenido de la respuesta
    });
  });

  describe("GET /recipes?name=", () => {
    it("should respond with filtered recipes based on query parameters", async function () {
      this.timeout(5000); // Establece un límite de tiempo de 5000ms (5 segundos)

      const response = await request(app).get("/recipes?name=pizza");

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
      // Agrega más expectativas según la estructura y el contenido de la respuesta
    });
  });
});
