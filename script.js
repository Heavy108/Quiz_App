const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "c"
    },
    {
        question: "Who is the CEO of Tesla?",
        a: "Jeff Bezos",
        b: "Elon Musk",
        c: "Bill Gates",
        d: "Tony Stark",
        correct: "b"
    },
    {
        question: "What is the capital of Spain?",
        a: "Madrid",
        b: "Barcelona",
        c: "Valencia",
        d: "Seville",
        correct: "a"
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborghinis",
        correct: "a"
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b"
    }
];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');
const resultMessage = document.getElementById('result-message');
const resultImage = document.getElementById('result-image');
const changeBgButton = document.getElementById('change-bg-button');

let currentQuiz = 0;
let score = 0;
let backgroundIndex = 0;

const backgrounds = [
    'Assets/b1.gif',
    'Assets/b2.gif',
    'Assets/b3.gif',
    'Assets/b4.gif',
    'Assets/b5.gif'
];

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    const quizHTML = `
        <h2>${currentQuizData.question}</h2>
        <label>
            <input type="radio" name="answer" value="a">
            ${currentQuizData.a}
        </label>
        <label>
            <input type="radio" name="answer" value="b">
            ${currentQuizData.b}
        </label>
        <label>
            <input type="radio" name="answer" value="c">
            ${currentQuizData.c}
        </label>
        <label>
            <input type="radio" name="answer" value="d">
            ${currentQuizData.d}
        </label>
    `;
    quizContainer.innerHTML = quizHTML;
}

function getSelected() {
    const answerEls = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            selectedAnswer = answerEl.value;
        }
    });
    return selectedAnswer;
}

function showResult() {
    const passingScore = 3; // Threshold value
    resultContainer.style.display = 'block';
    if (score >= passingScore) {
        resultMessage.textContent = "Congratulations! You passed the quiz.";
        resultImage.src = "Assets/winner.gif"; // Winner GIF
    } else {
        resultMessage.textContent = "Sorry, you did not pass the quiz.";
        resultImage.src =  "Assets/looser.gif"; // Loser GIF
    }
}

function changeBackground() {
    backgroundIndex = (backgroundIndex + 1) % backgrounds.length;
    document.body.style.backgroundImage = `url(${backgrounds[backgroundIndex]})`;
}

submitButton.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quizContainer.style.display = 'none';
            submitButton.style.display = 'none';
            showResult();
        }
    }
});

changeBgButton.addEventListener('click', changeBackground);

// Load the first quiz question
loadQuiz();
