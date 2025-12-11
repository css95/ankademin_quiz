// QUIZ QUESTIONS 
// Quiz questions have 3 types: true/false[0], multiple choice[1], or multiple correct answers[2].
// Type 0 and 1 use radio buttons, type 2 uses checkboxes. 
const questions = [
    {
        text: "Filmen Titanic släpptes år 1997.",
        options: ["sant", "falsk"],
        correctIndex: 0,
        type: 0
    },
    {
        text: "För vilken film vann Leonardo DiCaprio en Oscar?",
        options: ["Titanic", "Blood Diamond", "The Revenant", "The Wolf of Wall Street"],
        correctIndex: 2,
        type: 1
    },
    {
        text: "Vilka av dessa är INTE Harry Potter filmer?",
        options: ["Harry Potter och de vises sten", "Harry Potter och Gandalf på äventyr", "Harry Potter och Dumbledors armé", "Harry Potter och fången från Azkaban"],
        correctIndex: [1, 2],
        type: 2
    },
    {
        text: "Avatar är regisserad av Steven Spielberg.",
        options: ["sant", "falsk"],
        correctIndex: 1,
        type: 0
    },
    {
        text: "Vilket år släpptes första Star Wars-filmen?",
        options: ["1975", "1977", "1980", "1983"],
        correctIndex: 1,
        type: 1
    },
    {
        text: "Vilka av dessa skådespelare har spelat James Bond?",
        options: ["Sean Connery", "Daniel Craig", "Tom Cruise", "Pierce Brosnan"],
        correctIndex: [0, 1, 3],
        type: 2
    },
    {
        text: "Alla Studio Ghibli filmer är regisserade av Hayao Miyazaki.",
        options: ["sant", "falsk"],
        correctIndex: 1,
        type: 0
    },
    {
        text: "Vilken film är baserad på en bok av Stephen King?",
        options: ["The Shining", "Inception", "Avatar", "Interstellar"],
        correctIndex: 0,
        type: 1
    },
    {
        text: "Vilka av dessa filmer utspelar sig helt eller delvis i rymden?",
        options: ["Gravity", "Interstellar", "The Martian", "The Godfather"],
        correctIndex: [0, 1, 2],
        type: 2
    },
    {
        text: "Filmen Parasite var den första icke-engelspråkiga filmen som vann Oscar för bästa film.",
        options: ["sant", "falsk"],
        correctIndex: 0,
        type: 0
    },

];

// GETTING ELEMENTS FROM THE HTML 
const questionBoxElement = document.getElementById('question-box');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const textBoxElement = document.getElementById('text-box');
const resultBoxElement = document.getElementById('result-box');
const bodyElement = document.querySelector('body');
const h1Element = document.querySelector('h1');
const form = document.getElementById('optionsForm');

// ALL BUTTON ELEMENTS
const darkmodeButton = document.getElementById('darkmode-btn');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const resultButton = document.getElementById('result-btn');

// VARIABLES
let score = 0;
let currentQuestionIndex = 0; 
let isDarkmode = false;
let userAnswers = Array.from({ length: questions.length }, function () {
    return {
        answer: [],
        isCorrect: []
    };
});

// EVENT LISTENERS
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', checkAnswer);
restartButton.addEventListener('click', startQuiz);
darkmodeButton.addEventListener('click', switchDarkmode);
resultButton.addEventListener('click', showResult);


// FUNCTIONS

