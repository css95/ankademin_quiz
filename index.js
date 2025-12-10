// QUIZ QUESTIONS 
// Quiz questions have 3 types: true/false[0], multiple choice[1], or multiple correct answers/checkbox[2].
// Type 0 and 1 use radio buttons, type 2 uses checkboxes. 
const questions = [
    {
        text: "Filmen Titanic släpptes år 1997.",
        options: ["true", "false"],
        correctIndex: 0,
        type: 0
    },
    {
        text: "För vilken film vann Leonardo DiCaprio en Oscar?",
        options: ["Titanic", "Blood Diamond", "The Revenant", "The Woolf of Wall Street"],
        correctIndex: 2,
        type: 1
    },
    {
        text: "Vilka av dessa är INTE Harry Potter filmer?",
        options: ["Harry Potter och de vises sten", "Harry Potter och Gandalf på äventyr", "Harry Potter och Dumbledors armé", "Harry Potter och fången från Azkaban"],
        correctIndex: [1, 2],
        type: 2
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

// GETTING ELEMENTS FROM THE HTML 
const questionBoxElement = document.getElementById('question-box');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const textBoxElement = document.getElementById('text-box');
const bodyElement = document.querySelector('body');
const h1Element = document.querySelector('h1');

// ALL BUTTON ELEMENTS
const darkmodeButton = document.getElementById('darkmode-btn');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const form = document.getElementById('optionsForm');

// VARIABLES
let score = 0;
let currentQuestionIndex = 0; 
let isDarkmode = false;

// EVENT LISTENERS
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', handleNextQuestion);
restartButton.addEventListener('click', startQuiz);
darkmodeButton.addEventListener('click', switchDarkmode);


// FUNCTIONS

// START QUIZ
// Start the quiz, hide buttons, set score to 0
function startQuiz() {
    console.log('Started');
    startButton.classList.add('hide');
    nextButton.classList.remove('hide');
    form.classList.remove('hide');
    restartButton.classList.add('hide');
    textBoxElement.classList.add('hide');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// SHOW QUESTION
// Show the question with either radio button or checkbox, depending on type 
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = (currentQuestionIndex + 1) + ". " + currentQuestion.text;

    optionsElement.innerHTML = "";

    if (currentQuestion.type === 0 || currentQuestion.type == 1) {

        for (let i = 0; i < currentQuestion.options.length; i++) {
            const optionText = currentQuestion.options[i];

            const label = document.createElement('label');
            const input = document.createElement('input');

            input.type = 'radio';
            input.name = 'answer';
            input.value = i; 

            label.appendChild(input);
            label.append(" " + (i + 1) + ". " + optionText);

            const lineBreak = document.createElement('br');
            optionsElement.appendChild(label);
            optionsElement.appendChild(lineBreak);
        }

    } else if (currentQuestion.type === 2) {

        for (let i = 0; i < currentQuestion.options.length; i++) {
            const optionText = currentQuestion.options[i];

            const label = document.createElement('label');
            const input = document.createElement('input');

            input.type = 'checkbox';
            input.name = 'answer';
            input.value = i;

            label.appendChild(input);
            label.append(" " + (i + 1) + ". " + optionText);

            const lineBreak = document.createElement('br');
            optionsElement.appendChild(label);
            optionsElement.appendChild(lineBreak);
        }
    }
}

// HANDLE THE NEXT QUESTION 
// Answering, submitting and next question 
function handleNextQuestion() {
    
    const currentQuestion = questions[currentQuestionIndex];

    // Answers of type 0 and 1 (radio buttons with a single correct answer)
    if (currentQuestion.type === 0 || currentQuestion.type == 1) {

        let selectedAnswer = form.elements['answer'].value;

        if(selectedAnswer === "") {
            alert("Välj ett alternativ först!");
            return;
        }

        const selectedIndex = parseInt(selectedAnswer, 10);

        if (selectedIndex === currentQuestion.correctIndex) {
            score++;
        }

// Answers of type 2 (checkboxes with multiple correct answers)
    } else if (currentQuestion.type === 2) {

        const answers = form.elements['answer'];
        const correctIndexes = currentQuestion.correctIndex;;
        let selectedIndexes = [];

        for(let i = 0; i < answers.length; i++) {
            if (answers[i].checked === true) {
                selectedIndexes.push(parseInt(answers[i].value, 10));
            }
        }

        if (selectedIndexes.length === 0) {
            alert("Välj minst ett alternativ först!");
            return;
        }

        let isCorrect = true;

        if (selectedIndexes.length !== correctIndexes.length) {
            isCorrect = false;
        }

        for (let i = 0; i < correctIndexes.length; i++) {
            const correctIndex = correctIndexes[i];

            if(selectedIndexes.indexOf(correctIndex) === -1) {
                isCorrect = false;
                break;
            }
        }

        if (isCorrect === true) {
            score++;
        }


    }

    console.log(`Score ${score}`);

// Next question 
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Ending the quiz and results 
function endQuiz() {
    textBoxElement.classList.remove('hide');
    textBoxElement.innerText = `Quiz finished! \n Your score is ${score}/${questions.length} = ${Math.round(100 * score/questions.length)}%`;
    form.classList.add('hide');

    if (score/questions.length < 0.5) {
        textBoxElement.style.color = "#ff0000ff";
    } else if (score/questions.length <= 0.75) {
        textBoxElement.style.color = "#ffb700ff";
    } else {
        textBoxElement.style.color = "#00920cff";
    }

    restartButton.classList.remove('hide');
}

// DARK MODE 
function switchDarkmode() {
    if(isDarkmode) {
        isDarkmode = false;
    } else {
        isDarkmode = true;
    }
    console.log(`Darkmode: ${isDarkmode}`);

     if(isDarkmode) {
        darkmodeButton.innerText = " ☀️ Light mode";
        bodyElement.style.backgroundColor = "#130042ff";
        textBoxElement.style.color = "white";
        questionElement.style.color = "white";
        optionsElement.style.color = "white";
        h1Element.style.color = "white";
    } else {
        darkmodeButton.innerText = " 🌙 Dark Mode";
        bodyElement.style.backgroundColor = "#fff";
        textBoxElement.style.color = "black";
        questionElement.style.color = "black";
        optionsElement.style.color = "black";
        h1Element.style.color = "black";
    }


}