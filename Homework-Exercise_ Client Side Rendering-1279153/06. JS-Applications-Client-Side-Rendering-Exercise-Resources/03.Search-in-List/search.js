import { towns } from "./towns.js";
import {html, render} from "./node_modules/lit-html/lit-html.js"




function update(){
   render(html`
      <ul>
         ${townData.map(t => {
            return html`<li class=${t.match ? `active`: `` }>${t.name}</li>`
         })}
      </ul>   
   `, root)
}

function search(){
   let matches = 0
   const input = document.getElementById("searchText")
   const match = input.value.trim().toLocaleLowerCase()
   townData.forEach(town => {
      if(match && town.name.toLocaleLowerCase().trim().includes(match)){
         town.match = true
         matches ++
      }
      else{
         town.match = false
      }
   });
   result.textContent = `${matches} matches found`
   update()
}


const townData = towns.map(t => ({name: t, match: false}))
const root = document.getElementById("towns")
const searchBtn = document.querySelector("button")
const result = document.getElementById("result")
searchBtn.addEventListener("click", search)
update()