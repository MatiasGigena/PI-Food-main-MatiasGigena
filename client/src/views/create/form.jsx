import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../redux/actions";
import style from "./form.module.css";
import validate from "../../components/validate/validation";
import { useNavigate } from "react-router-dom";
const CreateRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(input));
    setInput({
      name: "",
      summary: "",
      image: "",
      stepByStep: "",
      healthScore: "",
      diets: [],
    });
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    navigate("/home");
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
  return (
      <div className={`min-h-screen ${style.container} py-6 flex flex-col justify-center sm:py-12`}>
	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 rounded-3xl shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative px-4 py-10 bg-white rounded-3xl shadow-lg sm:rounded-3xl sm:p-20">
			<div className="max-w-md mx-auto">
				<div>
					<h1 className="text-2xl text-black font-semibold">Add a custom recipe!</h1>
				</div>
				<div className="divide-y divide-gray-200">
					<form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input type="text"
            value={input.name}
            onChange={handleChange}
            name="name"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave2} autoComplete="off"  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-white"  />
							<label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name your recipe</label>
              
						</div>
          {errores.name && <p className={style.error}>{errores.name}</p>}

						<div className="relative">
							<input type="text"
            value={input.summary}
            onChange={handleChange}
            name="summary"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave3} autoComplete="off"   className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-white" placeholder="Password" />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Describe your recipe</label>
						</div>
						<div className="relative">
							<input type="text"
           value={input.stepByStep}
           onChange={handleChange}
           name="stepByStep"
           onClick={handleInputChange}
           onMouseLeave={handleMouseLeave4} autoComplete="off"    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-white" />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Preparation step by step</label>
						</div>
						<div className="relative">
							<input type="text"
            value={input.healthScore}
            onChange={handleChange}
            name="healthScore"
            onClick={handleInputChange}
            onMouseLeave={handleMouseLeave5} autoComplete="off"   className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-white"  />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Healthiness percentage</label>
						</div>
            {errores.healthScore && (
            <p className={style.error}>{errores.healthScore}</p>
          )}
						<div className="relative">
							<input type="text"
                   value={input.image}
                   onChange={handleChange}
                   name="image"
                   onClick={handleInputChange}
                   onMouseLeave={handleMouseLeave6} autoComplete="off"   className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-white"/>
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Add an image by URL</label>
              </div>
              {errores.image && <p className={style.error}>{errores.image}</p>}
                        {diets.length < 11 ? (
                          <div className={style.loding}>
                            <h1>... Loading</h1>
                          </div>
                        ) : (
                          diets.map((e, index) => (
                            <div key={index} className="grid grid-cols-2 mt-2 border-b-2 border-gray-300">
                              <label className="text-gray-500 font-medium text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">{e.name}</label>
                              <input
                                type="checkbox"
                                onChange={handleCheck}
                                value={e.id}
                                className="ml-auto"
                              ></input>
                            </div>
                          ))
                        )}
						<div className="relative  flex justify-center">
							<button className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

);
};
export default CreateRecipe;
      