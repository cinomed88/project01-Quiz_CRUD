const xhttp = new XMLHttpRequest();
const msg_error = "There are no questions created for the quiz yet, please visit the Admin page to create questions first."

function getData(){
    return new Promise((resolve, reject) => {
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
    console.log(questions);

    displayQuestions(questions);
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
            qDiv.setAttribute("id", vname);
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
            document.getElementById(vname).appendChild(pTitle);

            let pQuestion = document.createElement("p");
            let pQuestionRaw = qs[i].question;
            
            pQuestion.innerHTML = pQuestionRaw
            pQuestion.readOnly = "true";
            pQuestion.style.marginTop = "0.5em";
            pQuestion.style.marginBottom = "0.5em";
            pQuestion.style.marginLeft = "1em";
            pQuestion.style.height = "auto";
            pQuestion.style.width = "auto";
            pQuestion.style.minHeight = "20px";
            document.getElementById(vname).appendChild(pQuestion);

            let pAnsTitle = document.createElement("p");
            pAnsTitle.innerHTML = "Answers*";
            pAnsTitle.style.marginTop = "0.5em";
            pAnsTitle.style.marginBottom = "0.5em";
            pAnsTitle.style.marginLeft = "1em";
            pAnsTitle.style.fontWeight = "bold";
            document.getElementById(vname).appendChild(pAnsTitle);
            
            let divAns = [];
            let radioAns = [];
            let selection = [];

            for (let j=0; j < qs[i].answers.length; j++){
                divAns[j] = document.createElement("div");
                divAns[j].style.height = "auto"
                radioAns[j] = document.createElement("input");
                selection[j] = document.createElement("span");

                radioAns[j].setAttribute("type", "radio");
                radioAns[j].setAttribute("name", "question"+i);
                radioAns[j].setAttribute("id", "question"+i+"radio"+j);
                radioAns[j].style.marginTop = "0.9em"
                radioAns[j].style.marginLeft = "1em"

                selection[j].readOnly = "true";
                selection[j].innerHTML = qs[i].answers[j];
                selection[j].style.height = "auto"
                selection[j].setAttribute("id", "question_"+i+"_"+j);

                divAns[j].appendChild(radioAns[j]);
                divAns[j].appendChild(selection[j]);
                document.getElementById(vname).appendChild(divAns[j]);
            }
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