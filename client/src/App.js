import './App.css';
import Home from './pages/Home'
import Admin from './pages/Admin'
import Student from './pages/Student'
import { BrowserRouter, Switch, Route } from'react-router-dom';

function App() {
    return (      
        <BrowserRouter>
            <Switch>
                <Route path = '/' exact component = {Home}/>
                <Route path = '/admin' component = {Admin}/>
                <Route path = '/student'exact component = {Student}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
