const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const moiveBox = document.querySelector("#movie-box");

// EDIT: pagination variables
let currentPage = 1;
let currentURL = APIURL;

// EDIT: updated getMovies
const getMovies = async (url) => {
  currentURL = url;
  const response = await fetch(url + `&page=${currentPage}`);
  const data = await response.json();
  showMovies(data);
};

// initial load
getMovies(APIURL);

const showMovies = (data) => {
  moiveBox.innerHTML = "";

  data.results.forEach((result) => {
    const imgpath =
      result.poster_path === null
        ? "img/image-missing.png"
        : IMGPATH + result.poster_path;

    const box = document.createElement("div");
    box.classList.add("box");

    box.innerHTML = `
      <img src="${imgpath}" alt="" />
      <div class="overlay">
        <div class="title">
          <h2>${result.original_title}</h2>
          <span>${result.vote_average}</span>
        </div>
        <h2>Overview:</h2>
        <p>${result.overview}</p>
      </div>
    `;

    moiveBox.appendChild(box);
  });
};

// EDIT: search + page reset
document.querySelector("#search").addEventListener("keyup", function (event) {
  currentPage = 1;
  if (event.target.value !== "") {
    getMovies(SEARCHAPI + event.target.value);
  } else {
    getMovies(APIURL);
  }
});

// EDIT: pagination buttons
document.querySelector("#next").addEventListener("click", () => {
  currentPage++;
  getMovies(currentURL);
});

document.querySelector("#prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getMovies(currentURL);
  }
});