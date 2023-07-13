//https://opentdb.com/api.php?amount=10;

const url = "https://opentdb.com/api.php?amount=1";
const options = Array.from(document.querySelectorAll(".options li"));
const check_ans = document.getElementById("check_ans");
let Ques_no = 0, score = 0, correct_ans = "";


// window.addEventListener("load", fetchQs);
document.addEventListener("DOMContentLoaded", () => {
  fetchQs();
});


async function fetchQs() {
  const res = await fetch(`${url}`);
  const data = await res.json();
  // console.log(data.results[0]);
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

      const selectedElement = options.find((li) => li.classList.contains("selected"));
      
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

check_ans.addEventListener("click",checkAnswer);

function checkAnswer(){
  const selectedElement = options.find((li) => li.classList.contains("selected"));
  console.log(selectedElement.children[0].textContent.slice(3));
  
  
}
