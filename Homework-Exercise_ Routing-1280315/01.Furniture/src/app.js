import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { page, render } from './lib.js';
import { logout } from './api/data.js';
import { getUserData } from './util.js';

const root = document.querySelector('div.container');
const logoutBtn = document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page(decorateContext)
page('/', catalogPage)
page('/details/:id', detailsPage)
page('/create', createPage)
page('/edit/:id', editPage)
page('/login', loginPage)
page('/register', registerPage)
page('/my-furniture', catalogPage);

page.start()

updateUserNav()

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateUserNav = updateUserNav

    next()
}

function updateUserNav() {
    const userData = getUserData()
    if (userData) {
        document.querySelector('#user').style.display = 'inline-block'
        document.querySelector('#guest').style.display = 'none'
    } else {
        document.querySelector('#user').style.display = 'none'
        document.querySelector('#guest').style.display = 'inline-block'

    }
}

async function onLogout() {
    await logout()
    updateUserNav()
    page.redirect('/')
}