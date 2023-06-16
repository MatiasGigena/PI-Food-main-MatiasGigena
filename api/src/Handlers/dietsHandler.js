const { getAllDiets } = require("../Controllers/dietsController");

const getDietsHandler = async (req, res) => {
  //Consigo todas las dietas, si no es asi, lanzo un error
  try {
    const results = await getAllDiets();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "No se han renderizado todas las dietas" });
  }
};

module.exports = { getDietsHandler };
