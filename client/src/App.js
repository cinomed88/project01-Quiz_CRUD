import './App.css';
import QuizForm from './components/QuizForm'
import QuizList from './components/QuizList'
import axios from 'axios'
import { useState, useEffect } from 'react'
// import { Input } from '@material-ui/core'

function App() {
  const [id, setId] = useState(0)
  const [quizData, setQuizData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  // const endPoint = "https://lucaswgong.com/projects/01/API/v2/questions"
  const endPoint = "http://localhost:3001/projects/01/API/v2/questions"
  const style = {
    padding: '1px',
    margin: '15px'
  }

  const findLastId = (data) => {
    let lastId = -1
    let i = 0
    while (data[i]){
      if (data[i].id > lastId){
        lastId = data[i].id
      }
      i++
    }
    return lastId
  }
  const dataToJson = (data) => {
    let objData = []
    const idSet = new Set()
    for (let i=0; i < data.length; i++){
      idSet.add(data[i].id)
    }
    for (let item of idSet){
      const tempObj = {"id": item, "question": null, "answer": null, "choiceDesc": []}
      for (let k=0; k < data.length; k++){
        if (data[k].id === item){
          if (!tempObj.question) tempObj.question = data[k].question
          if (!tempObj.answer) tempObj.answer = data[k].answer
          tempObj.choiceDesc[data[k].choice-1] = data[k].description
        }
      }
      objData.push(tempObj)   
    }
    return objData
  }

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setError(null)
        setLoading(true)
        const res = await axios.get(endPoint)
        // console.log(res.data)
        setQuizData(dataToJson(res.data))
        // console.log(quizData)
        setId(findLastId(res.data))
        // console.log(id)
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    }
    fetchInfo()
  }, [])

  const addData = (data) => {
    // if (!data) console.log("data - " +data)
    // setQuizData(quizData.concat({ id: id+1, ...data }))
    // setId(id+1)    
    // axios.post(endPoint, {
    //   id: id+1,
    //   question: data.question,
    //   answer: data.answer,
    //   choiceDesc: data.choiceDesc     
    // })
    // .then(function (response) {
    //   console.log(response)
    // })
    // .catch(function (error) {
    //   console.log(error)
    // });
  }

  const updateData = (id, data) => {
    // setInfo(information.map(info => id === info.id ? { ...info, ...data } : info))
    // axios.put(endPoint, {
    //   id: id,
    //   name: data.name,
    //   time: data.time,
    //   text: data.text     
    // })
    // .then(function (response) {
    //   console.log(response)
    // })
    // .catch(function (error) {
    //   console.log(error)
    // })
  }

  const removeData = (id) => {
    // setInfo(information.filter(info => info.id !== id))
    // axios.delete(endPoint, 
    // {
    //   data: id
    // })
    // .then(function (response) {
    //   console.log(response)
    // })
    // .catch(function (error) {
    //   console.log(error)
    // })
  }

  if (loading) return <div>Now Loading...</div>
  if (error) return <div>Error!</div>

  return (
    <div className="App" style = {style}>
      <div>
        <QuizForm addData={addData} />
      </div>
      <QuizList>
        data={quizData}
        removeData={removeData}
        updateData={updateData}
      </QuizList>
    </div>
  ); 
}

export default App;