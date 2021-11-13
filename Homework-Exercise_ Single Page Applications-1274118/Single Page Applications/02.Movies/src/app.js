import { host } from './dom.js';
import { showHome } from './home.js';
import { showLogin } from './login.js';
import { showRegister } from './register.js';


//navigation views
const views = {
    'homeLink' : showHome,
    'loginLink' : showLogin,
    'registerLink' : showRegister
}

//event to make the logout btn
document.getElementById('logoutBtn').addEventListener("click", onLogout);

//on nav click if view is in object views
const nav = document.querySelector('nav');
nav.addEventListener('click', (event) =>{
    const view = views[event.target.id];
    if(typeof view == 'function'){
        event.preventDefault();
        view()
    } 
})



//show proper items in navigation
updateNav()
// on init Start App 
showHome();

export function updateNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    if(userData != null){
        nav.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}`;
        [...nav.querySelectorAll('.user')].forEach(el => el.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(el => el.style.display = 'none');
    }else{
        [...nav.querySelectorAll('.user')].forEach(el => el.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(el => el.style.display = 'block');
    }
}

async function onLogout(event){
    event.preventDefault();
    event.stopImmediatePropagation();

    const {token} = JSON.parse(sessionStorage.getItem('userData'));

    await fetch(host + '/users/logout',{
        headers: {
            'X-Authorization' : token
        }
    })

    sessionStorage.removeItem('userData');
    updateNav();
    showLogin();

}

