import style from "./card.module.css";

const Card = (props) => {
  return (
    <div className={style.container}>
      <p className={style.name}>Name: {props.name}</p>
      <div className={style.dietscont}>
        <p className={style.diets}>Diet types: {props.diets}</p>
      </div>
      <p className={style.health}>Healthscore: {props.healthScore}%</p>
      <div className={style.imagecont}>
        <img className={style.image} src={props.image} alt="" />
      </div>
    </div>
  );
};

export default Card;
