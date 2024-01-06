let allLi=document.getElementById("tasks")
let submitBtn=document.getElementById("submit")
let taskInput=document.getElementById("newTask")
let erreurMessage=document.getElementById("error-message")
let url = "http://127.0.0.1:3000/tasks";

console.log(submitBtn);
let loadQuestion = () => {
    let xhr = new XMLHttpRequest()
    xhr.open("get", url, true)
    xhr.addEventListener("load", () => {
       console.log(xhr.status);
       if (xhr.status == 201){
        let data = JSON.parse(xhr.response);
       data.forEach(ele => ajouteTask(ele));

       }
       else {
        alert(xhr.response);
      }
 
    })
    xhr.addEventListener("error", () => {
    
       alert("9awdtiha")
    })
 
    xhr.send();
 }; 
 
  loadQuestion();
 
 
 
let ajouteTask=(data)=>{


    let taskLi=document.createElement("li")
    let completedSpan=document.createElement("span")
    let checkBtn=document.createElement("button")
    let editBtn=document.createElement("button")
    let deleteBtn=document.createElement("button")
    let editDiv=document.createElement("div")
    let inputEdite=document.createElement("input")
    let confirmeEdite=document.createElement("button")
    let cancelEdite=document.createElement("button")

    allLi.appendChild(taskLi)
    console.log(taskLi);
    
    taskLi.appendChild(checkBtn)
    taskLi.appendChild(completedSpan)
    taskLi.appendChild(editBtn)
    taskLi.appendChild(deleteBtn)

    editDiv.appendChild(inputEdite)
    editDiv.appendChild(confirmeEdite)
    editDiv.appendChild(cancelEdite)

    completedSpan.innerText=data.task
    editBtn.innerText="edite"
    deleteBtn.innerText="delet"

    confirmeEdite.innerText="confirmer"
    cancelEdite.innerText="cancel"
    
    taskLi.classList.add("task-item")
    checkBtn.classList.add("check-task-btn")
    completedSpan.classList.add("task-text")
    editBtn.classList.add("edit-task-btn")
    deleteBtn.classList.add("delete-task-btn")

    let uploadConfirm=data.completedOrNot
    if(uploadConfirm==false)
    completedSpan.classList.add("pending")
    else
    completedSpan.classList.add("completed")

    deleteBtn.addEventListener("click",()=>{
        const xhr = new XMLHttpRequest();
        xhr.open("delete", url + "/" + data.id, true);
        xhr.addEventListener("load", () => {
            console.log(xhr.status);
          if (xhr.status == 200) {
            taskLi.remove();
          } else {
            alert(xhr.response);
          }
        });
        xhr.addEventListener("error", () => {
          alert("error");
        });
        xhr.send();
    })
    checkBtn.addEventListener("click",()=>{
        const xhr = new XMLHttpRequest();
        xhr.open("put", url + "/" + data.id, true);
        xhr.setRequestHeader("Content-Type","application/json")
        xhr.addEventListener("load", () => {
            console.log("hna  ",xhr.status);
          if (xhr.status != 201) return alert("error" + xhr.response);
            completedOrNot.classList.toggle("true")
            completedOrNot.classList.toggle("false")
        });
        xhr.addEventListener("error", () => {
          alert("error");
        });
        let dataPutToSend = {
           task:data.task,
            completedOrNot:!data.completedOrNot
        }
        xhr.send(JSON.stringify(dataPutToSend))
      });



}

submitBtn.addEventListener("click",()=>{ 
    let taskValue = taskInput.value;
    let completedValue  = false;
    let taskToSend = {
      task: taskValue,
      completedOrNot: completedValue,
    };
    taskToSend = JSON.stringify(taskToSend);
    const xhr = new XMLHttpRequest();
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
      if (xhr.status == 201) {
        let data = JSON.parse(xhr.response);
        ajouteTask(data);
        taskInput.value = "";
      } else {
        alert(xhr.response);
      }
    });
    xhr.addEventListener("error", () => {
      alert("error");
    });
    xhr.send(taskToSend);
     


  });





