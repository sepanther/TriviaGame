$(document).ready(function() {



//QUESTION ARRAY - set up as array instead of object
questionArr = [
    {
        question:"When Pippin says 'I think I broke something', what is he referring to?",
        answers:{
            answer:"A carrot",
            wrong1:"His hand",
            wrong2:"A tooth",
            wrong3:"A mirror",
        },
        gif:"assets/images/carrot.gif"
    },
    {
        question:"Which of the following is not mentioned by Bilbo in his birthday speech?",
        answers: {
            wrong1:"The Bolgers",
            wrong2:"The Boffins",
            answer:"The Cottons",
            wrong3:"The Grubbs"
        },
        gif:"assets/images/bilbo.gif"
    },
    {
        question:"What is Aragorn's nickname?",
        answers: {
            wrong1:"The White Wizard",
            answer:"Strider",
            wrong2:"Captain Falcon",
            wrong3:"Oompa Loompa"
        },
        gif:"assets/images/strider.gif"
    },
    {
        question:"How does Frodo know Sam?",
        answers: {
            answer:"Sam is his gardner",
            wrong1:"They are cousins",
            wrong2:"Sam is his cook",
            wrong3:"They don't know each other"
        },
        gif:"assets/images/potatoes.gif"
    },
    {
        question:"What is the name of the ferry the hobbits use to escape the Nazgûl?",
        answers:{
            wrong1:"Brandybuck",
            wrong2:"Mordor Ferry",
            wrong3:"Buckbeak",
            answer:"Buckleberry"
        },
        gif:"assets/images/buckleberry.gif"
    },
    {
        question:"What does Aragorn say before rushing the Black Gate?",
        answers: {
            wrong1:"Today we fight!",
            wrong3:"Go go Power Rangers!",
            wrong2:"Fool of a Took!",
            answer:"For Frodo"
        },
    gif:"assets/images/yolo.gif"
    }
]

//OTHER VARIABLES
var currentAns = ""
var quesCounter = 0
var correct = 0
var wrong = 0
var unanswered = 0
var gameArr;
var currentQuesIndex;

//FUNCTIONS


//Function to get the answer to the current question
function getAns() {
    currentAns = gameArr[currentQuesIndex].answers.answer
}

//Function to start the game
function loadGame() {
    $("#content").empty();
    $("#content").append("<button class=rounded id=start>Start</button>")
    $("#start").on("click", function() {
        firstQues()
    })
}

//Function for first question
function firstQues() {
    $("#content").empty();
    gameArr = questionArr.slice(0)
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
    $("#question, #choices").empty();
    $("#content").html("<h2>The correct answer was '" + currentAns + "'.</h2>")
    var quesGIF = $("<img>").attr("src",gameArr[currentQuesIndex].gif)
    $("#content").append(quesGIF)
    setTimeout(nextQues, 4000);
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
    currentQuesIndex = Math.floor(Math.random() * gameArr.length)
    console.log(currentQuesIndex)
    $("#question").html("<h2>" + gameArr[currentQuesIndex].question + "<h2>");
    for (key in gameArr[currentQuesIndex].answers) {
        answerBtn = $("<button>" + gameArr[currentQuesIndex].answers[key] + "</button>")
        answerBtn.addClass("choice rounded")
        $("#choices").append("<br>")
        $("#choices").append(answerBtn)
    }
    getAns();
    submitAns();

}

//Function for user picking answer and it evaluating whether it is correct
function submitAns() {
    $(".choice").on("click", function() {
        $("#timer").empty();
        stop();

        if (this.textContent === currentAns) {
            correct++
            $("#content").append("<h2>That's correct!</h2")
        }
        else {
            wrong++
            $("#content").append("<h2>Wrong! The correct answer was '" + currentAns + "'.</h2>")
        }
        $("#choices, #question").empty()
        var quesGIF = $("<img>").attr("src",gameArr[currentQuesIndex].gif)
        $("#content").append(quesGIF)
        setTimeout(nextQues, 4000)
    })
}

//Function to return new array without last question object
Array.prototype.remove = function(value) {
    var idx = this.indexOf(value)
}

//Function to clear out the post-question content and launch the next question
function nextQues() {
    $("#timer").empty();
    $("#content").empty();
    gameArr.splice(currentQuesIndex,1);
    quesCounter++;
    if (quesCounter === questionArr.length) {
        displayFinal();
    }
    else {
        resetTimer();
        displayQues();
    };
};

//Function to display the final game page
function displayFinal() {
    $("#content").html($("<h2>You're done!</h2>"));
    $("#content").append("Correct: " + correct + "<br>");
    $("#content").append("Incorrect: " + wrong + "<br>");
    $("#content").append("Unanswered: " + unanswered + "<br>");
    var score = (correct/questionArr.length*100).toFixed(0)
    $("#content").append("Your total score: " + score + "%<br>")
    $("#content").append($("<br><button class=rounded id=restart>Restart</button>"))
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
    firstQues();
}

loadGame()


})