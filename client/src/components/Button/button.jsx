import { Link } from "react-router-dom";
import style from "./button.module.css";
import RamenDiningIcon from '@mui/icons-material/RamenDining';
const Button = () => {
  return (
    <div className={style.container}>
      <Link to="/createrecipe">
        <button className="avatar bg-white shadow-xl border-2  rounded-full h-10 w-10 flex justify-center items-center"><RamenDiningIcon style={{ fontSize: "32px", color: "black" }} /></button>
      </Link>
    </div>
  );
};
export default Button;
