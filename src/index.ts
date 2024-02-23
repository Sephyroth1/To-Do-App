import { sumBy } from 'lodash';
import './style.css';

type Task = {
	name: string,
	completed: boolean,
	createdAt: Date;
};

let tasks: Task[] = loadTasks();
const h1 = document.createElement('h1');
const ul = document.createElement('ul');
const li = document.createElement('li');
const form = document.createElement('form');
const input = document.createElement('input');
const submit = document.createElement('button');
var count = 1;
h1.textContent = "TO-DO APP";
h1.id = "heading";
ul.id = "list";
li.id = "forms";
form.id = "inputbutton";
input.id = "input";
input.placeholder = "Enter you name first";
submit.type = 'submit';
submit.id = 'sup';
submit.innerHTML = 'Add';
form.appendChild(input); 
form.appendChild(submit);
li.appendChild(form);
li.id = '1';
ul.appendChild(li);
document.body.appendChild(h1);
document.body.appendChild(ul);
document.addEventListener('DOMContentLoaded', (event) => {
	const tasks = loadTasks();
	const rembutton = document.getElementsByClassName("remove");
	tasks.forEach((task: Task) => {
		const li = addListItem(task);
		//li.dataset.taskName = task.name;
		ul.appendChild(li);
	})
	saveTasks(tasks);
	for(let i = 0; i < rembutton.length; i++){
		const button = rembutton[i];
		button.addEventListener('click', function(event){
			const target = event.target as HTMLElement;
			const li = target.closest("li");
			if(li){
				console.log("hello");
				const taskName = li.dataset.taskName;
				if(taskName){
					console.log("buttons of remove");
					removeTask(li, taskName);
				}
			}
		});
	}
});

form.addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  const newTask: Task = {
    name: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  const li = addListItem(newTask);
  console.log(newTask.name);
  ul.append(li);
  saveTasks(tasks);
});

function addListItem(task: Task): HTMLLIElement {
	const li = document.createElement('li');
	const checkbox = document.createElement('input');
	const label = document.createElement('label');
	var div = document.createElement('div');
	const rem = document.createElement('button');
	const edit = document.createElement('button');
	li.dataset.taskName = task.name;
	edit.classList.add('editTask');
	edit.innerHTML = "edit";
	edit.id = "try";
	rem.classList.add('remove');
	rem.innerHTML = "delete";
	count++;
	li.id = `${count}`;
	div.textContent = `Created a Task with the Title ${task.name} at the time ${task.createdAt}`;
	div.id = "temp";
	hide(div);
	checkbox.type = 'checkbox';
	checkbox.checked = task.completed;
	checkbox.addEventListener('change', () => {
		task.completed = checkbox.checked;
	})
	label.append(checkbox, task.name);
	li.append(label, div);
	li.append(rem, edit);
	li.classList.add("item")
	checkbox.classList.add("check")
	label.classList.add("taskName")
	div.classList.add("info")
	input.value = '';
	input.focus();
	return li;
}

 ul.addEventListener('click', function(event){
 	const target = event.target as HTMLElement;
 	if(target && target.matches('button.remove')){
 		const li = target.closest('li');
 		if(li){
 			console.log("am i  here?");
 			const taskName = li.dataset.taskName;
 			console.log(taskName);
 			if(taskName){
 				console.log("i am herea;sdlkfja")
 				removeTask(li, taskName);
 			}
 			else {
 				console.log("Task title not found");
 			}
 		}
 }
 	else if(target && target.matches('button.editTask')){
 		console.log("i am here");
 		const li = target.closest('li');
 		if(li){

 			const label = document.getElementById('try') as HTMLLabelElement;
 			const taskName = li.dataset.taskName;
 			if(taskName && label){
 				console.log("wow");
 				editTask(li, label, taskName);
 			}
 		}
 		else {
 			console.log("label not found");
 		}
 	}
 });

 function labelChange(label: HTMLLabelElement, name: string): void{
 		label.innerHTML = name;
 }

 function removeTask(li: HTMLLIElement, name: string): void {
	const tasks1: Task[] = tasks.filter(task => task.name !== name);
	saveTasks(tasks1);
	li.remove();
}

function editTaskName(name: string, prev: string){
	const index = tasks.find(task => task.name === prev);
	if(index){index.name = name;}
	saveTasks(tasks);
}

function hide(div: HTMLDivElement): void {
	setTimeout(function () {
		div.remove();
	}, 1000);
}


function saveTasks(tasks: Task[]): void {
	tasks = tasks.filter(task => task.name !== "");
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
	const taskstring = localStorage.getItem("tasks");
	return taskstring ? JSON.parse(taskstring) : [];
}

function editTask(li: HTMLLIElement,label: HTMLLabelElement, name: string) {
	console.log("i am here so");
	input.value = '';
	input.focus();
	input.placeholder = "Enter the name the task should have";
	submit.innerHTML = "change";
	const val = input.value;
	if(label){
		removeTask(li, name);
		label.innerHTML= val;
		editTaskName(val, name);
	}
	else {
		console.log(val);
		console.log("Label not found");
	}
}