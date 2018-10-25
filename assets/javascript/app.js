$(document).ready(function() {



//QUESTION ARRAY - set up as array instead of object
gameArr = [
    {
    question:"Who is Tulsi's roommate?",
    answers:{
        wrong1:"Reza",
        wrong2:"Paras",
        answer:"Aamina",
        wrong3:"Sepanta"
    }
},
    {
        question:"What is Aragorn's nickname?",
        answers: {
        wrong1:"The White Wizard",
        answer:"Stryder",
        wrong2:"Captain Falcon",
        wrong3:"Oompa Loompa"
    }
}
]

//OTHER VARIABLES
currentAns = ""
quesCounter = 0
correct = 0
wrong = 0
unanswered = 0

//FUNCTIONS

//Function to get the question
function getQues() {
    currentQues = gameArr[quesCounter].question
}

//Function to get the answer to the current question
function getAns() {
    currentAns = gameArr[quesCounter].answers.answer
}

//Function to start the game
function loadGame() {
    $("#content").empty();
    $("#content").append("<button id=start>Start</button>")
    $("#start").on("click", function() {
        firstQues()
    })
}

//Function for first question
function firstQues() {
    $("#content").empty();
    displayQues();
}

//TIMER FUNCTIONS
number = 10;
var intervalId;

//Decrement function
function decrement() {
    number--
    $("#timer").html("You have " + number + " seconds left")
    if (number === 0) {
        unanswered++
        stop();
        timeOut();
    }
}

//Function to run timer
function runTimer() {
    $("#timer").html("You have " + number + " seconds left")
    clearInterval(intervalId)
    intervalId = setInterval(decrement, 1000)

}

//Function if time runs out
function timeOut() {
    $("#timer").html("You ran out of time!");
    $("#question").empty();
    setTimeout(nextQues, 3000);
}

//Function to stop timer
function stop() {
    clearInterval(intervalId);
}

//Function to reset timer
function resetTimer() {
    $("#timer").empty()
    number = 10
}


//Function to display question and answers
function displayQues() {
    runTimer();
    $("#question").text(gameArr[quesCounter].question);
    for (key in gameArr[quesCounter].answers) {
        answerBtn = $("<button>" + gameArr[quesCounter].answers[key] + "</button>")
        answerBtn.addClass("choice")
        $("#question").append("<br>")
        $("#question").append(answerBtn)
    }
    // runTimer()
    submitAns()
}

//Function for user picking answer and it evaluating whether it is correct
function submitAns() {
    $(".choice").on("click", function() {
        $("#timer").empty();
        stop();
        getAns();
        if (this.textContent === currentAns) {
            correct++
            $("#content").append("<h2>That's Correct</h2")
        }
        else {
            wrong++
            $("#content").append("<h2>Wrong! The correct answer was " + currentAns + ".</h2>")
        }
        $("#question").empty()
        setTimeout(nextQues, 3000)
    })
}

//Function to clear out the post-question content and launch the next question
function nextQues() {
    $("#timer").empty();
    $("#content").empty();
    quesCounter++;
    if (quesCounter === gameArr.length) {
        displayFinal();
    }
    else {
        resetTimer();
        displayQues();
    };
};

//Function to display the final game page
function displayFinal() {
    $("#content").html($("<h2>You're all set!</h2>"));
    $("#content").append("Correct: " + correct + "<br>");
    $("#content").append("Incorrect: " + wrong + "<br>");
    $("#content").append("Unanswered: " + unanswered + "<br>");
    $("#content").append("Your total score: " + correct/gameArr.length*100 + "%<br>")
    $("#content").append($("<button id=restart>Restart</button>"))
    $("#restart").on("click", function() {
        restartGame();
    })
}

function restartGame() {
    currentAns = ""
    quesCounter = 0
    correct = 0
    wrong = 0
    unanswered = 0
    resetTimer();
    loadGame();
}

loadGame()


})