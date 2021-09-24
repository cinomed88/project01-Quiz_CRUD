import { useState } from 'react';
import { Button, Input, TextareaAutosize, FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

const QuizForm = (props) => {
    const style = {
        textAlign: 'left',
        border: '3px solid black',
        padding: '10px',
        margin: '0px 15px 0px 15px',
        width: "calc(100%-30px)"
    };
    const [quiz, setQuiz] = useState({question: "", answer: 0, c1:"", c2:"", c3:"", c4:""});
    const { question, answer, c1, c2, c3, c4 } = quiz;


    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setQuiz({ ...quiz, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addData({question: question, answer: answer, choiceDesc: [c1, c2, c3, c4]});
        setQuiz({question: "", answer: "", c1:"", c2:"", c3:"", c4:""});
    };

    return (        
        <form style={style} onSubmit = {handleSubmit}>
            <h3>
                <TextareaAutosize
                    placeholder="Describe a new question."                            
                    name="question"
                    value={question}
                    onChange={onChangeInput}
                    minRows={1}
                    maxRows={3}
                    style={{width: "calc(100% - 20px)", padding: 10, font: "inherit", fontSize: "inherit", fontWeight: "inherit"}}
                />
            </h3>
            <RadioGroup name="answer" value={answer} onChange={onChangeInput}>
                <FormControlLabel value="0" control={<Radio />} style={{margin: 2}} 
                    label={<Input placeholder="Describe a choice." name="c1" value={c1} onChange={onChangeInput}/>}/>
                <FormControlLabel value="1" control={<Radio />} style={{margin: 2}} 
                    label={<Input placeholder="Describe a choice." name="c2" value={c2} onChange={onChangeInput}/>}/>
                <FormControlLabel value="2" control={<Radio />} style={{margin: 2}} 
                    label={<Input placeholder="Describe a choice." name="c3" value={c3} onChange={onChangeInput}/>}/>
                <FormControlLabel value="3" control={<Radio />} style={{margin: 2}} 
                    label={<Input placeholder="Describe a choice." name="c4" value={c4} onChange={onChangeInput}/>}/>           
            </RadioGroup>
            <div style={{margin:10, textAlign: "right"}}>
                <Button variant="contained" color="primary" size="medium" type="submit">Add</Button>        
            </div>           
        </form>
    );
};

export default QuizForm;