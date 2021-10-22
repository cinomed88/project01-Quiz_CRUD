import "./App.css";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import Student from "./pages/Student.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignOut from "./pages/SignOut.jsx";
import NavBar from "./components/NavBar.jsx";

// export const endPoint = "https://lucaswgong.com/projects/01/API/v2/";
export const endPoint = "http://localhost:3001/projects/01/API/v2";
const basePoint = "/portfolio/01";

function App() {
    return (      
        <BrowserRouter basename={basePoint}>
            <NavBar />
            <Switch>
                <Route path = "/" exact component = {Home}/>                
                <Route path = "/admin" component = {Admin}/>
                <Route path = "/student" component = {Student}/>                
                <Route path = "/signin" component = {SignIn}/>
                <Route path = "/signout" component = {SignOut}/>
                <Route path = "/signup" component = {SignUp}/>
            </Switch>
        </BrowserRouter>
    );
};
export default App;