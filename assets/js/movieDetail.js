const APIKEY = "8850ebe7";
// ------------------async function to search movie with title and return data -------------
async function searchMoviesWithID(id) {
  //hit the api with ID and return results
  const URL = `http://www.omdbapi.com/?i=${id}&plot=full&apikey=${APIKEY}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if (data.Response == "True") {
    return data;
  }
}

//----------------------block to preserve scope b/w js files--------------------
{
  //below function is attached to onload event listener, whenever the page body loads below function runs
  function showDetail() {
    (async function () {
      movieDetailContainer = document.querySelector("#detail-container");
      let id = window.location.search.split("=")[1];

      let movie = await searchMoviesWithID(id);
      renderDetails(movie);
    })();
  }
 //--------------------below function gets the result and is resposible for rendering details into DOM-----------
  function renderDetails(movie) {
    const movieDetailContainer = document.querySelector("#detail-container");
    movie.Poster =
      movie.Poster == "N/A"
        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAm6dU5JsOoX02Rm2pRIq0hW6uIQ8VC8h42w&usqp=CAU"
        : movie.Poster;

    let newDetails = `<div class="movie-poster">
                    <img
                    src="${movie.Poster}"
                    alt="movie poster"
                    />
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.Title}</h3>
                        <ul class="movie-misc-info">
                        <li class="year">imdb Rating: ${movie.imdbRating}</li>
                        <li class="rated">Rated: ${movie.Rated}</li>
                        <li class="released">Released: ${movie.Released}</li>
                        </ul>
                        <p class="genre"><b>Genre:</b> ${movie.Genre}</p>
                        <p class="writer">
                        <b>Writer:</b> ${movie.Writer}
                        </p>
                        <p class="actors">
                        <b>Actors: </b>${movie.Actors}
                        </p>
                        <p class="plot">
                        <b>Plot:</b> ${movie.Plot}
                        </p>
                        <p class="language"><b>Language:</b> ${movie.Language}</p>
                        <p class="awards">
                        <b><i class="fas fa-award"></i></b> ${movie.Awards}
                        </p>
                    </div>`;

    movieDetailContainer.innerHTML = newDetails;
  }
}
