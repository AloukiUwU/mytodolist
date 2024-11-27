class Task {
    constructor(name){
        this.id = Math.floor(Math.random() * 1000);
        this.name = name;
        this.state = false;
    }
}

class ToDoList {

    constructor(){
        this.tasks = [];
        this.doneTasks = [];
    }

    update(){
        //Updates the frontend display of the tasks
        var doneCount = 0;
        var notDoneCount = 0;
        var taskRatio = document.getElementById("taskRatio");
        var taskHeader = document.getElementById("taskHeader");
        var taskList = document.getElementById("taskList");
        var doneTaskHeader = document.getElementById("doneTaskHeader");
        var doneTaskList = document.getElementById("doneTaskList");
        var emptyBtn = document.getElementById("emptyBtn");
        
        taskList.innerHTML = "";
        doneTaskList.innerHTML = "";

        if(this.tasks.length > 0){
            //Afficher le header des taches non faites et leur liste
            taskHeader.innerText = "Taches a faire";

            this.tasks.forEach(task => {
                notDoneCount++;
                taskList.innerHTML += `<li id="${task.id}"><input type="checkbox" id="${task.id}_check" onchange=checkChanged(${task.id})>${task.name} <button onclick=removeTask(${task.id})>Supprimer</button>
                </li>`;
            });
        }
        else {
            taskHeader.innerText = "";
        }

        if(this.doneTasks.length > 0){
            //Afficher le header des taches faites et leur liste
            doneTaskHeader.innerText = "Taches faites";

            this.doneTasks.forEach(task => {
                doneCount++;
                doneTaskList.innerHTML += `<li id="${task.id}"><input type="checkbox" id="${task.id}_check" onchange=checkChanged(${task.id}) checked/>${task.name} <button onclick=removeTask(${task.id})>Supprimer</button>
                </li>`;
            });
        }
        else {
            doneTaskHeader.innerText = "";
        }

        if(doneCount > 0 || notDoneCount > 0){
            taskRatio.innerText = `Total Ratio : ${doneCount}/${doneCount+notDoneCount}`
            emptyBtn.disabled = false;
        }
        else {
            taskRatio.innerText = "";
            emptyBtn.disabled = true;
        }
    }

    empty(){
        this.tasks = [];
        this.doneTasks = [];
        this.update();
    }

    remove(task){
        //Removes a task from the list.
        var id;
        if(task.state === false){
            id = this.tasks.indexOf(task);
            this.tasks.splice(id, 1);
        } 
        else {
            id = this.doneTasks.indexOf(task);
            this.doneTasks.splice(id, 1);
        }
        this.update();
    }

    add(name){
        //Checks if taks with same name exists
        var exists = false;
        this.tasks.forEach(task => {
            if(task.name === name){
                exists = true;
            }
        });
        this.doneTasks.forEach(task => {
            if(task.name === name){
                exists = true;
            }
        });

        if(exists === false){
            //Add the entered task to the list
            this.tasks.push(new Task(name));
            document.getElementById("taskTitle").value = "";
            this.update();
        }
        else {
            if (confirm("Une tache avec le meme nom existe deja. Souhaitez-vous quand meme l'ajouter ?")) 
            {
                this.tasks.push(new Task(name));
                document.getElementById("taskTitle").value = "";
                this.update();
            } 
        }
    }

    addByObj(task){
        if(task.state === true){
            //Add to doneTasks
            this.doneTasks.push(task);
        }
        else {
            //Add to tasks
            this.tasks.push(task);
        }
    }
}

function removeTask(id){
    var task = new Task();
    toDoList.tasks.forEach(elmt => {
        if(elmt.id === id) task = elmt;
    });

    if(task.name === undefined){
        toDoList.doneTasks.forEach(elmt => {
            if(elmt.id === id) task = elmt;
        });
    }

    toDoList.remove(task);
}

function emptyTasks(){
    toDoList.empty();
}

function checkChanged(id){
    //1. Find task object
    var task = new Task();
    toDoList.tasks.forEach(elmt => {
        if(elmt.id === id) task = elmt;
    });
    
    if(task.name === undefined){
        toDoList.doneTasks.forEach(elmt => {
            if(elmt.id === id) task = elmt;
        });
    }



    if(document.getElementById(id+"_check").checked)
    {
        //Has been checked

        //2. Remove from "tasks"
        toDoList.remove(task);

        //3. Set state to done
        task.state = true;

        //4. Add to "doneTasks"
        toDoList.addByObj(task);
    }
    else
    {
        //Has been unchecked
        
        //2. Remove from "doneTasks"
        toDoList.remove(task);

        //3. Set state to not done
        task.state = false;

        //4. Add to "tasks"
        toDoList.addByObj(task);
    }
    toDoList.update();
}

var toDoList= new ToDoList();
document.getElementById("addTaskForm")
.addEventListener("submit", function (event) {
 event.preventDefault(); // Previent la soumission 'normale' du formulaire
const name = document.getElementById("taskTitle").value;
toDoList.add(name);
});
toDoList.update();