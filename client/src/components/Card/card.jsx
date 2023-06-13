import style from "./card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <Link className={style.container} to={`/detail/${props.id}`}>
      <div>
        <p className={style.name}>Name: {props.name}</p>
        <div className={style.dietscont}>
          <p className={style.diets}>
            Diet types: {props.diets.map((e) => (e.name ? e.name : e))}
          </p>
        </div>
        <p className={style.health}>Healthscore: {props.healthScore}%</p>
        <div className={style.imagecont}>
          <img className={style.image} src={props.image} alt="" />
        </div>
      </div>
    </Link>
  );
};

export default Card;
