const APIKEY = "8850ebe7";
//initializing empty array which can be used as global scope
let favMovies = [];
//block to preserve scope b/w js files
{
  //getting elements with qeuryselector
  const searchBox = document.querySelector("#movie-search-box");
  const resultGrid = document.querySelector("#result-grid");

  function renderResults(result) {
    result = [...result];

    let gridCards = "";
    result.forEach((movie) => {
      movie.Poster =
        movie.Poster == "N/A"
          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAm6dU5JsOoX02Rm2pRIq0hW6uIQ8VC8h42w&usqp=CAU"
          : movie.Poster;
      let card = `<div class="card">
        <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
            <img src="${movie.Poster}" class="img-fluid"/>
            <a href="#!">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </a>
          </div>
          <div class="card-body bg-dark text-white">
            <h5 class="card-title">${movie.Title}</h5>
            <p class="card-text">Type : ${movie.Type}</p>
            <p class="card-text">Release: ${movie.Year}</p>
            <div class="d-flex">
               
            <label for="" data-movie ="abc" hidden>${JSON.stringify(
              movie.imdbID
            )}</label>
                <a onclick="addToFav(this)" class="btn btn-primary w-50 m-2">Add to fav 
                <i class="far fa-star"></i></a>
                <a href="/movieDetails.html?id=${
                  movie.imdbID
                }" class="btn btn-primary w-50 m-2">Movie Details</a>
            </div>
            
          </div>
    </div>`;
      gridCards += card;
    });

    resultGrid.innerHTML = gridCards;
  }
  function addToFav(e) {
      const favRem = `Added <i class="fas fa-check"></i>`;
      const favAdd = `Add to fav <i class="far fa-star"></i>`;
      let id = e.parentNode.children[0].innerText;
      let movieArr = localStorage.getItem('favMovies');
       movieArr = movieArr==null||[]?[]:JSON.parse(movieArr);

       console.log(movieArr);
       console.log(e.innerHTML);
    //if not added, add it else remove it
    if (e.innerHTML == favAdd) {
      e.innerHTML = favRem;
      movieArr.push(id)
    } else {
      e.innerHTML = favAdd;
      movieArr.pop(id);
    }
    //TODO : check for duplicate ids 
    localStorage.setItem('favMovies',JSON.stringify(movieArr))
  }

  async function searchMoviesWithTitle(title) {
    //hit the api with typed term and get results
    const URL = `http://www.omdbapi.com/?s=${title}&page=1&apikey=${APIKEY}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //if we get result, call renderResults to display in grid
    if (data.Response == "True") {
      renderResults(data.Search);
    }
  }

  searchBox.addEventListener("input", (e) => {
    let term = e.target.value.trim();
    if (term.length > 0) {
      searchMoviesWithTitle(term);
    } else {
      resultGrid.innerHTML = "Type Movie name to start searching ! ";
    }
  });
}
