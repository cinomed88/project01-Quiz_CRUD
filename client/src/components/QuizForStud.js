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

    const [value, setValue] = useState('');

    const handleRadioChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Number(value) === props.info.answer) {
            console.log('You got it!');
        } else {
            console.log('Sorry, wrong answer!');
        }
    };
    
    let index = 0;
    const list =  props.info.choiceDesc.map(
        choice => {
            index++;
            if (choice) 
                return <FormControlLabel 
                            value={index.toString()} 
                            control={<Radio color="primary"/>} 
                            label={choice}
                            style={{margin: 1}} 
                        />;
            else return;
        }
    ); 
    return (
    <div style={style}>
        <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
                <h3>{props.info.question}</h3>
                <RadioGroup value={value} onChange={handleRadioChange}>
                    {list}
                </RadioGroup>
                <Button style={{ marginTop: 20 }} type="submit" variant="outlined">
                    Check Answer
                </Button>
            </FormControl>
        </form>
    </div>
    );
};

export default QuizForStud;