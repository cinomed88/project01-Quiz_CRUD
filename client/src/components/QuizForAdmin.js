import React, { useState } from 'react';
import { Button, ButtonGroup, Input, TextareaAutosize, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material";

const QuizForAdmin = (props) => {
    const [editable, setEditable] = useState(false);
    const style = {
        textAlign: 'left',
        border: '3px solid black',
        padding: '10px',
        margin: '0px 15px 0px 15px',
        width: "calc(100%-30px)"
    };

    const handleToggleEdit = () => {
        setEditable(!editable);
    };
    const handleUpdate = (e) => {
        switch (e.target.name){
            case 'question': 
                props.data.question = e.target.value;
                break;
            case 'answer':
                props.data.answer = e.target.value;
                break;
            case 'choice1':
                props.data.choiceDesc[0] = e.target.value;
                break;
            case 'choice2':
                props.data.choiceDesc[1] = e.target.value;
                break;
            case 'choice3':
                props.data.choiceDesc[2] = e.target.value;
                break;
            case 'choice4':
                props.data.choiceDesc[3] = e.target.value;
                break;
            default:
                
        }
        props.updateData(props.data.id, props.data);
    }    
    const handleRemove = () => {
        props.removeData(props.data.id);
    }

    if (editable) {
        return (
            <div style={style}>
                <div>
                    <TextareaAutosize
                        aria-label= "question"
                        placeholder="Describe a question"
                        minRows={3}
                        maxRows={5}
                        style={{width: 400}}
                        onChange={handleUpdate}
                        value={props.data.question}
                        name="question"
                    />
                </div>
                <div>
                    <Input 
                        placeholder="Answer"
                        onChange={handleUpdate}
                        value={props.data.answer}
                        name="answer"
                    />
                </div>
                <div>
                    <TextareaAutosize
                        minRows={1}
                        maxRows={2}
                        style={{width: 400}}
                        onChange={handleUpdate}
                        value={props.data.choiceDesc[0]}
                        name="choice1"
                    />
                </div>
                <div>
                    <TextareaAutosize
                        minRows={1}
                        maxRows={2}
                        style={{width: 400}}
                        onChange={handleUpdate}
                        value={props.data.choiceDesc[1]}
                        name="choice2"
                    />
                </div>
                <div>
                    <TextareaAutosize
                        minRows={1}
                        maxRows={2}
                        style={{width: 400}}
                        onChange={handleUpdate}
                        value={props.data.choiceDesc[2]}
                        name="choice3"
                    />
                </div>
                <div>
                    <TextareaAutosize
                        minRows={1}
                        maxRows={2}
                        style={{width: 400}}
                        onChange={handleUpdate}
                        value={props.data.choiceDesc[3]}
                        name="choice4"
                    />
                </div>
                <div>
                    <ButtonGroup variant="contained" color="primary" aria-label="text primary button group">
                        <Button variant="outlined" color="primary" size="small" onClick={handleToggleEdit} >Apply</Button>
                        <Button variant="outlined" color="secondary" size="small" onClick={handleRemove} >Remove</Button>
                    </ButtonGroup>
                </div>
                
            </div>
        )
    } else {
        let index = 0;
        const list =  props.data.choiceDesc.map(
            choice => {
                index++;
                if (choice) 
                    return (<FormControlLabel value={index.toString()} control={<Radio color="primary"/>} label={choice} style={{margin: 1}}/>);
                else return null;
            }
        ); 
        return (
            <div style={style}>
                <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                    <h3>{props.data.question}</h3>
                    <RadioGroup value={props.data.answer}>
                        {list}
                    </RadioGroup>
                </FormControl>

                <div style={{margin:10}}>
                    <ButtonGroup variant="contained" color="primary" aria-label="text primary button group">
                        <Button color="primary" size="small" style={{fontWeight:"bolder"}} onClick={handleToggleEdit}>Edit</Button>
                        <Button color="secondary" size="small" style={{fontWeight:"bolder"}} onClick={handleRemove}>Remove</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
};

export default QuizForAdmin;