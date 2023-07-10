const url = "https://opentdb.com/api.php?amount=10";

window.addEventListener("load", fetchQs);

const options = Array.from(document.querySelectorAll(".options p"));
const check_ans = document.getElementById("check_ans");
const index=0;
const score=0;

async function fetchQs(index) {
  const res = await fetch(`${url}`);
  const data = await res.json();
  formQ(data.results, index);
}

function formQ(array, index) {
  Q = document.querySelector(".question");
  Q_no = document.querySelector(".question_no");
  category = document.querySelector(".category span");

  incorrect_ans = array[index].incorrect_answers;
  correct_ans = array[index].correct_answer;
  ans_correct(correct_ans);
  randomAppend(incorrect_ans, correct_ans);

  for (let i = 0; i < options.length; i++) {
    if (incorrect_ans.length == 2 && i > 1) {
      options[i].closest("li").classList.add("none");
    } else {
      options[i].closest("li").classList.remove("none");
      options[i].innerHTML = `${i + 1}. ${incorrect_ans[i]}`;
    }
  }

  Q.innerHTML = array[index].question;
  Q_no.innerText = `Q${index + 1}`;
  category.innerText = array[index].category;
}

function randomAppend(incorrect, correct) {
  const random_index = Math.floor(Math.random() * (incorrect.length + 1));
  incorrect.splice(random_index, 0, correct);
}

let currentNav = null;
function onNavItem(id) {
  const navItem = document.getElementById(id);
  currentNav?.classList.remove("selected");
  currentNav = navItem;
  currentNav?.classList.add("selected");
}

check_ans.addEventListener("click",ans_correct);

// function ans_correct(correct_ans) {
//     selected = document.querySelector(".options ul .selected p");
//     if (!selected) return;
//     if(selected.innerText==correct_ans){
//         score++;
//         fetchQs(index+1);
//     }

// }

