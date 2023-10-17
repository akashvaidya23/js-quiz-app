const questions = [{
  question: "Which is the largest animal in the world ?",
  answers: [
    {
      text: "Shark", correct: "false"
    },
    {
      text: "Blue Whale", correct: "true"
    },
    {
      text: "Elephant", correct: "false"
    },
    {
      text: "Giraffe", correct: "false"
    }
  ]
},
{
  question: "What is the Capital of India ?",
  answers: [
    {
      text: "Mumbai", correct: "false"
    },
    {
      text: "New Delhi", correct: "true"
    },
    {
      text: "Kolkatta", correct: "false"
    },
    {
      text: "Chennai", correct: "false"
    }
  ]
},
{
  question: "Which is the largest continent in the world ?",
  answers: [
    {
      text: "Asia", correct: "true"
    },
    {
      text: "Africa", correct: "false"
    },
    {
      text: "Europe", correct: "false"
    },
    {
      text: "Australia", correct: "false"
    }
  ]
},
{
  question: "What is the national animal of India ?",
  answers: [
    {
      text: "Tiger", correct: "false"
    },
    {
      text: "Lion", correct: "true"
    },
    {
      text: "Fox", correct: "false"
    },
    {
      text: "Elephant", correct: "false"
    }
  ]
},
{
  question: "What is the largest desert in the world ?",
  answers: [
    {
      text: "Thar", correct: "false"
    },
    {
      text: "Australia", correct: "false"
    },
    {
      text: "Sahara", correct: "true"
    },
    {
      text: "Indian Desert", correct: "false"
    }
  ]
}];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let nextElement = document.getElementsByClassName("next-buttons");
nextElement = nextElement[0];

const result = document.querySelector('#result');

let currentQuestionIndex = 0;
let score = 0;

const renderQuestion = (currentQuestionIndex) => {
  // console.log("Rendering question");
  let buttons = document.querySelectorAll(".btn");
  buttons = Array.from(buttons);
  // console.log(buttons);
  questionElement.innerHTML = questions[currentQuestionIndex].question;
  questionElement.style.display = "block";
  result.innerHTML = "";
  let resetBtn = document.querySelector(".reset-buttons");
  if(resetBtn){
    resetBtn.style.display = "none";
  }
  let span = document.querySelector('.score');
  if(span){
    span.style.display = "none";
  }
  answerButtonsElement.style.display = "block";
  nextElement.style.display = "block";
  document.querySelector(".quiz").style.display = "block";
  buttons.map((button, index) => {
    button.innerText = questions[currentQuestionIndex].answers[index].text;
    button.removeAttribute("disabled");
    button.style.color = "#000";
    button.style.backgroundColor = "#fff";
    button.style.display= "block";
  });
  // console.log("Rendered questions");
}

renderQuestion(currentQuestionIndex);

let buttons = document.querySelectorAll(".btn");
buttons = Array.from(buttons);
buttons.map((button) => {
  button.addEventListener("click", function() {
    let answers = questions[currentQuestionIndex].answers;
    let correctAnswer = answers.filter((answer) => {
      return answer.correct === "true";
    });
    correctAnswer = correctAnswer[0].text;
    let selectedOption = this.innerHTML;
    if (correctAnswer == selectedOption) {
      score = score + 1;
      result.innerText = "Correct Answer";
      result.style.color = "green";
      button.style.backgroundColor = "Green";
      button.style.color = "white";
      buttons.map((button) => {
        button.setAttribute("disabled", "true");
      });
    } else {
      score = score;
      result.innerText = "Wrong Answer";
      result.style.color = "red";
      button.style.backgroundColor = "red";
      button.style.color = "white";
      buttons.map((button) => {
        if (button.innerText == correctAnswer) {
          button.style.backgroundColor = "Green";
          button.style.color = "white";
        }
        button.setAttribute("disabled", "true");
      });
    }
    currentQuestionIndex = currentQuestionIndex + 1;
    nextElement.style.display = 'block';
  });
});

nextElement.addEventListener("click", () => {
  if (currentQuestionIndex <= questions.length - 1) {
    renderQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
});

const endQuiz = () => {
  document.querySelector(".quiz").style.display = "none";
  answerButtonsElement.style.display = "none";
  nextElement.style.display = "none";
  result.style.display = "none";
  let app = document.querySelector('.app');
  let span = document.createElement('span');
  span.setAttribute("class","score")
  span.innerText = `Your score is ${score}`;

  let button = document.createElement('button');
  button.setAttribute("class", "reset-buttons");
  button.addEventListener("click", resetQuiz);
  button.innerText = "Reset";
  app.appendChild(span);
  app.appendChild(button);
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  renderQuestion(currentQuestionIndex);
  alert("reset button");
}