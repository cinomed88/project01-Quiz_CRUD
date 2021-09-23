import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizList from '../components/QuizList';
import QuizScoring from '../components/QuizScoring';
import { Button, Alert } from "@mui/material";

const Student = () => {
    const [quizData, setQuizData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    // const endPoint = "https://lucaswgong.com/projects/01/API/v2/questions";
    const endPoint = "http://localhost:3001/projects/01/API/v2/questions";

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                setError(null);
                setLoading(true);
                const res = await axios.get(endPoint);
                setQuizData(dataToJson(res.data));
                // console.log(quizData)
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        }
        fetchInfo();
    }, []);

    const dataToJson = (data) => {
        let objData = [];
        const idSet = new Set();
        for (let i=0; i < data.length; i++){
            idSet.add(data[i].id);
        };
        for (let item of idSet){
            const tempObj = {"id": item, "question": null, "answer": null, "choiceDesc": []};
            for (let k=0; k < data.length; k++){
            if (data[k].id === item){
                if (!tempObj.question) tempObj.question = data[k].question;
                if (!tempObj.answer) tempObj.answer = data[k].answer;
                tempObj.choiceDesc[data[k].choice-1] = data[k].description;
            }
            };
            objData.push(tempObj); 
        };
        return objData;
    };

    const handleSubmit = () => {
        let score = 0;
        // for (let i=0; i < quizData.length; i++){
        //     if (resultArr[i] == quizData[i].answer) score++;
        // }
        console.log(`Score : ${score} / ${quizData.length} (${score/quizData.length}%)`);
    }

    if (loading) return <div>Now Loading...</div>;
    if (error) return <div>Error!</div>;

    return(
        <div className="App">
            <div>
                <h1>Student Page</h1>
            </div>
            {
            quizData
            ? <QuizList data={quizData} editable={false}/>
            : <div></div>
            }
            <div style={{margin: 30}}>
                <Button variant="outlined" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default Student;