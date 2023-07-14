//https://opentdb.com/api.php?amount=10;

const url = "https://opentdb.com/api.php?amount=1";
const options = Array.from(document.querySelectorAll(".options li"));
const check_ans = document.getElementById("check_ans");
const play_again = document.getElementById("play_again");
const currentScore = document.querySelector(".correct_score");
const totalScore = document.querySelector(".total_question");
const result = document.querySelector(".result");

let Ques_no = 0,
  score = 0,
  askedCount = 0,
  correct_ans = "",
  total_Q = 10;

function eventListeners() {
  check_ans.addEventListener("click", checkAnswer);
  play_again.addEventListener("click", restartQuiz);
}

// window.addEventListener("load", fetchQs);
document.addEventListener("DOMContentLoaded", () => {
  fetchQs();
  eventListeners();
  currentScore.textContent = score;
  totalScore.textContent = total_Q;
});

async function fetchQs() {
  const selectedElement = options.find((li) =>
    li.classList.contains("selected")
  );
  if (selectedElement) {
    selectedElement.classList.remove("selected");
  }
  check_ans.disabled = false;
  result.innerHTML = "";

  const res = await fetch(`${url}`);
  const data = await res.json();

  formQ(data.results[0]);
}

function formQ(data) {
  Q = document.querySelector(".question");
  Q_no = document.querySelector(".question_no");
  category = document.querySelector(".category span");

  incorrect_ans = data.incorrect_answers;
  correct_ans = data.correct_answer;
  

  randomAppend(incorrect_ans, correct_ans);

  for (let i = 0; i < options.length; i++) {
    if (incorrect_ans.length == 2 && i > 1) {
      options[i].classList.add("none");
    } else {
      options[i].classList.remove("none");
      options[i].querySelector("p").innerHTML = `${i + 1}. ${incorrect_ans[i]}`;
    }
  }

  Q.innerHTML = data.question;
  Ques_no++;
  Q_no.innerText = `Q${Ques_no}.`;
  category.innerHTML = data.category;
  selectQ();
}

function selectQ() {
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedElement = options.find((li) =>
        li.classList.contains("selected")
      );

      if (selectedElement) {
        selectedElement.classList.remove("selected");
      }

      option.classList.add("selected");
    });
  });
}

function randomAppend(incorrect, correct) {
  const random_index = Math.floor(Math.random() * (incorrect.length + 1));
  incorrect.splice(random_index, 0, correct);
}



function checkAnswer() {
  check_ans.disabled = true;
  const selectedElement = options.find((li) =>
    li.classList.contains("selected")
  );

  if (selectedElement) {
    const textContent = selectedElement.children[0].textContent.slice(3);

    if (textContent == HTMLDecode(correct_ans)) {
      result.innerHTML = '<p><i class="fas fa-check "></i> Correct Answer!</p>';
      score++;
      
    } else {
      result.innerHTML = `<p><i class="fas fa-times"></i> Incorrect Answer!</p> <small><b>Correct Answer: ${correct_ans}</b></small>`;
    }
    checkCount();
  } else {
    check_ans.disabled = false;
    result.innerHTML =
      '<p><i class="fas fa-question"></i> Please select an option!</p>';
  }
}

function HTMLDecode(textString) {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

function checkCount() {
  askedCount++;
  setCount();
  if (askedCount == total_Q) {
    setTimeout(() => {
      console.log("");
    }, 5000);

    result.innerHTML += `<p>Your score is ${score}.</p>`;
    play_again.style.display = "block";
    check_ans.style.display = "none";
  } else {
    setTimeout(() => {
      fetchQs();
    }, 300);
  }
}

function setCount() {
  currentScore.textContent = score;
  totalScore.textContent = total_Q;
}

function restartQuiz(){
  score = askedCount = Ques_no=0;
  play_again.style.display = "none";
  check_ans.style.display = "block";
  check_ans.disabled = false;
  setCount();
  fetchQs();
}
