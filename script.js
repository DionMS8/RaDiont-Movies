/* CREATING CONSTANTS FOR EACH API */
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

/* CREATING CONSTANTS FOR THE DOM ELEMENTS */

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

// INITIALLY ACCESSING THE MOVIES THROUGH THE API
getMovies(API_URL)

// CREATING AN ASYNC-AWAIT FUNCTION TO FETCH THE MOVIES 
async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

/* CREATING A FUNCTION TO DISPLAY THE MOVIES ON THE DOM */
function showMovies(movies) {
    main.innerHTML = " "

    /* USING THE forEach NATIVE FUNCTION TO ALLOW FOR THE ITERATOR ARROW FUNCTION WITHIN TO BE EXECUTED ON EACH ITEM WITHIN THE MOVIES ARRAY */
    movies.forEach((movie) => {

        const {title, poster_path, vote_average, overview} = movie

        const movieElement = document.createElement("div")
        movieElement.classList.add("movie")
        
        // CONSTRUCTING THE HTML FOR EACH MOVIE ELEMENT //
        movieElement.innerHTML = `
            <img src= "${IMG_PATH + poster_path}" alt="${title}">

            <div class="movie-description">
                <h3>${title}</h3>
                <span class = "${getClassByRate(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>        
        `
        // ADDING THE MOVIE ELEMENT TO THE 'MAIN' SECTION OF THE DOM //
        main.appendChild(movieElement)

    })
}

// CREATING A FUNCTION TO SORT MOVIES ACCORDING TO VOTE COUNT 
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}


// ADDING AN EVENT LISTENER FOR THE SEARCH FIELD 
form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    // CREATING A CONSTANT FOR THE USER INPUT IN THE SEARCH FIELD 
    const searchTerm = search.value

    if(searchTerm && searchTerm !== " ") {
        getMovies(SEARCH_API + searchTerm)
        
        search.value = " "

    } else {
        window.location.reload()
    }
})
