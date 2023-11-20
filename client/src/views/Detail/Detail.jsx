import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearDetail, getGameById } from "../../redux/actions/actions";

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

  const renderPlatforms = () => {
    if (detail.platforms && detail.platforms.length > 0) {
      return detail.platforms.map((platform) => {
        if (typeof platform === "string") {
          // Si es una cadena (proviene de la base de datos)
          return platform;
        } else if (platform.platform && platform.platform.name) {
          // Si es un objeto (proviene de la API)
          return platform.platform.name;
        }
        return null;
      }).filter(platform => platform).join(", ");
    }
    return "Not available";
  };

  return (
    <div>
      <h1>Id: {detail.id}</h1>
      <img src={detail.image} alt="" />
      <h2>{detail.name}</h2>
      <h3>Rating: {detail.rating}</h3>
      <h3>Released: {detail.released}</h3>
      <h3>Platforms: {renderPlatforms()}</h3>
      <h3>Genres: {detail.genres?.map((genre) => genre.name).join(", ")}</h3>
      <p>{detail.description}</p>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default Detail;