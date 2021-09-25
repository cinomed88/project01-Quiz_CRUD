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

// <div className="intro mount1">
// <h3 className="introTxt">리액트와 Node.js, MongoDB를 연동한 간단한 텍스트 게시판입니다. </h3>
// <div className="img-wrap">
//     <img className="reactIcon" src={reactIcon} alt="react Icon" />
//     <span>&#43;	</span>
//     <img className="nodeIcon" src={nodejsIcon} alt="Nodejs Icon" />
//     <span>&#43;	</span>
//     <img className="mongoIcon" src={mongoDBIcon} alt="mongoDB Icon" />
// </div>
// </div>