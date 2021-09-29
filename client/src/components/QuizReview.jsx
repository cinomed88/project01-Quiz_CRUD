const QuizReview = (props) => {
    const calcScore = (data, choices) => {
        let result = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].answer === choices[i]) result++;
        };
        return result;
    };
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