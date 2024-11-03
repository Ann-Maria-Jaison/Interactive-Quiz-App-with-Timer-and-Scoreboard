const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which language is used for web development?",
        answers: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

startQuiz();

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 10;
    document.getElementById("quiz-container").classList.remove("hide");
    resultContainer.classList.add("hide");
    nextButton.classList.add("hide");
    showQuestion();
}

function showQuestion() {
    resetState();
    displayQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function resetState() {
    clearInterval(timerInterval);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function displayQuestion(questionObj) {
    questionElement.textContent = questionObj.question;
    questionObj.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setButtonStyle(button, button.dataset.correct === "true");
    });
    clearInterval(timerInterval);
    nextButton.classList.remove("hide");
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.textContent = "Next";
    } else {
        nextButton.textContent = "Show Score";
    }
}

function setButtonStyle(button, correct) {
    if (correct) {
        button.style.backgroundColor = "green";
    } else {
        button.style.backgroundColor = "red";
    }
    button.disabled = true;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        timeLeft = 10;
        showQuestion();
    } else {
        showScore();
    }
}

function startTimer() {
    timeLeft = 10;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            selectAnswer({ target: { dataset: { correct: false } } });
        }
    }, 1000);
}

function showScore() {
    document.getElementById("quiz-container").classList.add("hide");
    resultContainer.classList.remove("hide");
    scoreElement.textContent = `You scored ${score} out of ${questions.length}!`;
}

nextButton.addEventListener("click", nextQuestion);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
