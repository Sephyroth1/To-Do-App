export type Task = {
	name: string,
	completed: boolean,
	createdAt: Date;
};
export const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);
var count = 1;

export default function addListItem(task: Task): HTMLLIElement {
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
	console.log(task);
	label.append(checkbox, task.name);
	li.append(label, div);
	li.append(rem);
	tasks.push(task);
	return li;
}

export function removeTask(li: HTMLLIElement, name: string): void {
	tasks.filter(task => task.name !== name);
	localStorage.setItem("tasks", JSON.stringify(tasks));
	li.remove();
}

function hide(div: HTMLDivElement): void {
	setTimeout(function () {
		div.remove();
	}, 1000);
}

export function saveTasks(): void {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks(){
	const taskstring = localStorage.getItem("tasks");
	return taskstring ? JSON.parse(taskstring) : [];
}
