import React from 'react';
import Quiz from './Quiz';

function QuizList(props) {
    let i = 0;
    const list = props.data.map(
        info => {
            i++;
            return (
            <div>
                <h1>Question {i}</h1>
                <Quiz
                info={info} 
                removeData={props.removeData}
                updateData={props.updateData}
                />
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