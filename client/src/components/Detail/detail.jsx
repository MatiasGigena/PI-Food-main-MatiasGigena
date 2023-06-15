import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import LoadingScreen from "../LoadingScreen/loadingScreen";
import style from "./detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);

  const renderDetail = () => {
    if (Array.isArray(detail) && detail.length > 0) {
      return (
        <div className={style.card}>
          <p className={style.nombre}>{detail[0].name}</p>
          <img
            className={style.img}
            src={detail[0].image}
            alt={detail[0].name}
          />
          <p className={style.texto17}>Preparation:</p>
          <p className={style.steps}>{detail[0].stepByStep}</p>
          <p className={style.texto1}>Summary: </p>
          <p className={style.summa}>{detail[0].summary}</p>
        </div>
      );
    } else if (!Array.isArray(detail)) {
      return (
        <div className={style.card}>
          <p className={style.nombre}>{detail.name}</p>
          <img className={style.img} src={detail.image} alt={detail.name} />
          <p className={style.texto17}>Preparation:</p>
          <p className={style.steps}>{detail.stepByStep}</p>
          <p className={style.texto1}>Summary: </p>
          <p className={style.summa}>{detail.summary}</p>
        </div>
      );
    } else {
      return <LoadingScreen />;
    }
  };

  return (
    <div className={style.container}>
      {renderDetail()}
      <Link to="/home">
        <button className={style.boton}>🏠</button>
      </Link>
    </div>
  );
};
export default Detail;
