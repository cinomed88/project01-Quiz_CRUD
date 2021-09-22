import React, { useState } from 'react'
import { Button, Input } from "@material-ui/core"

function QuizForm(props) {
    const [quiz, setQuiz] = useState({
        question: "",
        answer: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: ""
    });
    const { question, answer, choice1, choice2, choice3, choice4 } = quiz;

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setQuiz({ ...quiz, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addData({question: question, answer: answer, choiceDesc: [choice1, choice2, choice3, choice4]});
        setQuiz({question: "", answer: "", choice1: "", choice2: "", choice3: "", choice4: ""});
    };

    return (
        <form onSubmit = {handleSubmit}>
            <Input
                placeholder="Question Description"
                name="question"
                value={question}
                onChange={onChangeInput}
            />
            <Input
                placeholder="Answer"
                name="answer"
                value={answer}
                onChange={onChangeInput}
            />
            <Input
                placeholder="Choice 1"
                name="choice1"
                value={choice1}
                onChange={onChangeInput}
            />
            <Input
                placeholder="Choice 2"
                name="choice2"
                value={choice2}
                onChange={onChangeInput}
            />
            <Input
                placeholder="Choice 3"
                name="choice3"
                value={choice3}
                onChange={onChangeInput}
            />
            <Input
                placeholder="Choice 4"
                name="choice4"
                value={choice4}
                onChange={onChangeInput}
            />
            <Button variant="contained" color="primary" size="medium" type="submit">Add</Button>
        </form>
    );
};

export default QuizForm;