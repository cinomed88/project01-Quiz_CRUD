import reactIcon from '../imgs/react.png';
import nodejsIcon from '../imgs/nodejs.png';
import mySQLIcon from '../imgs/MySQL.png';

const Home = () => {
    return(
        <div className="App">
            <h2 style={{margin:"10%"}}>This is a simple quiz app using React, Node.js, and MySQL.</h2>
                        
            <div className="img-wrap">
                <img className="reactIcon" src={reactIcon} alt="react Icon" />
                <span>+</span>
                <img className="nodeIcon" src={nodejsIcon} alt="Nodejs Icon" />
                <span>+</span>
                <img className="mysqlIcon" src={mySQLIcon} alt="MySQL Icon" />
            </div>
        </div>
    );
};
export default Home;
