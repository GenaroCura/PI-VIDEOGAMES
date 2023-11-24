import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearDetail, getGameById } from "../../redux/actions/actions";
import style from "./Detail.module.css";
const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getGameById(id));
    return () => {
      dispatch(clearDetail());
    };
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  //Para mapear mas sencillo la info de las plataformas.
  const platforms=[]
  let newPlatforms="";

  if(Number.isInteger(detail.id)){
    detail.platforms?.forEach((element)=>{
      if(!platforms.includes(element.platform.name)){
        platforms.push(element.platform.name)
      }
    })
  }else{
    detail.platforms?.forEach(platform => {
      return(newPlatforms+= `${platform} `)
    })
  }



  //Realizo esto para sacar las etiquetas html de la descripcion 
  const regex = /<\/?[a-z][\s\S]*?>/ig;
  const description = detail.description?.replace(regex,"");

  return (
    <div className={style.DetailContainer}>
      <h1>Id: {detail.id}</h1>
      <img src={detail.image} alt="" />
      <h2>Name: {detail.name}</h2>
      <h3>Rating: {detail.rating}</h3>
      <h3>Released: {detail.released}</h3>

      {Number.isInteger(detail.id)?<h4>Platforms: {platforms.join(" , ")}</h4>:<h4>Platforms: {newPlatforms}</h4>}

      <h3>Genres: {detail.genres?.map((genre) => genre.name).join(", ")}</h3>
      <p>{description}</p>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default Detail;