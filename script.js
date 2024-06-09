const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.getElementById('save-score-btn');
const restartButton = document.getElementById('restart-btn');


let currentQuestionIndex, shuffledQuestions, score, timer, timeRemaining;

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'Who is the goat?',
        answers: [
            { text: 'Ronaldo', correct: true },
            { text: 'Messi', correct: false }
        ]
    },
    {
        question: 'Which team get the most UCL?',
        answers: [
            { text: 'Real Madrid', correct: true },
            { text: 'Arsenal', correct: false }
        ]
    },
    {
        question: 'What is the programming language?',
        answers: [
            { text: 'PYTHON', correct: true },
            { text: 'HTML', correct: false }
        ]
    },
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Paris', correct: true }
        ]
    }
];

startButton.addEventListener('click', startGame);
saveScoreButton.addEventListener('click', saveScore);
restartButton.addEventListener('click', restartGame);


function startGame() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    score = 0;
    timeRemaining = 60;
    timer = setInterval(updateTimer, 1000);
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

function updateTimer() {
    timeRemaining--;
    timerElement.textContent = timeRemaining;
    if (timeRemaining <= 0) {
        endGame();
    }
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    } else {
        timeRemaining -= 10;
    }
    if (timeRemaining <= 0) {
        endGame();
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            setNextQuestion();
        } else {
            endGame();
        }
    }
}

function endGame() {
    clearInterval(timer);
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.textContent = score;
}

function saveScore() {
    const initials = initialsInput.value;
    if (initials) {
        // Save the score and initials (for example, to localStorage)
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const newScore = { score, initials };
        highScores.push(newScore);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        alert('Score saved!');
    }
}
function restartGame() {
    initialsInput.value = '';
    startGame();
}
