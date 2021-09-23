import React, { useEffect, useState } from 'react';
import QuizForAdmin from './QuizForAdmin';
import QuizForStud from './QuizForStud';

function QuizList(props) {
    const [score, setScore] = useState([])

    let i = 0;
    const list = props.data.map(
        info => {
            i++;
            return (
            <div>
                <h1 style={{textAlign: "left", marginLeft: "5px"}}>Question {i}</h1>
                {
                props.editable
                ? <QuizForAdmin info={info} removeData={props.removeData} updateData={props.updateData} />
                : <QuizForStud info={info}/>
                }                
            </div>
            );
        }
    );

    return(
    <div>
        {list}
    </div>
    );
};

export default QuizList;