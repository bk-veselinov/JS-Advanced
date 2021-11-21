import { cats } from "./catSeeder.js";
import {render, html} from "./node_modules/lit-html/lit-html.js"


const catSection = document.getElementById("allCats")
cats.map(c => c.info = false)


function catLi(cat) {
    const result = html ` 
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            ${cat.info ? html` 
                <button @click=${() => toggleInfo(cat)} class="showBtn">Hide status code</button>
                <div class="status" id="${cat.id}">
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>` : 
            html`
                <button @click=${() => toggleInfo(cat)} class="showBtn">Show status code</button>
            `}
            
        </div>
    </li>
    `
    return result
}

function toggleInfo(cat){
    cat.info = !cat.info
    update()
}
function update(){
    render(html`<ul>${cats.map(catLi)}</ul>`, catSection)
}

update()