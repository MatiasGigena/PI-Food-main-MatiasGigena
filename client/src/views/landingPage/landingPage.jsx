import { Link } from "react-router-dom";
import style from "./landingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.LandingPage}>
      <h2 className={style.text1}>I´M A FOOD ADDICT</h2>
      <Link to="/home">
        <button className={style.boton}>Get STARTED!</button>
      </Link>
      <h2 className={style.text}>Created by: Matias Gigena</h2>
    </div>
  );
};

export default LandingPage;
