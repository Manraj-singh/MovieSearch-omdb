function loadFavouriteMovies(){
    const resultGrid = document.querySelector("#result-grid");
    let movieArr = localStorage.getItem('favMovies');
    console.log(movieArr);
    if(movieArr ==null ||movieArr ==[]){
        resultGrid.innerHTML = 'Nothing added to favourites ,start adding now'
    }

}