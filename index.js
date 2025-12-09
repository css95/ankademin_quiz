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
    // {
    //     text: "4. Harry Potter filmerna är baserade på böcker skrivna av J.R.R. Tolkien.",
    //     options: ["true", "false"],
    //     correctIndex: 1
    // },
    // {
    //     text: "5. Saga om ringen-trilogin spelades in samtidigt.",
    //     options: ["true", "false"],
    //     correctIndex: 0
    // },
    // {
    //     text: "6. Alla Studio Ghibli filmer är regisserade av Hayao Miyazaki.",
    //     options: ["true", "false"],
    //     correctIndex: 1
    // },
    // {
    //     text: "7. Originalversionen av Blade Runner hade flera olika slut beroende på region.",
    //     options: ["true", "false"],
    //     correctIndex: 0
    // },
    // {
    //     text: "8. Det finns fler Marvel-filmer än James Bond-filmer",
    //     options: ["true", "false"],
    //     correctIndex: 0
    // },
    // {
    //     text: "9. Filmen Parasite var den första icke-engelspråkiga filmen som vann Oscar för bästa film.",
    //     options: ["true", "false"],
    //     correctIndex: 0
    // },
    // {
    //     text: "10. Ljudfilmen slog igenom kommersiellt efter filmen The Jazz Singer(1927).",
    //     options: ["true", "false"],
    //     correctIndex: 0
    // }
];

const questionBoxElement = document.getElementById('question-box');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const textBoxElement = document.getElementById('text-box');

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const form = document.getElementById('optionsForm');

let score = 0;
let currentQuestionIndex = 0; 

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', handleNextQuestion);

function startQuiz() {
    console.log('Started');
    startButton.classList.add('hide');
    questionBoxElement.classList.remove('hide');
    nextButton.classList.remove('hide');
    textBoxElement.classList.add('hide');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.text;

    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(function(option, index) {
        const label = document.createElement('label');
        const input = document.createElement('input');

        input.type = 'radio';
        input.name = 'answer';
        input.value = index; 

        label.appendChild(input);
        label.append(` ${index + 1}. ${option}`);

        const br = document.createElement('br');
        optionsElement.appendChild(label);
        optionsElement.appendChild(br);
    }); 
}

function handleNextQuestion(event) {
    event.preventDefault();

    const selectedAnswer = form.elements['answer'].value;

    if(selectedAnswer === "") {
        alert("Välj ett alternativ först!");
        return;
    }

    const selectedIndex = parseInt(selectedAnswer, 10);
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctIndex) {
        score++;
    }
    console.log(`Score ${score}`);

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    textBoxElement.classList.remove('hide');
    textBoxElement.innerText = `Quiz finished! Your score is ${score}/${questions.length}`;
    form.classList.add('hide');

    if (score/questions.length < 0.5) {
        textBoxElement.style.color = "#ff0000ff";
    } else if (score/questions.length <= 0.75) {
        textBoxElement.style.color = "#ffb700ff";
    } else {
        textBoxElement.style.color = "#00920cff";
    }


}