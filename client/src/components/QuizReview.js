import { useState } from "react";

const QuizReview = (props) => {
    const calcScore = (data, choices) => {
        let result = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].answer === choices[i]) result++;
        }
        return result;
    }
    const score = calcScore(props.data, props.choices);

    return (
    <div>
        <h2>Result</h2>
        <h3>{score} of {props.data.length}</h3>
        <h3>{Math.round(score/props.data.length*100)}%</h3>
    </div>
    );


};

export default QuizReview;


// if (Number(choice) === props.data[current].answer)
//             setScore(score+1); 
//         setCurrent(current+1);       
//         if (current === props.data.length){
//             console.log(`Score: ${score}`)
//         } else {
//             if (current === props.data.length - 1)
//                 setBtnText('Finish');
//             setChoice('');
//         }