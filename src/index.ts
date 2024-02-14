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
		li.dataset.taskName = task.name;
		ul.appendChild(li);
	})
	saveTasks(tasks);
	for(let i = 0; i < rembutton.length; i++){
		const button = rembutton[i];
		button.addEventListener('click', function(event){
			const target = event.target as HTMLElement;
			const li = target.closest("li");
			if(li){
				const taskName = li.dataset.taskName;
				if(taskName){
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
  ul.append(li);
  saveTasks(tasks);
});

function addListItem(task: Task): HTMLLIElement {
	const li = document.createElement('li');
	const checkbox = document.createElement('input');
	const label = document.createElement('label');
	const div = document.createElement('div');
	const rem = document.createElement('button');
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
	li.append(rem);
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
 			const taskName = li.dataset.taskName;
 			if(taskName){
 				removeTask(li, taskName);
 			}
 		}
 	}
 });

 function removeTask(li: HTMLLIElement, name: string): void {
	const tasks1: Task[] = tasks.filter(task => task.name !== name);
	saveTasks(tasks1);
	li.remove();
}

function hide(div: HTMLDivElement): void {
	setTimeout(function () {
		div.remove();
	}, 1000);
}

function saveTasks(tasks: Task[]): void {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
	const taskstring = localStorage.getItem("tasks");
	return taskstring ? JSON.parse(taskstring) : [];
}