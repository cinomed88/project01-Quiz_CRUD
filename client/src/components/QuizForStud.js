import { useState } from 'react';
import { Button, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material";

function QuizForStud(props) {
    const style = {
        textAlign: "left",
        border: '3px solid black',
        padding: '10px',
        marginTop: '15px',
        width: 'calc(100% - 30)'
    };
    const [current, setCurrent] = useState(0);
    const [choice, setChoice] = useState('');
    const [score, setScore] = useState(0);
    const [btnText, setbtnText] = useState('Next');

    const handleRadioChange = (e) => {
        setChoice(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Number(choice) === props.data[current].answer) {
            console.log('You got it!');
            setScore(score+1);
        } else {
            console.log('Sorry, wrong answer!');
        }
        if (current == props.data.length - 1){
            console.log(`Score: ${score}`)
        } else {
            if (current == props.data.length -2)
                setbtnText('Finish');
            setCurrent(current+1);
            setChoice('');
        }
    };

    let index = 0;
    const list =  props.data[current].choiceDesc.map(
        choice => {
            index++;
            if (choice) return (
                <FormControlLabel 
                    value={index.toString()} 
                    control={<Radio color="primary"/>} 
                    label={choice}
                    style={{margin: 1}} 
                />);
            else return;
        }
    ); 
    return (
    <div style={{textAlign: "left"}}>
        <h1 style={{paddingLeft: 10}}>Question {current + 1} of {props.data.length}</h1>
        <form style={style} onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                <h3>{props.data[current].question}</h3>
                <RadioGroup value={choice} onChange={handleRadioChange}>
                    {list}
                </RadioGroup>
            </FormControl>
            <div style={{ display: "flex"}}>
                <Button style={{ fontWeight: "bold", maxWidth: 200, margin: "5px 10px 10px auto" }} type="submit" variant="contained">
                    {btnText}
                </Button>
            </div>            
        </form>
    </div>
    );
};

export default QuizForStud;