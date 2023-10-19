const form = document.getElementById('ToDo-form');
const input = document.getElementById('ToDo-input');
const toDoList = document.getElementById('ToDo-list');
const doneList = document.getElementById('done-list');

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value !== ""){
        const toDoText = input.value;
        addToDoItem(toDoText);
        saveToDoItem(toDoText).then(()=>{
            input.value = "";
        }).catch(error => {
            console.error('Failed to save todo item:', error);
        });
    
    }
});

function addToDoItem(toDoText){
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const label = document.createElement('label');
    label.textContent = toDoText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', function() {
        li.remove();
        const id = li.id;
        deleteToDoItem(id).catch(error => {
            console.error('Failed to delete ToDo Item:', error);
        });
    });

    checkbox.addEventListener('change', function() {
        if(checkbox.checked) {
            const completedToDo = li.querySelector('label').textContent;
            li.remove();
            addDoneItem(completedToDo); 
        }
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendClid(deleteButton);
    li.id = Date.now().toString; //generates a unique id for each task

    return li;

}

function addDoneItem(todoText) {
    const li = document.createElement('li');
    const label = document.createElement('label');
    label.textContent = toDoText;

    li.appendChild(label);
    doneList.appendChild(li);
}

async function saveToDoItem(toDoText){
    try {
    
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
             },
             body: JSON.stringify({text: todoText}),
    });
    if(!response.ok){
        throw new Error('HTTP response error: ${response.status} ${response.statusText}');
    };
    } catch (error) {
        throw new Error('Failed to save ToDo Item: ${error}');
    }

}

async function deleteToDoItem(id){
    try {
        const response = await fetch('/api/todos/${id}', {method: 'DELETE'});
        if (!response.ok) {
            throw new Error('HTTP response error: ${response.status} ${response.statusText}');
        }
    } catch (error) {
        throw new Error ('Failed to delete ToDo Item: ${error}');
    }
}

async function loadToDoItems(){
    try {
        const response = await fetch('/api/todos');
        if(!response.ok){
            throw new Error('HTTP response error: ${response.status} ${response.statusText}');
        }
        const todos = await response.json();
        todos.forEach(todo => {
            const li = addToDoItem(todo.text);
            toDoList.appendChild(li);
        });
    }catch (error) {
        console.error('Failed to load ToDo Items:', error);
    }
    }

    const form = document.getElementById('ToDo-form');
    const input=document.getElementById('ToDo-input');
    const toDoList = document.getElementById('ToDo-list') ;
    const doneList = document.getElementById('done-list');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if(input.value !== "") {
            const toDoText=input.value;
            const li=addToDoItem(todoText);
            toDoList.appendChild(li);
            saveToDoItem(todoText).then(() => {
                input.value = "";
            }).catch(error => {
                console.error('Failed to save ToDo Item:', error);
            });
        }
    });

    loadToDoItems().catch(error => {
        console.error('Failed to load ToDo Items:', error)
    })
});