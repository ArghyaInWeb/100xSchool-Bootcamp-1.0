const inputTodo = document.getElementById("new-todo")
const addTodo = document.getElementById("add-todo")


addTodo.addEventListener('click', () => {
    const newDiv = document.createElement('div')
    newDiv.innerText = inputTodo.value

    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = "Delete"
    
    document.querySelector("body").appendChild(newDiv)
    newDiv.appendChild(deleteBtn)
    inputTodo.value = ""

    deleteBtn.addEventListener('click', () => {
        const getTodo = deleteBtn.parentElement
        getTodo.remove()
    })
})