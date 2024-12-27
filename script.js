const inputBox = document.getElementById("input-box");
const litConstainers = document.getElementById("list-contents");

async function addTask() {
  if (inputBox.value === "") {
    // alert("you mst write something");
    return;
  }
  // else{
  //     let li = document.createElement("li");
  //     li.innerHTML = inputBox.value;
  //     litConstainers.appendChild(li);
  //     let span = document.createElement("span");
  //     span.innerHTML= "\u00d7"

  //     li.appendChild(span)
  // }
  // inputBox.value = '';
  // saveData();

  // call a post api
  await fetch("http://localhost:4000/add-task", {
    method: "POST",
    // Adding body or contents to send
    body: JSON.stringify({
      task: inputBox.value,
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  fetchTasks();
}

litConstainers.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", litConstainers.innerHTML);
}
function showTask() {
  //    litConstainers.innerHTML = localStorage.getItem("data");
}
showTask();

//* Fetch Task from API
const fetchTasks = async () => {
  const response = await fetch(`http://localhost:4000/get-tasks`);
  const result = await response.json();
  console.log("result", result.tasks);

  //clear litConstainers
  litConstainers.innerHTML = null;

  //fill up the litConstainers
  result.tasks.forEach((ele) => {
    let li = document.createElement("li");
    li.innerText = ele.name;
    litConstainers.appendChild(li);
  });
};

fetchTasks();

//git commands note
// git checkout -b <repo-name>     ----> create a new branch
// git checkout <repo-name>       -----> switch a existing branch

// after changes the , below steps are needed to push the code
/**
 * git add .
 * git commit -m "commit message"
 * git pull origin <main-branch>
 * git push origin <branch-name>
 * create pull request to the main branch
 */
//new changes from here
