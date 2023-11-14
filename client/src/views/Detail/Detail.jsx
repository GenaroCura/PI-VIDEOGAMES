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
  }, [dispatch, id]);


  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <h1>Id: {detail.id}</h1>
      <img src={detail.image} alt="" />
      <h2>{detail.name}</h2>
      <h3>Rating: {detail.rating}</h3>
      <h3>Released: {detail.released}</h3>
      <h3>Platforms: {Array.isArray(detail.platforms) ? detail.platforms.map(platform => platform.platform.name).join(", ") : detail.platforms}</h3>
      <h3>Genres: {detail.genres && Array.isArray(detail.genres) && detail.genres.map(genre => genre.name).join(", ")}</h3>
      <p>{detail.description}</p>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default Detail;
