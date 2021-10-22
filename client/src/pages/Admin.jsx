import axios from "axios";
import { useState, useEffect } from "react";
import QuizForm from "../components/QuizForm";
import QuizList from "../components/QuizList";
import { endPoint } from "../App";
import { dataToObj } from "../utilities/supportFuncs"

const Admin = () => {
    const [id, setId] = useState(0);
    const [quizData, setQuizData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const style = {
        padding: '1px',
        margin: '15px'
    };
      
    useEffect( () => {
        const fetchInfo = () => {
            try {
                setError(null);
                setLoading(true);
                axios.get(`${endPoint}/questions`)
                    .then((res) => {
                        setQuizData(dataToObj(res.data));
                        setId(res.data.reduce((prev, curr) => prev > curr.id ? prev : curr, -1));
                    }, { withCredentials: true });
            } catch (e) {
                console.log(e)
                setError(e);
            }
            setLoading(false);
        }
        fetchInfo();
    }, []);
  
    const addData = (data) => {
        if (!data) console.log("data was not input yet.");
    
        setQuizData(quizData.concat({ id: id+1, ...data }));
        setId(id+1);
        axios.post(`${endPoint}/questions`, {
            id: id+1,
            question: data.question,
            answer: data.answer,
            choiceDesc: data.choiceDesc     
        }, { withCredentials: true })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
  
    const updateData = (id, data) => {
        setQuizData(quizData.map(info => id === info.id ? { ...info, ...data } : info));
        axios.put(`${endPoint}/questions`, {
            id: id,
            question: data.question,
            answer: data.answer,
            choiceDesc: data.choiceDesc    
        }, { withCredentials: true })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
  
    const removeData = (id) => {
        setQuizData(quizData.filter(info => info.id !== id));
        axios.delete(`${endPoint}/questions`, { data: id }, { withCredentials: true })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
  
    if (loading) return <div className="App" style = {style}>Now Loading...</div>;
    if (error) return <div className="App" style = {style}>Error!</div>;
  
    return (
        <div className="App" style = {style}>
            <div>
                <h1>Admin Page</h1>
            </div>
            <div>
                <QuizForm addData={addData} />
            </div>
            {
                quizData
                ? <QuizList data={quizData} removeData={removeData} updateData={updateData}/>
                : <div></div>
            }
        </div>
    ); 
};

export default Admin;