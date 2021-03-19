function getData(){
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://lucaswgong.com/COMP4537/individual/API/v1/questions", true)
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200){
                if (this.responseText){
                    resolve(this.responseText);
                } else {
                    reject(new Error("Request is failed"));
                }
            }
        }
    });
}

getData().then(function(data) {
    let splitData = data.split("///"); 
    let questionsArr = JSON.parse(splitData[0]);
    let choicesArr = JSON.parse(splitData[1]);

    //Construct questions
    questions = [];
    for (let i=0; i < questionsArr["rows1"].length; i++){
        question = {};
        question.questionNumber = questionsArr["rows1"][i].id;
        question.question = questionsArr["rows1"][i].question;
        question.correctAnswer = questionsArr["rows1"][i].answer;
        question.answers = []
        for(let j=0; j < choicesArr["rows2"].length; j++){
            var el = choicesArr["rows2"][j];
            if(questionsArr["rows1"][i].id == el.id_question){
                question.answers.push(el.description);
            }
        }
        // console.log(question); 
        questions.push(question);
    }

    displayQuestions(questions);
    document.getElementById('btn_save').setAttribute("disabled", true);
  }).catch(function(err) {
    console.error(err); 
});

function displayQuestions(qs){
    if (qs.length != 0) {
        numOfQuestions = qs.length;
        numOfCorrectAnswer = 0;

        for (let i=0; i < numOfQuestions; i++){
            let vname = qs[i].questionNumber;
            let qDiv = document.createElement("div");
            qDiv.setAttribute("id", "Q"+vname);
            qDiv.className = "questionBox";
            qDiv.style.marginTop = "1em";
            qDiv.style.marginBottom = "3em";
            qDiv.style.marginLeft = "1em";
            qDiv.style.marginRight = "1em";
            document.getElementById("questions").appendChild(qDiv);

            let pTitle = document.createElement("p");
            pTitle.innerHTML = "Question " + (i + 1);
            pTitle.style.color = "#920C15";
            pTitle.style.marginTop = "1em";
            pTitle.style.marginBottom = "1em";
            pTitle.style.marginLeft = "1em";
            pTitle.style.fontWeight = "bold";
            document.getElementById("Q"+vname).appendChild(pTitle);

            let pQuestion = document.createElement("textarea");
            pQuestion.innerHTML = qs[i].question;

            pQuestion.setAttribute("id", "text"+vname);
            pQuestion.style.marginTop = "0.5em";
            pQuestion.style.marginBottom = "0.5em";
            pQuestion.style.marginLeft = "1em";
            pQuestion.style.height = "auto";
            pQuestion.style.width = "auto";
            pQuestion.style.minHeight = "20px";
            document.getElementById("Q"+vname).appendChild(pQuestion);

            let pAnsTitle = document.createElement("p");
            pAnsTitle.innerHTML = "Answers*";
            pAnsTitle.style.marginTop = "0.5em";
            pAnsTitle.style.marginBottom = "0.5em";
            pAnsTitle.style.marginLeft = "1em";
            pAnsTitle.style.fontWeight = "bold";
            document.getElementById("Q"+vname).appendChild(pAnsTitle);
            
            let divAns = [];
            let radioAns = [];
            let selection = [];

            for (let j=0; j < 4; j++){
                divAns[j] = document.createElement("div");
                divAns[j].style.height = "auto"
                radioAns[j] = document.createElement("input");
                selection[j] = document.createElement("textarea");

                radioAns[j].setAttribute("type", "radio");
                radioAns[j].setAttribute("name", "question"+i);
                radioAns[j].setAttribute("id", "cAnswer_"+(i+1)+"_"+(j+1));
                radioAns[j].style.marginTop = "0.9em"
                radioAns[j].style.marginLeft = "1em"

                selection[j].innerHTML = qs[i].answers[j];
                selection[j].style.height = "auto"
                selection[j].setAttribute("id", "answer_"+(i+1)+"_"+(j+1));

                divAns[j].appendChild(radioAns[j]);
                divAns[j].appendChild(selection[j]);
                document.getElementById("Q"+vname).appendChild(divAns[j]);
            }

            let btn_update = document.createElement("button");
            btn_update.style.marginTop = "20px"
            btn_update.style.height = "25px"
            btn_update.style.width = "auto"
            btn_update.className = "updateButton"
            btn_update.innerHTML = "Update"
            btn_update.setAttribute("id", "btn_update_"+(i+1))
            document.getElementById("Q"+vname).appendChild(btn_update);
        }
        for (let i = 0; i < qs.length; i++){
            let correctAns = qs[i].correctAnswer;
            document.getElementById("cAnswer_"+(i+1)+"_"+correctAns).setAttribute("checked",true);
        }
        // let radios = document.getElementsByTagName("input");
        // for (let i = 0; i < radios.length; i++){
        //     radios[i].setAttribute("disabled", "disabled");
        // }
    }

    var totalNumOfQuestions = qs.length;
    //create
    document.getElementById('btn_add').addEventListener('click', function(event){
        totalNumOfQuestions= totalNumOfQuestions+1;
        const newQuestionArea = buildNewQuestion(totalNumOfQuestions);
        document.getElementById("questions").appendChild(newQuestionArea);
        document.getElementById('btn_add').setAttribute("disabled", true);
        document.getElementById('btn_save').removeAttribute("disabled");
    });

    //save: post
    document.getElementById('btn_save').addEventListener('click', function(event){
        saveData(totalNumOfQuestions).then(function(questionsArr) {
            let newQ = questionsArr[totalNumOfQuestions-1];
            console.log(newQ);
            
            //validation
            let numRealAnswer = 0;
            for (let i=0; i < 4; i++){
                if(newQ.answers[i].length !== 0){
                    numRealAnswer++;
                }
            }
            if (numRealAnswer < 2){
                alert("The number of selection need to be larger than 1!")
                return false;
            }
            if (newQ.answers[newQ.correctAnswer-1].length == 0){
                alert("The correct answer is incorrectly assigned!")
                return false;
            }
            
            let xhttp2 = new XMLHttpRequest();
            let params = "data="+JSON.stringify(newQ);
            xhttp2.open("POST", "https://lucaswgong.com/COMP4537/individual/API/v1/questions", true);
            xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp2.send(params);

            xhttp2.onreadystatechange = function() {
                if (xhttp2.readyState == 4 && xhttp2.status == 200) {
                    console.log("post request result: " + xhttp2.responseText)
                    location.reload();
                }
            }
        }).catch((err) => {
            console.error(err);
        });
    });

    //update: put
    var elements = document.getElementsByClassName('updateButton')
    Array.from(elements).forEach(function(element) {
        element.addEventListener('click', function(event){
            saveData(totalNumOfQuestions).then(function(questionsArr) {
                // console.log(element.getAttribute("id"))
                let qNumber = element.getAttribute("id").split('_')[2];
                let newQ = questionsArr[qNumber-1]; 
                console.log(newQ);

                //validation
                let numRealAnswer = 0;
                for (let i=0; i < 4; i++){
                    if(newQ.answers[i].length !== 0){
                        numRealAnswer++;
                    }
                }
                if (numRealAnswer < 2){
                    alert("The number of selection need to be larger than 1!")
                    return false;
                }
                if (newQ.answers[newQ.correctAnswer-1].length == 0){
                    alert("The correct answer is incorrectly assigned!")
                    return false;
                }

                let xhttp3 = new XMLHttpRequest();
                let params = "data="+JSON.stringify(newQ);
                console.log(params);
                xhttp3.open("PUT", "https://lucaswgong.com/COMP4537/individual/API/v1/questions", true);
                xhttp3.send(params);

                xhttp3.onload = function(err) {
                    if (xhttp3.readyState == 4 && xhttp3.status == 200) {
                        console.log("put request result: " + xhttp3.responseText)
                        //location.reload();
                    } else {
                        console.log(err);
                    }
                }
            }).catch((err) => {
                console.error(err);
            });
        });
    });

    // //delete
    // document.getElementById('btn_delete').addEventListener('click', function(event){
    //     deleteData().then(function(data) {
    //         location.reload();
    //       }).catch(function(err) {
    //         console.error(err); 
    //     });
        
    // });
}

