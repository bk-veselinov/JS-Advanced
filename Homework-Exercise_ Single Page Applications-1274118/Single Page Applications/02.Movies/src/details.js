import { host, showView, e } from './dom.js';
import { showEdit } from './edit.js';
import { showHome } from './home.js';

const section = document.getElementById('movie-details')
section.remove();


export function showDetails(movieId){
    showView(section);
    getMovie(movieId);
}


async function getMovie(id){
    //fancy loading
    section.replaceChildren(e('p', {}, 'Loading...'));

    const requests = [
        fetch(host + '/data/movies/' + id),
        fetch(host + `/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
    ]


    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData != null){
        requests.push(fetch(host + `/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userData.id}%22 `));
    }

    const [movieRes, likesRes, hasLikedRes] = await Promise.all(requests)
    const [movieData, likes, hasLiked] = await Promise.all([
        movieRes.json(),
        likesRes.json(),
        hasLikedRes && hasLikedRes.json()
    ])


    section.replaceChildren(createDetails(movieData, likes, hasLiked));
}

function createDetails(movie, likes, hasLiked){
    const controls = e('div', { className: 'col-md-4 text-center' },
        e('h3', { className: 'my-3' }, 'Movie Description'),
        e('p', {}, movie.description)
    );
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData != null){
        if(userData.id == movie._ownerId){
            controls.appendChild(e('a', { className: 'btn btn-danger', href: '#', onClick: (e) => onDeleteMovie(e, movie._id) }, 'Delete'));
            controls.appendChild(e('a', { className: 'btn btn-warning', href: '#', onClick: () => showEdit(movie._id) }, 'Edit'));
        }else{
            if(hasLiked.length > 0){
                controls.appendChild(e('a', { className: 'btn btn-primary', href: '#', onClick: onUnlike}, 'Unlike'));
            }else{
                controls.appendChild(e('a', { className: 'btn btn-primary', href: '#', onClick: onLike}, 'Like'));
            }
        }
    }

    const likesSpan = e('span', { className: 'enrolled-span' }, `Liked ${likes}`);
    controls.appendChild(likesSpan);


    const element = e('div', {className: 'container'},
        e('div', {className: 'row bg-light text-dark'},
            e('h1', {}, `Movie title: ${movie.title}`),
            e('div', {className: 'col-md-8'},
                e('img', {className: 'img-thumbnail', src: movie.img, alt: 'Movie'})
            ),
            controls
        )
    )

    async function onLike(){
        const res = await fetch(host + `/data/likes`,{
            method: 'post',
            headers: {
                'Content-Type' : 'application/json',
                'X-Authorization' : userData.token
            },
            body : JSON.stringify({
                movieId : movie._id
            })
        })
        showDetails(movie._id)
    }

    async function onUnlike(){
        const likeId = hasLiked[0]._id;

        const res = await fetch(host + `/data/likes/${likeId}`,{
            method: 'delete',
            headers: {
                'X-Authorization' : userData.token
            }
        })
        showDetails(movie._id)
    }

    return element
}


async function onDeleteMovie(event, id) {
    event.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem('userData'));


    
    const response = await fetch(host + `/data/movies/${id}`, {
        method: 'delete',
        headers: { 
            'X-Authorization': userData.token
        },
    });

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    showHome();

}
