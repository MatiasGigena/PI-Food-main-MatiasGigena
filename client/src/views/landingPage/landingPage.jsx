import { Link } from "react-router-dom";
import style from "./landingPage.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate()
  const [animation, setAnimation] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
      navigate("/home")
    },3500)
  },[])
  return (
    <div className={style.LandingPage}>
      <h1 className={style.text1}>Recipe bookshelf</h1>
      <div className="holder">
        <div className="candle">
          <div className="blinking-glow"></div>
          <div className="thread"></div>
          <div className="glow"></div>
          <div className="flame"></div>
        </div>
    </div>
      <h2 className={style.text}>Created by: Matias Gigena</h2>
    </div>
  );
};

export default LandingPage;
