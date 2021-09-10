function getData(){
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://lucaswgong.com/projects/01/API/v1/questions", true);
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
        questions.push(question);
    }

    displayQuestions(questions);
    document.getElementById('btn_save').setAttribute("disabled", true);
  }).catch(function(err) {
    console.error(err); 
});

function displayQuestions(qs){
    let numOfQuestions = qs.length;
    let lastId;

    if (numOfQuestions !== 0) {
        lastId = qs[numOfQuestions-1].questionNumber;
        numOfCorrectAnswer = 0;

        for (let i=0; i < numOfQuestions; i++){
            let id = qs[i].questionNumber;
            let qDiv = document.createElement("div");
            qDiv.setAttribute("id", "Q"+id);
            qDiv.className = "questionBox";
            qDiv.style.marginTop = "1em";
            qDiv.style.marginBottom = "2em";
            qDiv.style.marginLeft = "1em";
            qDiv.style.marginRight = "1em";
            document.getElementById("questions").appendChild(qDiv);

            let pTitle = document.createElement("h3");
            pTitle.innerHTML = "Question " + (i+1);
            pTitle.style.fontWeight = "bold";
            document.getElementById("Q"+id).appendChild(pTitle);

            let pQuestion = document.createElement("textarea");
            pQuestion.innerHTML = qs[i].question;

            pQuestion.setAttribute("id", "text"+id);
            pQuestion.className = "form-control";
            pQuestion.setAttribute("rows", 2)
            document.getElementById("Q"+id).appendChild(pQuestion);

            let pAnsTitle = document.createElement("h6");
            pAnsTitle.innerHTML = "Answers";
            pAnsTitle.style.marginTop = "0.5em";
            pAnsTitle.style.fontWeight = "bold";
            document.getElementById("Q"+id).appendChild(pAnsTitle);
            
            let divAns = [];
            let radioAns = [];
            let selection = [];
            let divSub = [];

            for (let j=0; j < 4; j++){
                divAns[j] = document.createElement("div");
                divAns[j].style.height = "auto"
                divAns[j].className = "mb-1 row mx-auto"
                radioAns[j] = document.createElement("input");
                selection[j] = document.createElement("textarea");

                radioAns[j].setAttribute("type", "radio");
                radioAns[j].setAttribute("name", "question"+id);
                radioAns[j].setAttribute("id", "cAnswer_"+id+"_"+(j+1));
                radioAns[j].className = "form-check-input"
                radioAns[j].style.padding = "0px"
                radioAns[j].style.margin = "auto";

                selection[j].innerHTML = qs[i].answers[j];
                selection[j].className = "form-control form-control-sm";
                selection[j].setAttribute("rows", 1)
                selection[j].setAttribute("id", "answer_"+id+"_"+(j+1));

                divSub[j] = document.createElement("div");
                divSub[j].className = "col-sm"
                divSub[j].appendChild(selection[j]);

                divAns[j].appendChild(radioAns[j]);
                divAns[j].appendChild(divSub[j]);       
                document.getElementById("Q"+id).appendChild(divAns[j]);
            }
            
            let btn_div = document.createElement("div");
            btn_div.style.margin = "20px";
            btn_div.className = "btn-group"
            btn_div.setAttribute("role", "group");
            document.getElementById("Q"+id).appendChild(btn_div);

            let btn_update = document.createElement("button");
            btn_update.className = "updateButton btn btn-sm btn-warning fw-bold"
            btn_update.innerHTML = "Update";
            btn_update.setAttribute("id", "btn_update_"+id);
            btn_div.appendChild(btn_update);

            let btn_delete = document.createElement("button");
            btn_delete.className = "deleteButton btn btn-sm btn-danger fw-bold"
            btn_delete.innerHTML = "Delete";
            btn_delete.setAttribute("id", "btn_delete_"+id);
            btn_div.appendChild(btn_delete);
        }
        for (let i = 0; i < qs.length; i++){
            let correctAns = qs[i].correctAnswer;
            document.getElementById("cAnswer_"+qs[i].questionNumber+"_"+correctAns).setAttribute("checked",true);
        }

    } else{
        lastId = -1;
    }
    
    //create
    document.getElementById('btn_add').addEventListener('click', function(event){
        numOfQuestions = numOfQuestions + 1;
        lastId =  lastId + 1;
        const newQuestionArea = buildNewQuestion(numOfQuestions, lastId);
        document.getElementById("questions").appendChild(newQuestionArea);
        document.getElementById('btn_add').setAttribute("disabled", true);
        document.getElementById('btn_save').removeAttribute("disabled");
    });

    //save: post
    document.getElementById('btn_save').addEventListener('click', function(event){
        saveData(lastId).then(function(newQ) {
            console.log(newQ);
            
            //validation
            let numRealAnswer = 0;
            for (let i=0; i < 4; i++){
                if(newQ.answers[i].length !== 0){
                    numRealAnswer++;
                }
            }
            if (numRealAnswer < 2){
                alert("The number of selection need to be larger than 1!");
                return false;
            }
            if (newQ.answers[newQ.correctAnswer-1].length == 0){
                alert("The correct answer is incorrectly assigned!");
                return false;
            }
            
            let xhttp2 = new XMLHttpRequest();
            let params = "data="+JSON.stringify(newQ);
            xhttp2.open("POST", "https://lucaswgong.com/projects/01/API/v1/questions", true);
            xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp2.send(params);

            xhttp2.onreadystatechange = function() {
                if (xhttp2.readyState == 4 && xhttp2.status == 200) {
                    console.log("post request result: " + xhttp2.responseText);
                    // location.reload();
                }
            }
        }).catch((err) => {
            console.error(err);
        });
    });

    //update: put
    let putElements = document.getElementsByClassName('updateButton');
    Array.from(putElements).forEach(function(element) {
        element.onclick = (event) => {
            const qNumber = event.target.getAttribute("id").split('_')[2];

            let targetQ = {};
            targetQ.questionNumber = qNumber;
            targetQ.question = document.getElementById("text"+qNumber).value;
            let cAns = document.querySelectorAll("#Q"+qNumber+" input");
            cAns.forEach((radioEl) => {
                if(radioEl.checked){
                    correctAnswerId = radioEl.getAttribute("id").split('_');
                }
            })
            if (!(cAns[0].checked || cAns[1].checked || cAns[2].checked || cAns[3].checked)){
                alert("The correct answer is not assigned!");
                return false;
            }
            targetQ.correctAnswer = correctAnswerId[2];
            targetQ.answers = [];
            for(let j=0; j < 4; j++){
                let ans = document.getElementById("answer_"+qNumber+"_"+(j+1));
                if (ans != null){
                    targetQ.answers.push(ans.value);
                }
            } 
            console.log(targetQ)

            //validation
            let numRealAnswer = 0;
            for (let i=0; i < 4; i++){
                if(targetQ.answers[i].length !== 0){
                    numRealAnswer++;
                }
            }
            if (numRealAnswer < 2){
                alert("The number of selection need to be larger than 1!");
                return false;
            }
            if (targetQ.answers[targetQ.correctAnswer-1].length == 0){
                alert("The correct answer is incorrectly assigned!");
                return false;
            }

            let xhttp3 = new XMLHttpRequest();
            let params = "data="+JSON.stringify(targetQ);
            console.log(params);
            xhttp3.open("PUT", "https://lucaswgong.com/projects/01/API/v1/put_questions", true);
            xhttp3.send(params);

            xhttp3.onload = function(err) {
                if (xhttp3.readyState == 4 && xhttp3.status == 200) {
                    console.log("put request result: " + xhttp3.responseText);
                } else {
                    console.log(err);
                }
            };
        };
    });

    //delete: delete
    let deleteElements = document.getElementsByClassName('deleteButton')
    Array.from(deleteElements).forEach(function(element) {
        element.addEventListener('click', function(event){
            let qNumber = element.getAttribute("id").split('_')[2];

            let xhttp4 = new XMLHttpRequest();
            let params = `data={"targetQuestion":${ qNumber}}`;
            console.log(params);
            xhttp4.open("DELETE", "https://lucaswgong.com/projects/01/API/v1/del_questions", true);
            xhttp4.send(params);

            xhttp4.onload = function(err) {
                if (xhttp4.readyState == 4 && xhttp4.status == 200) {
                    console.log("delete request result: " + xhttp4.responseText)
                    location.reload();
                } else {
                    console.log(err);
                }
            }
        });
    });

}

