import "./App.css";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NavBar from "./components/NavBar";

// export const endPoint = "https://lucaswgong.com/projects/01/API/v2/questions";
export const endPoint = "http://localhost:3001/projects/01/API/v2/questions";

const basePoint = "/portfolio/01"
function App() {

    return (      
        <BrowserRouter basename={basePoint}>
            <NavBar />
            <Switch>
                <Route path = "/" exact component = {Home}/>                
                <Route path = "/admin" component = {Admin}/>
                <Route path = "/student" component = {Student}/>
                <Route path = "/signup" component = {SignUp}/>
                <Route path = "/signin" component = {SignIn}/>
            </Switch>
        </BrowserRouter>
    );
};
export default App;