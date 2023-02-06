//----------------------block to preserve scope b/w js files--------------------
{
  //---------below function attached to onload event of body.it loads all movie added in fav .
  function loadFavouriteMovies() {
    const resultGrid = document.querySelector("#result-grid");
    resultGrid.innerHTML = "";
    let movieArr = JSON.parse(localStorage.getItem("favMovies"));

    if (movieArr == null || movieArr == []) {
      resultGrid.innerHTML = "Nothing added to favourites ,start adding now";
    } else {
      movieArr.forEach(async (id) => {
        let movie = await searchMoviesWithID(id);
        renderFav(movie);
      });
    }
  }

  //below function is triggered when clicked on removefav button
  function removeFromFav(e) {
    let mov = e.parentNode.children[0].innerText.replace(/['"]+/g, "");
    //remove from localstorage
    let movieArray = JSON.parse(localStorage.getItem("favMovies"));

    movieArray.splice(movieArray.indexOf(mov), 1);
    localStorage.setItem("favMovies", JSON.stringify(movieArray));
    //remove from DOM
    document.querySelector(`#${mov}`).remove();
  }
  //it is called in loadFavouriteMovie() to render the movie in dom
  function renderFav(movie) {
    const resultGrid = document.querySelector("#result-grid");
    let card = document.createElement("div");
    card.classList.add("card");
    card.id = `${movie.imdbID}`;
    card.innerHTML = `<div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                        <img src="${movie.Poster}" class="img-fluid"/>
                        <a href="#!">
                        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                        </a>
                    </div>
                    <div class="card-body bg-dark text-white">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">Released : ${movie.Released}</p>
                        <p class="card-text">Runtime: ${movie.Runtime}</p>
                        <div class="d-flex">
                        
                        <label for="" data-movie ="abc" hidden>${JSON.stringify(
                          movie.imdbID
                        )}</label>
                            <a onclick="removeFromFav(this)" class="btn btn-primary w-50 m-2">Remove from fav 
                            <i class="far fa-star"></i></a>
                            <a href="/movieDetails.html?id=${
                              movie.imdbID
                            }" class="btn btn-primary w-50 m-2">Movie Details</a>
                        </div>
                        
                    </div>`;

    resultGrid.appendChild(card);
  }
}