const saveData = (lastId) => {
    return new Promise((resolve, reject) => {
        let newQ = {};
        newQ.questionNumber = lastId;
        newQ.question = document.getElementById("text"+lastId).value;
        let cAns = document.querySelectorAll("#Q"+lastId+" input");
        cAns.forEach((radioEl) => {
            if(radioEl.checked){
                correctAnswerId = radioEl.getAttribute("id").split('_');
            }
        })
        if (!(cAns[0].checked || cAns[1].checked || cAns[2].checked || cAns[3].checked)){
            alert("The correct answer is not assigned!");
            return false;
        }
        newQ.correctAnswer = correctAnswerId[2];
        newQ.answers = [];
        for(let j=0; j < 4; j++){
            let ans = document.getElementById("answer_"+lastId+"_"+(j+1));
            if (ans != null){
                newQ.answers.push(ans.value);
            }
        } 

        if(newQ){
            resolve(newQ);
        } else {
            reject(new Error("saveData() is failed"));
        }
    });
}

const buildNewQuestion = (numOfQuestion, lastId) => {
    const newDiv = document.createElement("div")

    newDiv.setAttribute("id", "Q"+ lastId);
    newDiv.className = "questionBox";
    newDiv.style.marginTop = "1em";
    newDiv.style.marginBottom = "2em";
    newDiv.style.marginLeft = "1em";
    newDiv.style.marginRight = "1em";

    let pTitle = document.createElement("h3");
    pTitle.innerText = "Question " + numOfQuestion;
    pTitle.style.fontWeight = "bold";
    newDiv.appendChild(pTitle);

    let pQuestion = document.createElement("textarea");
    pQuestion.setAttribute("id", "text"+lastId);
    pQuestion.className = "form-control";
    pQuestion.setAttribute("rows", 2)
    newDiv.appendChild(pQuestion);

    let pAnsTitle = document.createElement("h6");
    pAnsTitle.innerHTML = "Answers";
    pAnsTitle.style.marginTop = "0.5em";
    pAnsTitle.style.fontWeight = "bold";
    newDiv.appendChild(pAnsTitle);

    let divAns = [];
    let radioAns = [];
    let selection = [];
    let divSub = [];

    for (let j=0; j < 4; j++){
        divAns[j] = document.createElement("div");
        divAns[j].style.height = "auto"
        divAns[j].className = "mb-1 row mx-auto"
        radioAns[j] = document.createElement("input");
        selection[j] = document.createElement("textarea");

        radioAns[j].setAttribute("type", "radio");
        radioAns[j].setAttribute("name", "question"+lastId);
        radioAns[j].setAttribute("id", "cAnswer_"+lastId+"_"+(j+1));
        radioAns[j].className = "form-check-input"
        radioAns[j].style.padding = "0px"
        radioAns[j].style.margin = "auto";

        selection[j].className = "form-control form-control-sm";
        selection[j].setAttribute("rows", 1)
        selection[j].setAttribute("id", "answer_"+lastId+"_"+(j+1));

        divSub[j] = document.createElement("div");
        divSub[j].className = "col-sm"
        divSub[j].appendChild(selection[j]);

        divAns[j].appendChild(radioAns[j]);
        divAns[j].appendChild(divSub[j]);       
        newDiv.appendChild(divAns[j]);
    }

    return newDiv
}
