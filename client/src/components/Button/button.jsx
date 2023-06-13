import { Link } from "react-router-dom";
import style from "./button.module.css";
const Button = () => {
  return (
    <div className={style.container}>
      <Link to="/createrecipe">
        <button className={style.boton}>Create recipe</button>
      </Link>
    </div>
  );
};
export default Button;
