import { useState, useEffect } from 'react';
import axios from 'axios';
import QuizForStud from '../components/QuizForStud';
import { endPoint } from "../App";
import { dataToObj } from "../utilities/supportFuncs"

const Student = () => {
    const [quizData, setQuizData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInfo = () => {
            try {
                setError(null);
                setLoading(true);
                axios.get(endPoint).then((res) => {
                    setQuizData(dataToObj(res.data));
                });
            } catch (e) {
                setError(e);
            };
            setLoading(false);
        };
        fetchInfo();
    }, []);

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