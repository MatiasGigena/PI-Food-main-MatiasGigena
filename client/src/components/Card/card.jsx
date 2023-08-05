const Card = (props) => {
  return (
    <div className=" w-60 mb-28 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8 border">
      <div className="relative flex items-end overflow-hidden rounded-xl">
        <img src={props.image} className="w-full" alt="wallpaper" />

        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.318 2.318a4.5 4.5 0 016.364 0L10.001 3l-.319-.318a4.5 4.5 0 016.364 6.364L10 15.409l-6.045-6.045a4.5 4.5 0 010-6.364z"
              clipRule="evenodd"
            />
          </svg>

          <span className="ml-1 text-sm text-slate-400">{props.healthScore}</span>
        </div>
      </div>

      <div className="mt-1 p-2">
        <h2 className="text-black font-normal font-[Poppins] h-[50px]">
          {props.name}
        </h2>
        <p className="mt-3 font-light font-[Poppins] flex items-center   text-xs h-[60px] text-grey">
          {props.diets && props.diets.map((e) => (e.name ? e.name : e))}
        </p>

        <div className="mt-3 flex items-end justify-between ">
          <div className="group inline-flex rounded-xl bg-orange-100 p-2 hover:bg-orange-200">
            <a href={`/detail/${props.id}`} className="font-[Poppins]">
              More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
