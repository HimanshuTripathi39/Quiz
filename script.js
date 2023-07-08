const questions = [
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true},
            { text: "Creative Style Sheets", correct: false},
            { text: "Computer Style Sheets", correct: false},
            { text: "Colorful Style Sheets", correct: false},
        ]
    },
    {
        question: "What does XML stands for?",
        answers: [
            { text: "Extended Markup Language", correct: false},
            { text: "Exclusive Markup Language", correct: false},
            { text: "Extensible Markup Language", correct: true},
            { text: "Extrapolated Markup Language", correct: false},
        ]
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answers: [
            { text: "class", correct: false},
            { text: "style", correct: true},
            { text: "styles", correct: false},
            { text: "font", correct: false},
        ]
    },
    {
        question: "Which property is used to change the background color?",
        answers: [
            { text: "color", correct: false},
            { text: "bgcolor", correct: false},
            { text: "background-color", correct: true},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which CSS property controls the text size?",
        answers: [
            { text: "font-size", correct: true},
            { text: "font-style", correct: false},
            { text: "text-style", correct: false},
            { text: "text-size", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();
