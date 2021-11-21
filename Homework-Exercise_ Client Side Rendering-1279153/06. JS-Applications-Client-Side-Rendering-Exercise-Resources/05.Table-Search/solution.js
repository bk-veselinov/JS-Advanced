import {html, render} from "./node_modules/lit-html/lit-html.js"

document.querySelector('#searchBtn').addEventListener('click', onClick);
const root = document.querySelector("tbody")
const inputField = document.getElementById("searchField")

function row(s){
      return html`
         <tr id=${s._id} class=${s.selected ? "select": ""}>
            <td>${s.firstName + " " + s.lastName}</td>
            <td>${s.email}</td>
            <td>${s.course}</td>
         </tr>`

}

async function load(){
   try{
      const url = "http://localhost:3030/jsonstore/advanced/table"
      const promise = await fetch(url)
      const data = await promise.json()
      const values = Object.values(data)
      values.map(v=> v.selected = false)
      render(values.map(v => row(v)), root)

   }catch(error){
      console.log(error)
      alert(error)
   }
}

async function onClick() {
   try{
      const url = "http://localhost:3030/jsonstore/advanced/table"
      const promise = await fetch(url)
      const data = await promise.json()
      const values = Object.values(data)
      const input = inputField.value.toLowerCase().trim()


      function match(x){
         
         const properties = Object.values(x)
         properties.pop()
         const name = (properties.shift() + " " + properties.shift())
         properties.unshift(name)
         for(let i in properties){
            let value = properties[i]
            if (value.toLowerCase().trim().includes(input)){
               x.selected = true
               break
            }
            else{
               x.selected = false
            }
         }
      }

      values.map(v=> match(v))
      render(values.map(v => row(v)), root)
      inputField.value = ""
   }catch(error){
      console.log(error)
      alert(error)
   }
}


load()