import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./form.module.css";
import validate from "../../components/validate/validation";
const CreateRecipe = () => {
  const dispatch = useDispatch();
  // const [reject, setReject] = useState(true);
  const diets = useSelector((state) => state.diets);
  const [input, setInput] = useState({
    name: "",
    summary: "",
    image: "",
    stepByStep: "",
    healthScore: "",
    diets: [],
  });

  const [errores, setErrores] = useState({
    name: "",
    summary: "",
    image: "",
    stepByStep: "",
    healthScore: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrores(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleCheck = (e) => {
    if (e.target.checked) {
      setInput({ ...input, diets: [...input.diets, e.target.value] });
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((x) => x !== e.target.value),
      });
    }
  };
  console.log(input);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert("Receta creada!");
    setInput({
      name: "",
      summary: "",
      image: "",
      stepByStep: "",
      healthScore: "",
      diets: [],
    });
  };
  const handleInputChange = (event) => {
    event.target.placeholder = "";
  };
  const handleMouseLeave2 = (event) => {
    event.target.placeholder = " Add a name to the recipe . . .";
  };
  const handleMouseLeave3 = (event) => {
    event.target.placeholder = " Add a detailed description. . .";
  };
  const handleMouseLeave4 = (event) => {
    event.target.placeholder = " Add a step by step preparation. . .";
  };
  const handleMouseLeave5 = (event) => {
    event.target.placeholder =
      " Add a 1-100 rating on how healthier it is. . .";
  };
  const handleMouseLeave6 = (event) => {
    event.target.placeholder = " Add an Image by URL on JPG. . .";
  };
  console.log(diets);
  return (
    <div className={style.container}>
      <Link to="/home">
        <button className={style.botonhome}>Home</button>
      </Link>
      <h1 className={style.recetacustom}>Add a custom recipe!</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.form}>
          <label className={style.texto}>Name: </label>
          <input
            placeholder=" Add a name to the recipe . . ."
            className={style.labelPasos}
            type="text"
            value={input.name}
            onChange={handleChange}
            name="name"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave2}
          />
          {errores.name && <p className={style.error}>{errores.name}</p>}
          <label className={style.texto}>Summary: </label>
          <input
            placeholder=" Add a detailed description. . ."
            className={style.labelPasos}
            type="text"
            value={input.summary}
            onChange={handleChange}
            name="summary"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave3}
          />

          <label className={style.texto}>Steps: </label>
          <input
            placeholder=" Add a step by step preparation. . ."
            className={style.labelPasos}
            type="text"
            value={input.stepByStep}
            onChange={handleChange}
            name="stepByStep"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave4}
          />
          <label className={style.texto}>Healthscore: </label>
          <input
            placeholder=" Add a 1-100 rating on how healthier it is. . ."
            className={style.labelPasos}
            type="text"
            value={input.healthScore}
            onChange={handleChange}
            name="healthScore"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave5}
          />
          {errores.healthScore && (
            <p className={style.error}>{errores.healthScore}</p>
          )}
          <label className={style.texto}>Image: </label>
          <input
            placeholder=" Add an Image by URL on JPG. . ."
            className={style.labelPasos}
            type="text"
            value={input.image}
            onChange={handleChange}
            name="image"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave6}
          />
          {errores.image && <p className={style.error}>{errores.image}</p>}
          <label className={style.texto12}>Diets: </label>
          {diets.length < 11 ? (
            <div className={style.loding}>
              <h1>... Loading</h1>
            </div>
          ) : (
            diets.map((e) => (
              <div className={style.check}>
                <label className={style.textBox}>{e.name}</label>
                <input
                  type="checkbox"
                  onChange={handleCheck}
                  value={e.id}
                ></input>
              </div>
            ))
          )}
        </div>

        {errores && (errores.name || errores.healthScore || errores.image) ? (
          <h1 className={style.errores2}>Check your errors</h1>
        ) : errores &&
          (input.name === "" ||
            input.healthScore === "" ||
            input.image === "") ? (
          <h1 className={style.errores2}>Fill in the blanks</h1>
        ) : (
          <button className={style.submit} type="submit">
            Add your recipe
          </button>
        )}
      </form>
    </div>
  );
};
export default CreateRecipe;
