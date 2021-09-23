import React, { useEffect, useState } from 'react';
import QuizForAdmin from './QuizForAdmin';

function QuizList(props) {
    let i = 0;
    const list = props.data.map(
        info => {
            i++;
            return (
            <div>
                <h1 style={{textAlign: "left", marginLeft: "5px"}}>Question {i}</h1>
                <QuizForAdmin info={info} removeData={props.removeData} updateData={props.updateData} />
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