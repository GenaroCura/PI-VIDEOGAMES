import {NavLink} from "react-router-dom";

const Landing = () => {
    return (
        <div>
            <h1>Esta es la Landing Page !!</h1>


            <NavLink to="/home">
                <button>Go to Home</button>
            </NavLink>
        </div>

    )
};




export default Landing;