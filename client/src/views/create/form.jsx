import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./form.module.css";
const CreateRecipe = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [input, setInput] = useState({
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
    window.alert("Receta creada!");
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
  const handleMouseLeave = (event) => {
    event.target.placeholder = "Añadir. . .";
  };

  return (
    <div className={style.container}>
      <Link to="/home">
        <button className={style.botonhome}>Home</button>
      </Link>
      <h1 className={style.recetacustom}>Añade tu receta personalizada!</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.form}>
          <label className={style.texto}>Nombre: </label>
          <input
            placeholder=" Añadir. . ."
            className={style.labelPasos}
            type="text"
            value={input.name}
            onChange={handleChange}
            name="name"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave}
          />
          <label className={style.texto}>Resumen: </label>
          <input
            placeholder=" Añadir. . ."
            className={style.labelPasos}
            type="text"
            value={input.summary}
            onChange={handleChange}
            name="summary"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave}
          />
          <label className={style.texto}>Pasos: </label>
          <input
            placeholder=" Añadir. . ."
            className={style.labelPasos}
            type="text"
            value={input.stepByStep}
            onChange={handleChange}
            name="stepByStep"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave}
          />
          <label className={style.texto}>Healthscore: </label>
          <input
            placeholder=" Añadir. . ."
            className={style.labelPasos}
            type="text"
            value={input.healthScore}
            onChange={handleChange}
            name="healthScore"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave}
          />
          <label className={style.texto}>Imagen: </label>
          <input
            placeholder=" Añadir. . ."
            className={style.labelPasos}
            type="text"
            value={input.image}
            onChange={handleChange}
            name="image"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave}
          />
          <label className={style.texto12}>Diets: </label>
          {/* <select onChange={handleSelect} className={style.select}> */}
          {diets.map((e) => (
            <div className={style.check}>
              <label className={style.textBox}>{e.name}</label>
              <input
                type="checkbox"
                onChange={handleCheck}
                value={e.id}
              ></input>
            </div>
          ))}
        </div>
        <button className={style.submit} type="submit">
          Añadir receta
        </button>
      </form>
    </div>
  );
};
export default CreateRecipe;
