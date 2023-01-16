const tasks =[]; //Un arreglo donde se iran guardando las tareas que queramos realizar
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector('#bAdd'); //Convertirmos en variables a los elementos de html utilizando el id 
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('#time #taskName');

renderTime();
renderTasks();


form.addEventListener('submit', e => {
    e.preventDefault();//Esto es para evitar que se envìe el formulario vacio y a continuacion validamos si es que se encuentra vacio o no
    if(itTask.value != ""){  //Si es diferente de un valor vacio se genera la tarea
        createTask(itTask.value);
        mostrartarea(itTask.value);
        itTask.value = "";
    }
   
    renderTasks(); //Esta funcion declarada mas abajo va a realizar codigo html de acuerdo con las tareas ingresadas

})

function createTask(value){
    const newTask = {
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false,
    };
    tasks.unshift(newTask);
}


function mostrartarea(value){
    taskName.textContent = value;
}


function renderTasks(){

    const html = tasks.map(task => { // Map sirve para iterar sobre cada uno de los elementos del arreglo y generar una funcion, en este caso para generar codigo html
        return `
        <div class="task" id ="tarea">
            <div class="completed" id = "tareac"> ${
                task.completed
                ? `<div class="title" id="titulotarea">${task.title}</div>`
                : `<button class="start-button" id="iniciar" data-id = "${task.id}">START</button>`
            }</div>
        </div>
        `;
    });

    const taskContainer = document.querySelector("#tasks");
    taskContainer.innerHTML = html.join(""); //Revisar alternativa en el libro pq no recomendaban usarlo pero no recuerdo pq XD 

    const startButtons = document.querySelectorAll('.task .start-button');

    startButtons.forEach(button => {
        button.addEventListener('click', e=>{
            if(!timer){
                const id = button.getAttribute('data-id');
                startButtonHandler(id);
                button.textContent= "En progreso...";
            }
        });
    });
}

function startButtonHandler(id){
    time = 5;
    //time = 25 * 60;
    current = id;
    const taskIndex = tasks.findIndex(task => task.id == id);
    taskName.textContent = tasks[taskIndex].title;
   
    timer = setInterval(() => {
        timeHandler(id);
    }, 1000);

  
}

function timeHandler(id){
    time--;
    renderTime();

       
    if(time == 0){
        clearInterval(timer);
        // current = null;
        // taskName.textContent = " ";
        markCompleted(id);
        renderTasks();
        timer = null;
        starBreak();

    }

}

function renderTime(){
    const timeDiv = document.querySelector("#time #value");
    const minutes = parseInt(time/60);
    const seconds = parseInt(time%60);
    timeDiv.textContent = `${minutes < 10 ? '0' : ""} ${minutes}:${seconds < 10 ? '0' :''} ${seconds}`;
}

function markCompleted(id){
    const taskIndex = tasks.findIndex(task => task.id == id);
    tasks[taskIndex].completed = true;
}

function starBreak(){
    //time = 5*60
    time = 5;
    taskName.textContent = "Break";
    timerBreak = setInterval(() => {
        timeBreakHandler();
    },1000);
}

function timeBreakHandler(){
    time--;
    renderTime();
         
    if(time == 0){
        clearInterval(timerBreak);
        // current = null;
        // taskName.textContent = " ";
        current = null;
        taskName.textContent = '';
        renderTasks();
        timerBreak = null;
    }
}
