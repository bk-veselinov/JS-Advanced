import { updateNav } from './app.js';
import { showView, host } from './dom.js';
import { showHome } from './home.js';


const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onRegister);
section.remove();


export function showRegister(){
    showView(section)
}

async function onRegister(e){
    e.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('repeatPassword').trim();

    if(!email || password.length < 6 || password !== rePass){
        alert('Password does not meet requirments');
        return;
    }
    try{
        const res  = await fetch(host + '/users/register', {
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        if(res.ok == false){
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            id: data._id,
            token: data.accessToken
        }))
        form.reset();
        updateNav();
        showHome();
    }catch(err){
        alert(err.message)
    }
}