import { host, showView } from './dom.js';
import { showDetails } from './details.js';

const section = document.getElementById('edit-movie');
const form = section.querySelector('form');
form.addEventListener('submit', editMovie);
section.remove();


async function editMovie(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const id = formData.get('id');
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    if (title == '' || description == '' || img == '') {
        return alert('All fields are required!');
    }

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData.token == null) {
        return alert('You are not authorised!');
    }

    const response = await fetch(host + `/data/movies/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json' ,
            'X-Authorization': userData.token
        },
        body: JSON.stringify({ title, description, img }),
    });

    if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return 
    }

    event.target.reset();
    const data = await response.json();
    showDetails(data._id);
}

export async function showEdit(id){
    showView(section);

    const res = await fetch(host + `/data/movies/${id}`);
    const data = await res.json();
    
    section.querySelector('[name="id"]').value = data._id;
    section.querySelector('[name="title"]').value = data.title;
    section.querySelector('[name="description"]').value = data.description;
    section.querySelector('[name="imageUrl"]').value = data.img;
}
