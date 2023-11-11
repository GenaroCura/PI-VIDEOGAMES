import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameById } from "../../redux/actions/actions";

const Detail = () => {

    const dispatch = useDispatch()
    const params = useParams();

    
    const detail = useSelector(state => state.detail)


    useEffect(()=>{
        dispatch(getGameById(params.id))    
    },[])
    console.log(detail)
    return (
        <div>
            <h1>Id: {detail.id}</h1>
            <img src={detail.image} alt="" />
            <h2>{detail.name}</h2>
            <h3>Rating: {detail.rating}</h3>
            <h3>Released: {detail.released}</h3>
            <p>{detail.description}</p>
        </div>
    )
};


export default Detail;