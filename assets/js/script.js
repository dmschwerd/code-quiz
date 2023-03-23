var startEl = document.querySelector("#start");
var initialsInput = 0;
var saveButtonEl;
var timeLeft = 120;
var questionNumber = 0;

var highScore = {
    initials: "",
    score: 0
}

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
var countdown = function() {
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

var questionHandler = function() {
    
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
var evaluate = function(answer) {
    if(answer == questions[questionNumber].correct) {
        correct();
        next();
    } else {
        incorrect();
        next();
    }
};

var correct = function() {
    console.log('correct');
};

var incorrect = function() {
    console.log('incorrect');
    timeLeft = timeLeft - 15;
};

var next = function() {
    questionNumber++;
    // checks for another question
    if(questionNumber >= questions.length) {
        // goes to gameOver() if true
        gameOver();
    } else {
        // goes back to questionHandler() if false
        questionHandler();
    }
};


var gameOver = function() {
    debugger;
    var quizScore = timeLeft;
    var allTimeHigh = localStorage.getItem("high-score");
    allTimeHigh = JSON.parse(allTimeHigh);
    
    // removes question and timer
    document.getElementById("timer").style.display = "none";
    document.getElementById("question-area").style.display = "none";
    
    var gameOverEl = document.getElementById("game-over");
    
    var resultsEl = document.createElement("div");
    gameOverEl.appendChild(resultsEl);
    
    var resultsText = document.createElement("h4");
    resultsText.textContent = "Score: " + quizScore + " High-score: " + highScore.score;
    resultsEl.appendChild(resultsText);
    
    // if the users scored the high-score they can save them by putting their initials in 
    var highScoreText = document.createElement("h3");
    
    if(quizScore > allTimeHigh.score) {
        highScore.score = quizScore;
        
        highScoreText.textContent = "Congratulations you got the high-score! Enter your initials in the box below to save your score";
        resultsEl.appendChild(highScoreText);
        
        initialsInput = document.createElement("input");
        initialsInput.setAttribute("type", "text");
        initialsInput.id = "initials";
        gameOverEl.appendChild(initialsInput);
        
        saveButtonEl = document.createElement("button");
        saveButtonEl.textContent = "Save"
        saveButtonEl.className = "btn save-btn";
        gameOverEl.appendChild(saveButtonEl);
        
        // click save button to save high-score
        saveButtonEl.addEventListener("click", saveScore);
        
    } else {
        highScoreText.textContent = "You weren't able to beat the high-score of " + highScore.score + ".";
        resultsEl.appendChild(highScoreText);
    }
    
};

var saveScore = function() {
    highScore.initials = document.getElementById("initials").value;
    localStorage.setItem("high-score", JSON.stringify(highScore));
};

var start = function() {
    countdown();
    questionHandler();
};

// click the start button to begin
startEl.addEventListener("click", function() {
    startEl.remove();
    timeLeft = 120;
    start();
});