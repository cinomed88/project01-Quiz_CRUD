import { useState } from "react";
import axios from "axios";
import { endPoint } from "../App";

const SignIn = () => {
    const [user, setUser] = useState({username: '', password: ''});
    const { username, password } = user;
    // const [loginInfo, setLoginInfo] = useState(null);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const onHandleSubmit = (e) => {
        const params = new URLSearchParams({ username, password })
        e.preventDefault();
        axios.post(`${endPoint}/auth/login`, params, { withCredentials: true })
        .then((res) => {
            // setLoginInfo(res.data);
            console.log(res.data);
        })
        .catch((err) => console.log(err));
        setUser({ username: '', password: '' });
    }

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
            {/* <div> {loginInfo ? <h1>Welcome {loginInfo.username} !</h1> : null} </div> */}
        </div>
    ); 
};
export default SignIn;