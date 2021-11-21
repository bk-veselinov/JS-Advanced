import {render, html} from "./node_modules/lit-html/lit-html.js"

function bookRow(b){
    return html`
        <tr>
            <td>${b.title}</td>
            <td>${b.author}</td>
            <td id=${b._id}>
                <button @click=${onEdit}>Edit</button>
                <button @click=${onDelete}>Delete</button>
            </td>
        </tr>
    `
}

async function loadBooks(){
    try{
        const url = "http://localhost:3030/jsonstore/collections/books"
        const res = await fetch(url)
        const data = await res.json()
        const keys = Object.keys(data)
        const books = Object.values(data)
        books.forEach(book => {
            book._id = keys[books.indexOf(book)]
        })
        render(books.map(b => bookRow(b)), root)


    }catch(error){
        alert(error)
        console.log(error)
    }
    
}

async function onAdd(e){
    e.preventDefault()
    const formData = new FormData(addForm)
    const newBook = {
        author: formData.get("author"),
        title: formData.get("title")
    }
    try{
        const url = "http://localhost:3030/jsonstore/collections/books"
        const res = await fetch(url, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(newBook)
        }
        )
        loadBooks()
    }catch(error){
        alert(error)
        console.log(error)
    }finally{
        addForm.reset()
    }

}

function onEdit(e){
    editForm.style.visibility = "visible"
    addForm.style.visibility = "hidden"
    editForm.setAttribute("id", e.target.parentElement.getAttribute("id"))
    editForm.querySelector("h3").textContent = "Edit book - "+ e.target.parentElement.previousElementSibling.previousElementSibling.textContent
}

async function onEditSubmit(e){
    e.preventDefault()
    const formData = new FormData(editForm)
    const newBook = {
        author: formData.get("author"),
        title: formData.get("title")
    }
    const id = e.target.getAttribute("id")
    try{
        const url = `http://localhost:3030/jsonstore/collections/books/${id}`
        const res = await fetch(url, {
            'method': 'PUT',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(newBook)
        }
        )
        loadBooks()
    }catch(error){
        alert(error)
        console.log(error)
    }finally{
        addForm.style.visibility = "visible"
        editForm.style.visibility = "hidden"
        e.target.setAttribute("id", "")
        editForm.reset()
    }
}


async function onDelete(e){
    const id = e.target.parentElement.getAttribute("id")
    try{
        const url = `http://localhost:3030/jsonstore/collections/books/${id}`
        const res = await fetch(url, {
            'method': 'DELETE'
        })
        loadBooks()
    }catch(error){
        alert(error)
        console.log(error)
    }
}

document.getElementById("loadBooks").addEventListener("click", loadBooks)
const root = document.querySelector("tbody")
const addForm = document.getElementById("add-form")
const editForm = document.getElementById("edit-form")
editForm.style.visibility = "hidden"
addForm.addEventListener("submit", onAdd)
editForm.addEventListener("submit", onEditSubmit)