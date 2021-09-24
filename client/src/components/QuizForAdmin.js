import React, { useState } from 'react';
import { Button, ButtonGroup, Input, TextareaAutosize } from "@mui/material";

const QuizForAdmin = (props) => {
    const [editable, setEditable] = useState(false);
    const style = {
        border: '3px solid black',
        padding: '10px',
        marginTop: '15px',
        width: "90%"
    };

    const handleToggleEdit = () => {
        setEditable(!editable);
    };
    const handleUpdate = (e) => {
        switch (e.target.name){
            case 'question': 
                props.info.question = e.target.value;
                break;
            case 'answer':
                props.info.answer = e.target.value;
                break;
            case 'choice1':
                props.info.choiceDesc[0] = e.target.value;
                break;
            case 'choice2':
                props.info.choiceDesc[1] = e.target.value;
                break;
            case 'choice3':
                props.info.choiceDesc[2] = e.target.value;
                break;
            case 'choice4':
                props.info.choiceDesc[3] = e.target.value;
                break;
            default:
                
        }
        props.updateData(props.info.id, props.info);
    }    
    const handleRemove = () => {
        props.removeData(props.info.id);
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
                        value={props.info.question}
                        name="question"
                    />
                </div>
                <div>
                    <Input 
                        placeholder="Answer"
                        onChange={handleUpdate}
                        value={props.info.answer}
                        name="answer"
                    />
                </div>
                <div>
                    <TextareaAutosize
                        minRows={1}
                        maxRows={2}
                        style={{width: 400}}
                        onChange={handleUpdate}
                        value={props.info.choiceDesc[0]}
                        name="choice1"
                    />
                </div>
                <div>
                    <TextareaAutosize
                        minRows={1}
                        maxRows={2}
                        style={{width: 400}}
                        onChange={handleUpdate}
                        value={props.info.choiceDesc[1]}
                        name="choice2"
                    />
                </div>
                <div>
                    <TextareaAutosize
                        minRows={1}
                        maxRows={2}
                        style={{width: 400}}
                        onChange={handleUpdate}
                        value={props.info.choiceDesc[2]}
                        name="choice3"
                    />
                </div>
                <div>
                    <TextareaAutosize
                        minRows={1}
                        maxRows={2}
                        style={{width: 400}}
                        onChange={handleUpdate}
                        value={props.info.choiceDesc[3]}
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
        return (
            <div style={style}>
                <div>
                    {props.info.question}
                </div>
                <div>
                    {props.info.answer}
                </div>
                <div>
                    {props.info.choiceDesc[0]}
                </div>
                <div>
                    {props.info.choiceDesc[1]}
                </div>
                <div>
                    {props.info.choiceDesc[2]}
                </div>
                <div>
                    {props.info.choiceDesc[3]}
                </div>
                <div>
                    <ButtonGroup variant="contained" color="primary" aria-label="text primary button group">
                        <Button color="primary" size="small" onClick={handleToggleEdit}>Edit</Button>
                        <Button color="secondary" size="small" onClick={handleRemove}>Remove</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
};

export default QuizForAdmin;