const validate = (input) => {
  let errores = {};

  if (!input.name) {
    errores.name = "Este campo es obligatorio";
  }

  const healthScore = Number(input.healthScore);

  if (isNaN(healthScore)) {
    errores.healthScore =
      "Debe ingresar un número válido para el porcentaje de salud";
  } else if (healthScore < 0 || healthScore > 100) {
    errores.healthScore = "El porcentaje de saludable debe estar entre 0 y 100";
  }

  if (
    input.image &&
    !/^((https?|ftp):\/\/[^\s\/$.?#].[^\s]*)\.jpg$/.test(input.image)
  ) {
    errores.image =
      "La imagen debe estar en formato de URL y ser un archivo JPG";
  }

  return errores;
};

export default validate;
