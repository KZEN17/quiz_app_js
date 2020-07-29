const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'What is 2 x 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'What is 3 x 2?',
        choice1: '2',
        choice2: '4',
        choice3: '6',
        choice4: '7',
        answer: 3,
    },
    {
        question: 'What is 4 x 2?',
        choice1: '2',
        choice2: '4',
        choice3: '8',
        choice4: '6',
        answer: 3,
    },
    {
        question: 'What is 2 X 5?',
        choice1: '12',
        choice2: '14',
        choice3: '10',
        choice4: '8',
        answer: 3,
    },
    {
        question: 'What is 2 X 6?',
        choice1: '12',
        choice2: '14',
        choice3: '21',
        choice4: '17',
        answer: 1,
    },
    {
        question: 'What is 7 X 2?',
        choice1: '12',
        choice2: '14',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'What is 8 X 2?',
        choice1: '12',
        choice2: '16',
        choice3: '18',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'What is 9 X 2?',
        choice1: '12',
        choice2: '14',
        choice3: '21',
        choice4: '18',
        answer: 4,
    },
    {
        question: 'What is 10 X 2?',
        choice1: '20',
        choice2: '24',
        choice3: '21',
        choice4: '18',
        answer: 1,
    },
    {
        question: 'What is 3 x 3?',
        choice1: '12',
        choice2: '9',
        choice3: '11',
        choice4: '10',
        answer: 2,
    },
    {
        question: 'What is 3 x 4?',
        choice1: '12',
        choice2: '14',
        choice3: '16',
        choice4: '17',
        answer: 1,
    },
    {
        question: 'What is 3 x 5?',
        choice1: '12',
        choice2: '14',
        choice3: '15',
        choice4: '16',
        answer: 3,
    },
    {
        question: 'What is 3 X 6?',
        choice1: '12',
        choice2: '14',
        choice3: '10',
        choice4: '18',
        answer: 4,
    },
    {
        question: 'What is 3 X 7?',
        choice1: '12',
        choice2: '14',
        choice3: '21',
        choice4: '17',
        answer: 3,
    },
    {
        question: 'What is 8 X 3?',
        choice1: '22',
        choice2: '24',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'What is 9 X 3?',
        choice1: '22',
        choice2: '26',
        choice3: '28',
        choice4: '27',
        answer: 4,
    },
    {
        question: 'What is 10 X 3?',
        choice1: '32',
        choice2: '30',
        choice3: '31',
        choice4: '28',
        answer: 2,
    },
    {
        question: 'What is 11 X 3?',
        choice1: '33',
        choice2: '35',
        choice3: '31',
        choice4: '32',
        answer: 1,
    },
    {
        question: 'What is 4 X 4?',
        choice1: '16',
        choice2: '12',
        choice3: '14',
        choice4: '18',
        answer: 1,
    },
    {
        question: 'What is 4 X 5?',
        choice1: '21',
        choice2: '22',
        choice3: '20',
        choice4: '24',
        answer: 3,
    },
    {
        question: 'What is 4 X 6?',
        choice1: '22',
        choice2: '24',
        choice3: '26',
        choice4: '28',
        answer: 2,
    },
    {
        question: 'What is 4 X 7?',
        choice1: '22',
        choice2: '24',
        choice3: '26',
        choice4: '28',
        answer: 4,
    },
    {
        question: 'What is 4 X 8?',
        choice1: '32',
        choice2: '24',
        choice3: '26',
        choice4: '28',
        answer: 1,
    },
    {
        question: 'What is 4 X 9?',
        choice1: '32',
        choice2: '24',
        choice3: '36',
        choice4: '28',
        answer: 3,
    },
    {
        question: 'What is 4 X 10?',
        choice1: '38',
        choice2: '40',
        choice3: '36',
        choice4: '42',
        answer: 2,
    },
    {
        question: 'What is 4 X 11?',
        choice1: '42',
        choice2: '40',
        choice3: '38',
        choice4: '44',
        answer: 4,
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (questionCounter === MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()