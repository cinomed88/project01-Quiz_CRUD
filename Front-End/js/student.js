const xhttp = new XMLHttpRequest();
const msg_error = "There are no questions created for the quiz yet, please visit the Admin page to create questions first.";

function getData(){
    return new Promise((resolve, reject) => {
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
        };
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
    console.log(questions);

    displayQuestions(questions);
  }).catch(function(err) {
    console.error(err); 
});

function displayQuestions(qs){
    if (qs.length !== 0) {
        numOfQuestions = qs.length;
        numOfCorrectAnswer = 0;

        for (let i=0; i < numOfQuestions; i++){
            let vname = qs[i].questionNumber;
            let qDiv = document.createElement("div");
            qDiv.setAttribute("id", vname);
            qDiv.className = "card";
            qDiv.style.margin = "1rem";
            qDiv.style.color = "black"
            document.getElementById("questions").appendChild(qDiv);

            let pTitle = document.createElement("h3");
            pTitle.innerHTML = "Question " + (i + 1);
            pTitle.style.fontWeight = "bold";
            pTitle.className = "card-title"
            document.getElementById(vname).appendChild(pTitle);

            let pQuestion = document.createElement("p");
            let pQuestionRaw = qs[i].question;
            
            pQuestion.innerHTML = pQuestionRaw
            pQuestion.className = "card-text"
            document.getElementById(vname).appendChild(pQuestion);

            let pAnsTitle = document.createElement("h6");
            pAnsTitle.innerHTML = "Answers";
            pAnsTitle.style.marginTop = "0.5em";
            pAnsTitle.style.marginBottom = "0.5em";
            pAnsTitle.style.marginLeft = "1em";
            pAnsTitle.style.fontWeight = "bold";
            document.getElementById(vname).appendChild(pAnsTitle);
            
            let ansList = document.createElement("ul");
            ansList.className = "list-group list-group-flush";

            let ansElements = [];            
            let divAns = [];
            let radioAns = [];
            let selection = [];
            let divSub = [];
            
            let qsLength = 0;
            for ( let k=0; k < qs[i].answers.length; k++){
                if (qs[i].answers[k].length !== 0){
                    qsLength++;
                }
            }

            for (let j=0; j < qsLength; j++){
                ansElements[j] = document.createElement("li");
                ansElements[j].className = "list-group-item"

                divAns[j] = document.createElement("div");
                divAns[j].style.height = "auto"
                divAns[j].className = "mb-1 row mx-auto"
                radioAns[j] = document.createElement("input");
                selection[j] = document.createElement("span");

                radioAns[j].setAttribute("type", "radio");
                radioAns[j].setAttribute("name", "question"+i);
                radioAns[j].setAttribute("id", "question"+i+"radio"+j);
                radioAns[j].className = "form-check-input"
                radioAns[j].style.padding = "0px"
                radioAns[j].style.margin = "5px";
                
                selection[j].innerHTML = qs[i].answers[j];
                selection[j].className = "form-control form-control-sm border-white";
                selection[j].setAttribute("rows", 1)
                selection[j].setAttribute("id", "question_"+i+"_"+j);

                divSub[j] = document.createElement("div");
                divSub[j].className = "col-sm"
                divSub[j].appendChild(selection[j]);

                divAns[j].appendChild(radioAns[j]);
                divAns[j].appendChild(divSub[j]);
                ansElements[j].appendChild(divAns[j]);

                ansList.appendChild(ansElements[j])
            }
            document.getElementById(vname).appendChild(ansList);
        }
    } else {
        alert(msg_error);
    }
    //submit 
    document.getElementById('btn_submit').addEventListener('click', function(event){
        //disable radio buttons
        let radios = document.getElementsByTagName("input");
        for (let i = 0; i < radios.length; i++){
            radios[i].setAttribute("disabled", "disabled");
        }
        // calculate score
        score = 0;
        for (let i = 0; i < qs.length; i++){
            let correctAns = qs[i].correctAnswer-1;
            document.getElementById("question_"+i+"_"+correctAns).style.color = "white"
            document.getElementById("question_"+i+"_"+correctAns).style.backgroundColor = "#28A745"
            document.getElementById("question_"+i+"_"+correctAns).style.fontWeight = "bold"
            for (let j = 0; j < qs[i].answers.length; j++){
                if (document.getElementById("question"+i+"radio"+j).checked ){
                    if((j+1) !== qs[i].correctAnswer) {
                        document.getElementById("question_"+i+"_"+j).style.color = "white"
                        document.getElementById("question_"+i+"_"+j).style.backgroundColor = "#CA4646"
                        document.getElementById("question_"+i+"_"+j).style.fontWeight = "bold"
                    } else{
                        score++;
                    }
                }
            }
        }
        let percent = Math.round(score/qs.length*100);
        let result = "Test Scroe : " + score + " / " +qs.length + " ("+percent+"%)";
        setTimeout(() => {alert(result)}, 200);
    });
}
