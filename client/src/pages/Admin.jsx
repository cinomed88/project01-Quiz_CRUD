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
                axios.get(endPoint)
                    .then((res) => {
                        setQuizData(dataToObj(res.data));
                        setId(res.data.reduce((prev, curr) => prev > curr.id ? prev : curr, -1));
                    });
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
        axios.post(endPoint, {
            id: id+1,
            question: data.question,
            answer: data.answer,
            choiceDesc: data.choiceDesc     
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
  
    const updateData = (id, data) => {
        setQuizData(quizData.map(info => id === info.id ? { ...info, ...data } : info));
        axios.put(endPoint, {
            id: id,
            question: data.question,
            answer: data.answer,
            choiceDesc: data.choiceDesc    
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
  
    const removeData = (id) => {
        setQuizData(quizData.filter(info => info.id !== id));
        axios.delete(endPoint, 
        {
            data: id
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
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