// START QUIZ
// Start the quiz, remove or add 'hide' for buttons, set score to 0, reset stored user answers
function startQuiz() {
    console.log('Started');
    startButton.classList.add('hide');
    nextButton.classList.remove('hide');
    form.classList.remove('hide');
    restartButton.classList.add('hide');
    textBoxElement.classList.add('hide');
    resultButton.classList.add('hide');
    resultBoxElement.innerHTML = "";

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = Array.from({ length: questions.length }, function () {
        return {
            answer: [],
            isCorrect: []
        };
    });

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
// Answering question, storing user's answer
function checkAnswer() {
    
    const currentQuestion = questions[currentQuestionIndex];

    // Answers of type 0 and 1 (radio buttons with a single correct answer)
    if (currentQuestion.type === 0 || currentQuestion.type == 1) {

        let selectedAnswer = form.elements['answer'].value;

        if(selectedAnswer === "") {
            alert("Välj ett alternativ först!");
            return;
        }

        const selectedIndex = parseInt(selectedAnswer, 10);
        userAnswers[currentQuestionIndex].answer = selectedIndex;

        if (selectedIndex === currentQuestion.correctIndex) {
            score++;
            userAnswers[currentQuestionIndex].isCorrect = true;
        } else {
            userAnswers[currentQuestionIndex].isCorrect = false;
        }

    // Answers of type 2 (checkboxes with multiple correct answers)
    } else if (currentQuestion.type === 2) {

        const answers = form.elements['answer'];
        const correctIndexes = currentQuestion.correctIndex;
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

        userAnswers[currentQuestionIndex].answer = selectedIndexes;
        userAnswers[currentQuestionIndex].isCorrect = isCorrect;

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

// END THE QUIZ
function endQuiz() {
    textBoxElement.classList.remove('hide');

    const percentage = Math.round(100 * score / questions.length);
    let messageToUser = "";

    if (percentage < 50) {
        messageToUser = "Underkänt";
        textBoxElement.style.color = "#ff0000ff";
    } else if (percentage <= 75) {
        messageToUser = "Bra";
        textBoxElement.style.color = "#dd9400ff";
    } else {
        messageToUser = "Riktigt bra jobbat";
        textBoxElement.style.color = "#00920cff";
    }

    textBoxElement.innerText = `Quizet är klart.\n Ditt resultat är ${score}/${questions.length} = ${percentage}%.\n ${messageToUser}!`;
    
    form.classList.add('hide');
    restartButton.classList.remove('hide');
    resultButton.classList.remove('hide');

}

// SHOW THE RESULTS
function showResult() {
    resultButton.classList.add('hide');
    textBoxElement.innerHTML += "\n";
    resultBoxElement.innerHTML = "";

    let resultText = "";
    let color = "";
    for (let i = 0; i < questions.length; i ++) {
        if (userAnswers[i].isCorrect) {
            color = "#023b00ff";
        } else {
            color = "#560404ff";
        }

        resultText = "";
        resultText += `<span style="color: ${color}">`;
        resultText += "<br>";
        resultText += `${i+1}. ${questions[i].text}<br>`;
        resultText += `Korrekt svar:<br>`;

        if (questions[i].type == 0 || questions[i].type == 1) {
            resultText += `${questions[i].options[questions[i].correctIndex]}<br>`;
        } else {
            for (let j = 0; j < questions[i].correctIndex.length; j++) {
                resultText += `${questions[i].options[questions[i].correctIndex[j]]}<br>`;
            }
        }
        
        resultText += `Ditt svar:<br>`;
        if (questions[i].type == 0 || questions[i].type == 1) {
            resultText += `${questions[i].options[userAnswers[i].answer]}<br>`;
        } else {
            for (let j = 0; j < userAnswers[i].answer.length; j++) {
                resultText += `${questions[i].options[userAnswers[i].answer[j]]}<br>`;
            }
        }

        resultText += `</span><br>`;
        resultBoxElement.innerHTML += resultText;
    }
}

// DARK MODE 
function switchDarkmode() {
    if(isDarkmode) {
        isDarkmode = false;
    } else {
        isDarkmode = true;
    }
    console.log(`Darkmode: ${isDarkmode}`);

     if(isDarkmode === true) {
        darkmodeButton.innerText = " ☀️ Light Mode";
        bodyElement.style.backgroundColor = "#130042ff";
        questionBoxElement.style.backgroundColor = "rgba(151, 65, 0, 1)";
        questionElement.style.color = "white";
        optionsElement.style.color = "white";
        h1Element.style.color = "white";
    } else {
        darkmodeButton.innerText = " 🌙 Dark Mode";
        bodyElement.style.backgroundColor = "#ffffffff";
        questionBoxElement.style.backgroundColor = "rgba(233, 184, 166, 1)";
        questionElement.style.color = "black";
        optionsElement.style.color = "black";
        h1Element.style.color = "black";
    }
}

