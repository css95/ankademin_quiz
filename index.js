const questions = [
    {
        text: "1. Filmen Titanic släpptes år 1997.",
        options: ["true", "false"],
        correctIndex: 0
    },
    {
        text: "2. Leonardo DiCaprio har vunnit en Oscar för filmen The Revenant.",
        options: ["true", "false", "neither"],
        correctIndex: 0
    },
    {
        text: "3. Avatar(2009) är regisserad av Steven Spielberg.",
        options: ["true", "false"],
        correctIndex: 1
    },
    {
        text: "4. Harry Potter filmerna är baserade på böcker skrivna av J.R.R. Tolkien.",
        options: ["true", "false"],
        correctIndex: 1
    },
    {
        text: "5. Saga om ringen-trilogin spelades in samtidigt.",
        options: ["true", "false"],
        correctIndex: 0
    },
    {
        text: "6. Alla Studio Ghibli filmer är regisserade av Hayao Miyazaki.",
        options: ["true", "false"],
        correctIndex: 1
    },
    {
        text: "7. Originalversionen av Blade Runner hade flera olika slut beroende på region.",
        options: ["true", "false"],
        correctIndex: 0
    },
    {
        text: "8. Det finns fler Marvel-filmer än James Bond-filmer",
        options: ["true", "false"],
        correctIndex: 0
    },
    {
        text: "9. Filmen Parasite var den första icke-engelspråkiga filmen som vann Oscar för bästa film.",
        options: ["true", "false"],
        correctIndex: 0
    },
    {
        text: "10. Ljudfilmen slog igenom kommersiellt efter filmen The Jazz Singer(1927).",
        options: ["true", "false"],
        correctIndex: 0
    }
];

const questionBoxElement = document.getElementById('question-box');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const startButton = document.getElementById('start-btn');
const submitButton = document.getElementById('submit-btn');

let score = 0;

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    console.log('Started');
    startButton.classList.add('hide');
    questionBoxElement.classList.remove('hide');
    setNextQuestion()
}

function setNextQuestion() {
    for(let i=0; i<questions.length; i++) {
    let currentQuestion = questions[i];
    console.log(currentQuestion.text);
    questionElement.textContent = currentQuestion.text;

    let optionsText = "";

    for(let j=0; j<currentQuestion.options.length; j++){
        console.log(currentQuestion.options[j]);
        optionsText += `${j+1} ${currentQuestion.options[j]} `;
    }

    optionsElement.textContent = optionsText;

}

}