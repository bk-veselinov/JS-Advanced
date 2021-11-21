const { html } = require("lit-html")

async function load(){
    try{
        const url = "http://localhost:3030/jsonstore/advanced/dropdown"
        const promise = await fetch(url)
    
        if(promise.ok != true){
            throw new Error(await promise.json())
        }
    
        const data = await promise.json()
    
        render(html`${data.map(o => {
            html`<option value=${o._id}>${o.text}</option>`
        })}`, root)

    }catch(error){
        alert(error)
    }      
}

const root = document.getElementById("menu")
const form = document.querySelector("form")

load()

form.addEventListener("submit", onSubmit)

async function onSubmit(event){
    event.preventDefault()
    const input = event.target.querySelector("#itemText").value.trim()
    if (input != ""){
        try{
            const url = "http://localhost:3030/jsonstore/advanced/dropdown"
            const promise = await fetch(url, {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                }, 
                'body':  JSON.stringify(input)
            })

        }catch(error){
            alert(error)
        }      
    }
    load()
}