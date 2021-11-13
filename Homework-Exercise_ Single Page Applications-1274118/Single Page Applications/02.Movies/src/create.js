import { host, showView } from './dom.js';
import { showDetails } from './details.js';

const section = document.getElementById('add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onCreate);
section.remove();


async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    if (title == '' || description == '' || img == '') {
        alert('All fields are required!');
        return
    }
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    

    const response = await fetch(host + `/data/movies`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json' ,
            'X-Authorization': userData.token
        },
        body: JSON.stringify({ title, description, img }),
    });

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    event.target.reset();
    const data = await response.json();
    showDetails(data._id);
}



export function showCreate(){
    showView(section)
}