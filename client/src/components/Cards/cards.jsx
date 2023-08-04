import Card from "../Card/card";

const Cards = ({ currentRecipes }) => {
  return (
    <div className="grid mx-auto mt-4 sm:mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 ">
      {currentRecipes.map((recipe, index) => {
        return (
          <Card
            key={index}
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
