import { useState } from 'react';
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
        if (e.target.name[0] === 'c') {
            props.data.choiceDesc[e.target.name[e.target.name.length-1]-1] = e.target.value;
        } else {
            props.data[e.target.name] = e.target.value;
        }
        props.updateData(props.data.id, props.data);
    };

    const handleRemove = () => {
        props.removeData(props.data.id);
    };

    if (editable) {
        let index = 0;
        const list =  props.data.choiceDesc.map(
            choice => {
                index++;
                return (
                    <FormControlLabel
                        key = {index}  
                        value={index.toString()} 
                        control={<Radio color="primary"/>}
                        style={{margin: 1}} 
                        label={
                            <Input
                                placeholder="Describe a choice."
                                name={`choice${index}`}
                                value={choice}
                                onChange={handleUpdate}
                            />
                        } 
                    />
                );
            }
        ); 
        return (
            <div style={style}>
                <FormControl sx={{ m: 1 }} component="fieldset" variant="standard" style={{width: "calc(100% - 16px)"}}>
                    <h3>
                        <TextareaAutosize
                            placeholder="Describe a question"                            
                            name="question"
                            value={props.data.question}
                            onChange={handleUpdate}
                            minRows={1}
                            maxRows={5}
                            style={{width: "calc(100% - 20px)", padding: 10, font: "inherit", fontSize: "inherit", fontWeight: "inherit"}}
                        />
                    </h3>
                    <RadioGroup name="answer" value={props.data.answer} onChange={handleUpdate}>
                        {list}
                    </RadioGroup>
                </FormControl>
                <div style={{margin:10}}>
                    <ButtonGroup color="primary" aria-label="text primary button group">
                        <Button variant="outlined" color="primary" size="small" onClick={handleToggleEdit} >Apply</Button>
                        <Button variant="outlined" color="secondary" size="small" onClick={handleRemove} >Remove</Button>
                    </ButtonGroup>
                </div>                
            </div>
        );
    } else {
        let index = 0;
        const list =  props.data.choiceDesc.map(
            choice => {
                index++;
                if (choice) 
                    return <FormControlLabel key={index} value={index.toString()} control={<Radio color="primary"/>} label={choice} style={{margin: 1}}/>;
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
    };
};
export default QuizForAdmin;