import Card from "../Card/card";
import style from "./cards.module.css";

const Cards = ({ currentRecipes }) => {
  return (
    <div className={style.container}>
      {currentRecipes.map((recipe) => {
        return (
          <Card
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            diets={recipe.diets}
            healthScore={recipe.healthScore}
          />
        );
      })}
    </div>
  );
};

export default Cards;