// function deleteData(){
//     return new Promise((resolve, reject) => {
//         xhttp.open("DELETE", "http://localhost:8080/API/v1/questions", true)
//         xhttp.send();
//         xhttp.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200){
//                 if (this.responseText){
//                     resolve(this.responseText);
//                 } else {
//                     reject(new Error("Request is failed"));
//                 }
//             }
//         }
//     });
// }
const saveData = (totalNumOfQuestions) => {
    return new Promise((resolve, reject) => {
        let questions = saveMCQuestions(totalNumOfQuestions);
        if(questions){
            resolve(questions);
        } else {
            reject(new Error("saveData() is failed"));
        }
    });
}

const buildNewQuestion = (numOfQuestion) => {
    const newDiv = document.createElement("div")

    newDiv.setAttribute("id", "Q"+numOfQuestion);
    newDiv.className = "questionBox";
    newDiv.style.marginTop = "1em";
    newDiv.style.marginBottom = "3em";
    newDiv.style.marginLeft = "1em";
    newDiv.style.marginRight = "1em";

    let pTitle = document.createElement("p")
    pTitle.innerText = "Question " + numOfQuestion
    pTitle.style.color = "#920C15";
    pTitle.style.marginTop = "1em";
    pTitle.style.marginBottom = "1em";
    pTitle.style.marginLeft = "1em";
    pTitle.style.fontWeight = "bold";
    newDiv.appendChild(pTitle)

    let pQuestion = document.createElement("textarea")
    pQuestion.setAttribute("id", "text"+numOfQuestion);
    pQuestion.style.marginTop = "0.5em";
    pQuestion.style.marginBottom = "0.5em";
    pQuestion.style.marginLeft = "1em";
    pQuestion.style.height = "auto";
    pQuestion.style.width = "auto";
    pQuestion.style.minHeight = "20px";
    newDiv.appendChild(pQuestion)

    let pAnsTitle = document.createElement("p");
    pAnsTitle.innerHTML = "Answers*";
    pAnsTitle.style.marginTop = "0.5em";
    pAnsTitle.style.marginBottom = "0.5em";
    pAnsTitle.style.marginLeft = "1em";
    pAnsTitle.style.fontWeight = "bold";
    newDiv.appendChild(pAnsTitle);

    let divAns = [];
    let radioAns = [];
    let selection = [];

    for (let j=0; j < 4; j++){
        divAns[j] = document.createElement("div");
        divAns[j].style.height = "auto"
        radioAns[j] = document.createElement("input");
        selection[j] = document.createElement("textarea");

        radioAns[j].setAttribute("type", "radio");
        radioAns[j].setAttribute("name", "radioQuestion" + numOfQuestion)
        radioAns[j].setAttribute("id", "cAnswer_"+numOfQuestion+"_"+(j+1));
        radioAns[j].style.marginTop = "0.9em"
        radioAns[j].style.marginLeft = "1em"

        selection[j] = document.createElement("textarea")
        selection[j].style.height = "auto"
        // selection[j].setAttribute("type", "text")
        selection[j].setAttribute("id", "answer_"+numOfQuestion+"_"+(j+1));

        divAns[j].appendChild(radioAns[j]);
        divAns[j].appendChild(selection[j]);
        newDiv.appendChild(divAns[j]);
    }
    return newDiv
}

const saveMCQuestions = (totalNumOfQuestions) => {
    //later, add validation
    const questions = []
    
    for(let i=0; i < totalNumOfQuestions; i++){
        var question = {};
        question.questionNumber = (i+1);
        question.question = document.getElementById("text"+(i+1)).value;
        let cAns = document.querySelectorAll("#Q"+(i+1)+" input");
        cAns.forEach((radioEl) => {
            if(radioEl.checked){
                correctAnswerId = radioEl.getAttribute("id").split('_');
            }
        })
        question.correctAnswer = correctAnswerId[2];
        question.answers = [];
        for(let j=0; j < 4; j++){
            let ans = document.getElementById("answer_"+(i+1)+"_"+(j+1));
            if (ans != null){
                question.answers.push(ans.value);
            }
        } 
        questions.push(question);
    }
    return questions;
}
