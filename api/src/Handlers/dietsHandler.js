const { getAllDiets } = require("../Controllers/dietsController");

const getDietsHandler = async (req, res) => {
  //Consigo todas las dietas, si no es asi, lanzo un error
  try {
    const results = await getAllDiets();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

module.exports = { getDietsHandler };
