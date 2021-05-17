/** * Created with JetBrains WebStorm.
 * User: pwanwu
 * Date: 18/09/2013
 * Time: 17:41
 * To change this template use File | Settings | File Templates.
 */

var questions = [{
    question: "1. Which of the following is a modern method of transmitting information?",
    choices: ["Internet", "Whistling", "Flying", "Singing"],
    correctAnswer: 0
}, {
    question: "2. Which of the following methods enables a user to receiver to use his/her eyes?",
    choices: [" Radio", "Television.", "Telex.", "Printer"],
    correctAnswer: 1
}, {
    question: "3. _____ is the largest computer network.",
    choices: ["Radio", "Telex", "Internet", "Broadcasting"],
    correctAnswer: 2
}, {
    question: "4. _____ is the device for monitoring events happening worldwide.",
    choices: ["Camera", "Scientist", "Satellite", "Moon"],
    correctAnswer: 2
}, {
    question: "5. Which of the following enables the receiver to get information in hardcopy?",
    choices: ["Radio", "Telephone", "Television", "Fax"],
    correctAnswer: 3
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input class="w3-radio" type="radio" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
    }
}
function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(".results").html("<h1>You answered" + ' ' + correctAnswers + ' ' + " questions out of " +' ' + questions.length + ' ' + " correctly </h1>");
    $(".results").show();
    $('#id01').css("display", "flex");
}

function hideScore() {
    $(document).find(".result").hide();
}