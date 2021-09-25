import { useState, useEffect } from 'react';
import axios from 'axios';
import QuizForStud from '../components/QuizForStud';

const Student = () => {
    const [quizData, setQuizData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const endPoint = "https://lucaswgong.com/projects/01/API/v2/questions";
    // const endPoint = "http://localhost:3001/projects/01/API/v2/questions";

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                setError(null);
                setLoading(true);
                const res = await axios.get(endPoint);
                setQuizData(dataToJson(res.data));
            } catch (e) {
                setError(e);
            };
            setLoading(false);
        };
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
                };
            };
            objData.push(tempObj); 
        };
        return objData;
    };

    if (loading) return <div>Now Loading...</div>;
    if (error) return <div>Error!</div>;

    return(
        <div className="App">
            <div>
                <h1>Student Page</h1>
            </div>
            {
            quizData
            ? <QuizForStud data={quizData}/>
            : <div></div>
            }
        </div>
    );
};
export default Student;