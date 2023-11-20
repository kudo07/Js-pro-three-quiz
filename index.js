const questions = [
  {
    question: "what is your Your Name?",
    answer: [
      { text: "Shark", correct: false },
      { text: "Idiot", correct: true },
      { text: "fish", correct: false },
      { text: "child", correct: false },
    ],
  },
  {
    question: "what is your Age",
    answer: [
      { text: "100", correct: false },
      { text: "99", correct: false },
      { text: "1", correct: false },
      { text: "-5", correct: true },
    ],
  },
  {
    question: "what is your nic name",
    answer: [
      { text: "Shark", correct: false },
      { text: "child", correct: false },
      { text: "fish", correct: false },
      {
        text: "satoru gojo",
        correct: true,
      },
    ],
  },
  {
    question: "what is the smallest continent in the world?",
    answer: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Brain", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "what is the largest desert in the world?",
    answer: [
      { text: "kalahari", correct: false },
      { text: "Gobi", correct: true },
      { text: "Sahara", correct: false },
      { text: "human", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "NEXT";
  showQuestion();
}
function showQuestion() {
  resetState();
  // console.log(currentQuestionIndex);
  let currentQuestion = questions[currentQuestionIndex];
  // console.log(currentQuestion);

  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((ans) => {
    const button = document.createElement("button");
    button.innerHTML = ans.text;
    console.log(button.innerHTML);

    button.classList.add("btn");
    answerButton.appendChild(button);
    if (ans.correct) {
      button.dataset.correct = ans.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;

  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
