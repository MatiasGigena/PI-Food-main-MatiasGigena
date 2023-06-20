import style from "./paginado.module.css";

const Paginado = ({ currentPage, recipesPerPage, recipes, paginado }) => {
  const pageNumbers = [];
  const goToNextPage = () => {
    paginado(currentPage + 1);
  };

  const goToPrevPage = () => {
    paginado(currentPage - 1);
  };
  //Itero todas las recetas dividido las recetas por pagina y pusheo al array de pageNumbers, los numeros de cada pagina
  for (let index = 1; index <= Math.ceil(recipes / recipesPerPage); index++) {
    pageNumbers.push(index);
  }
  return (
    <div>
      <nav>
        <ul className={style.container}>
          <li className={style.paginado}>
            <button
              className={style.botonPrev}
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              ᴧ
            </button>
          </li>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li className={style.paginado} key={number}>
                <a
                  className={`${style.boton} ${
                    currentPage === number ? style.currentPage : ""
                  }`}
                  onClick={() => paginado(number)}
                >
                  {number}
                </a>
              </li>
            ))}
          <li className={style.paginado}>
            <button
              className={style.botonSig}
              onClick={goToNextPage}
              disabled={currentPage === Math.ceil(recipes / recipesPerPage)}
            >
              V
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Paginado;
