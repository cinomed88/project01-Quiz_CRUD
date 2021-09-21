import React from 'react';
import Quiz from './Quiz';

function QuizList(props) {
    const list = props.data.map(
        info => (
        <Quiz
          key={info.id} 
          info={info} 
          removeData={props.removeData}
          updateData={props.updateData}
        />)
    );

    return(
    <div>
        {list}
    </div>
    );
}

export default QuizList;