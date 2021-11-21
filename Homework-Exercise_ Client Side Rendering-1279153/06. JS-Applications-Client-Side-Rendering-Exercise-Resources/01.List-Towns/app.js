import {html, render} from `node_modules/lit-html/lit-html.js`

const root = document.getElementById("root")

const listTemplate = (towns) => html`
<ul>
    ${towns.map(town => html`<li>${town}</li>`)}
</ul>
`
document.querySelector(`form`).addEventListener('submit', (event) => {
    event.preventDefault()
    const towns = document.getElementById("towns").value.split(',').map(town => town.trim())
    const result = listTemplate(towns)
    render(result, root)
})

