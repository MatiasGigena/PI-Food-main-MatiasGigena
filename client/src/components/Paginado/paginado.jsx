import style from "./paginado.module.css";
//recibe por props las variables que necesito
const Paginado = ({ recipesPerPage, recipes, paginado }) => {
  //declaro todas las paginas
  const pageNumbers = [];
  //Itero todas las recetas dividido las recetas por pagina y pusheo al array de pageNumbers, donde estan todos los numeros
  for (let index = 1; index <= Math.ceil(recipes / recipesPerPage); index++) {
    pageNumbers.push(index);
  }
  return (
    <div>
      <nav>
        <ul className={style.container}>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li className={style.paginado} key={number}>
                <a className={style.boton} onClick={() => paginado(number)}>
                  {number}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Paginado;
