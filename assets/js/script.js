var startEl = document.querySelector("#start");
var initialsInput;
var saveButton;
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
        question: "Which language is used to give websites more visual customization?", 
        answers: ["CSS", "HTML", "JavaScript"],
        correct: "CSS"
    },
    {
        question: "Which terminal command stores the changes made to an existing git repository?", 
        answers: ["git push", "git commit", "git add"],
        correct: "git add"
    }
]

// begins the countdown clock
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

function questionHandler() {
    
    var questionEl = document.getElementById("question-area");
    questionEl.innerHTML = "";

    
    var questionTextEl = document.createElement('h2');
    var questionContainerEl = document.createElement('div');
    
    if (questionNumber < questions.length) {
        questionTextEl.textContent = questions[questionNumber].question;
        questionContainerEl.appendChild(questionTextEl);
    

        for(var i = 0; i < questions[questionNumber].answers.length; i++) {
            var answerButton = document.createElement('button');
            var answer = questions[questionNumber].answers[i];
            answerButton.className = 'answer-button';
            answerButton.innerHTML = answer;
            answerButton.setAttribute('data-answer', answer);
            answerButton.addEventListener('click', function(event) {
                evaluate(event.target.getAttribute('data-answer'))
            });
            questionContainerEl.appendChild(answerButton);
        }
        questionEl.appendChild(questionContainerEl);
    }
};

// checks if the answer is correct
function evaluate(answer) {
    if(answer == questions[questionNumber].correct) {
        correct();
        next();
    } else {
        incorrect();
        next();
    }
};

function correct() {
    console.log('correct');
};

function incorrect() {
    console.log('incorrect');
    timeLeft = timeLeft - 15;
};

function next() {
    questionNumber++;
    // checks for another question
    if(questionNumber >= questions.length) {
        // goes to gameOver() if true
        gameOver();
    } else {
        // goes back to questionHandler() if flase
        questionHandler();
    }
};

function gameOver() {
    var score = timeLeft;
    
    document.getElementById("timer").style.display = "none";
    document.getElementById("question-area").style.display = "none";

    var gameOverEl = document.getElementById("game-over");

    var resultsEl = document.createElement("div");
    gameOverEl.appendChild(resultsEl);

    var resultsText = document.createElement("h4");
    resultsText.textContent = "Score: " + score;
    resultsEl.appendChild(resultsText);
    


    
    initialsInput = document.createElement("input");
    initialsInput.setAttribute("type", "text");
    initialsInput.className = "initials";
    

    saveButton = document.createElement("button");

};



function start() {
    countdown();
    questionHandler();
};

startEl.addEventListener("click", function() {
    startEl.remove();
    timeLeft = 120;
    start();
});

