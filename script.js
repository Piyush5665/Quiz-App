const url = "https://opentdb.com/api.php?amount=10";

window.addEventListener("load", fetchNews);

options = Array.from(document.querySelectorAll(".options p"));

async function fetchNews() {
  const res = await fetch(`${url}`);
  const data = await res.json();
  console.log(data.results);
  formQ(data.results, 0);
}

function formQ(array, index) {
  Q = document.querySelector(".question");
  Q_no = document.querySelector(".question_no");
  category = document.querySelector(".category span");
  

  incorrect_ans = array[index].incorrect_answers;
  correct_ans = array[index].correct_answer;
  randomAppend(incorrect_ans, correct_ans);

  for (let i = 0; i < options.length; i++) {
    if (incorrect_ans.length == 2 && i > 1) {
      options[i].closest("li").classList.add("none");
    } 
    else {
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

options.forEach((option) => {
    option.addEventListener("click", () => {
        option.closest("li").classList.add("selected");
    });
  });
  
