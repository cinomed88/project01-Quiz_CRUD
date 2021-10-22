import { useState } from "react";
import axios from "axios";
import { endPoint } from "../App";
import { Redirect } from "react-router";

const SignIn = () => {
    const [user, setUser] = useState({username: '', password: ''});
    const { username, password } = user;
    const [loginState, setLoginState] = useState(null);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const onHandleSubmit = (e) => {
        const params = new URLSearchParams({ username, password })
        e.preventDefault();
        axios.post(`${endPoint}/auth/login`, params, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
            if (res.data) setLoginState(true);
        })
        .catch((err) => console.log(err));
        setUser({ username: '', password: '' });
    }

    if (loginState) return <Redirect to="/" />

    return(
        <div className="App">
            <h2>SignIn Page</h2>
            <form onSubmit={onHandleSubmit}>
                <div>
                    <label>Username: </label>
                    <input type="text" name="username" value={username} onChange={onChangeInput} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={password} onChange={onChangeInput} />
                </div>
                <div>
                    <input type="submit" value="Log In"/>
                </div>
            </form>
        </div>
    ); 
};
export default SignIn;