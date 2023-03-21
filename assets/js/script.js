var startEl = document.querySelector("#start");
var timeLeft = 120;
var questionNumber = 0;

// list of questions in the quiz
var questions = [
    {
        question: "In JavaScript what can you put in front of a variable to initialize it?",
        answers: ["for", "var", "while", "if"],
        correct: "var"
    },
    {
        question: "", 
        answers: [],
        correct: ""
    },
    {
        question: "What's color is the sky?", 
        answers: ["brown", "purple", "blue"],
        correct: "blue"
    }
]

function giveQuestion() {
    
    var questionEl = document.getElementById("question-area");
    questionEl.innerHTML = "";

    var questionTextEl = document.createElement('h2');
    var questionContainerEl = document.createElement('div');

    questionTextEl.textContent = questions[questionNumber].question;
    questionContainerEl.appendChild(questionTextEl);

    for(var i = 0; i < questions[questionNumber].answers.length; i++) {
        var answerButton = document.createElement('button');
        var answer = questions[questionNumber].answers[i];
        answerButton.className = 'answer-button';
        answerButton.innerHTML = answer;
        answerButton.setAttribute('data-answer', answer);
        questionContainerEl.appendChild(answerButton);
    }
    questionEl.appendChild(questionContainerEl);
};

function countdown() {
    var timerEl = document.getElementById('timer');

    var timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.textContent = 'You have ' + timeLeft + ' seconds remaining.';
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = 'You have ' + timeLeft + ' second remaining.';
            timeLeft--;
        } else {
            timerEl.textContent = 'Time is up.';
            clearInterval(timeInterval);
        }
    }, 1000);
};

function start() {
    countdown();
    giveQuestion();
};

startEl.addEventListener("click", function() {
    startEl.remove();
    timeLeft = 120;
    start();
});