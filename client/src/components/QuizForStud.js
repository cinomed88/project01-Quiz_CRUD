import { useState } from 'react';
import { Button, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material";
import QuizReview from "./QuizReview";

const QuizForStud = (props) => {
    const style = {
        textAlign: "left",
        border: '3px solid black',
        padding: '10px',
        marginTop: '15px',
        width: 'calc(100% - 30)'
    };
    const [current, setCurrent] = useState(0);
    const [choice, setChoice] = useState('');
    const [btnText, setBtnText] = useState('Next');
    const [finalChoices, setFinalChoices] = useState([]);

    const handleRadioChange = (e) => {
        setChoice(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (choice)
            finalChoices.push(Number(choice))
        else
            finalChoices.push(0)
            
        setCurrent(current+1);
        setChoice('');       
        if (current === props.data.length - 1)
            setBtnText('Finish');
    };

    if (current < props.data.length){
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
                else return null;
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
    } else {
        return <QuizReview data = {props.data} choices = {finalChoices}/>;
    };
};
export default QuizForStud;