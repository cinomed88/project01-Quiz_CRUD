import axios from "axios";
import { Redirect } from 'react-router-dom'
import { endPoint } from "../App";

const SignOut = () => {
    axios.get(`${endPoint}/auth/logout`, { withCredentials: true })
    .then((res) => {
        if (res.data) console.log("Complete to logout");
    })
    .catch((err) => console.log(err));

    return <Redirect to="/signin" />
}
export default SignOut;