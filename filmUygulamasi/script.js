const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Sayfa yüklendiğinde Filmler gelecek..
filmler(APIURL);

// film bilgilerini api üzerinden alınması
async function filmler(url) {
  const response = await fetch(url);
  const responseData = await response.json();

  filmleriGoster(responseData.results);
}

function filmleriGoster(film) {
  // boş film bilgisi
  main.innerHTML = "";
  // API'den dönen film bilgisini dönüp html ' yükler.
  film.forEach((item) => {
    const { poster_path, title, vote_average, overview } = item;

    const filmElement = document.createElement("div");
    filmElement.classList.add("movie");

    filmElement.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${filmOranı(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Açıklama:</h3>
                ${overview}
            </div>
        `;

    main.appendChild(filmElement);
  });
}
// film oran bilgisi
function filmOranı(oran) {
  if (oran >= 7) {
    return "green";
  } else if (oran >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const arananFilm = search.value;

  if (arananFilm) {
    filmler(SEARCHAPI + arananFilm);

    search.value = "";
  }
});
