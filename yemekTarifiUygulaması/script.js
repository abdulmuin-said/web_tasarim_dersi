const yemekler = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

rastgeleYemekGetir();
fetchFavYemekler();

async function rastgeleYemekGetir() {
    const sonuc = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const sonucBilgisi = await sonuc.json();
    const rastgeleYemek = sonucBilgisi.meals[0];

    yemekEkle(rastgeleYemek, true);
}

async function yemekIdGetir(id) {
    const sonuc = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    );

    const sonucBilgisi = await sonuc.json();
    const yemek = sonucBilgisi.meals[0];

    return yemek;
}

async function arananYemek(gelen) {
    const sonuc = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + gelen
    );

    const sonucBilgisi = await sonuc.json();
    const yemekler = sonucBilgisi.meals;

    return yemekler;
}

function yemekEkle(yemekBilgi, random = false) {
    /* console.log(yemekBilgi); */

    const yemek = document.createElement("div");
    yemek.classList.add("meal");

    yemek.innerHTML = `
        <div class="meal-header">
            ${
                random
                    ? `
            <span class="random"> Rastgele Tarif </span>`
                    : ""
            }
            <img
                src="${yemekBilgi.strMealThumb}"
                alt="${yemekBilgi.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${yemekBilgi.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    const btn = yemek.querySelector(".meal-body .fav-btn");

    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            LocalYemekSil(yemekBilgi.idMeal);
            btn.classList.remove("active");
        } else {
            LocalFavYemek(yemekBilgi.idMeal);
            btn.classList.add("active");
        }

        fetchFavYemekler();
    });

    yemek.addEventListener("click", () => {
        YemekBilgileriniGoster(yemekBilgi);
    });

    yemekler.appendChild(yemek);
}
/* Local de favori yemeklerin id'sini tutma */
function LocalFavYemek(mealId) {
    const mealIds = LocalYemekGetir();

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function LocalYemekSil(mealId) {
    const mealIds = LocalYemekGetir();

    localStorage.setItem(
        "mealIds",
        JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}

function LocalYemekGetir() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}

async function fetchFavYemekler() {
    // clean the container
    favoriteContainer.innerHTML = "";

    const mealIds = LocalYemekGetir();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        yemk = await yemekIdGetir(mealId);

        FavYemekEkle(yemk);
    }
}

function FavYemekEkle(mealData) {
    const favYemek = document.createElement("li");

    favYemek.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        /><span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favYemek.querySelector(".clear");

    btn.addEventListener("click", () => {
        LocalYemekSil(mealData.idMeal);

        fetchFavYemekler();
    });

    favYemek.addEventListener("click", () => {
        YemekBilgileriniGoster(mealData);
    });

    favoriteContainer.appendChild(favYemek);
}

function YemekBilgileriniGoster(yemekBilgi) {
    // clean it up
    mealInfoEl.innerHTML = "";

    // update the Meal info
    const mealEl = document.createElement("div");

    const ingredients = [];

    // get ingredients and measures
    for (let i = 1; i <= 20; i++) {
        if (yemekBilgi["strIngredient" + i]) {
            ingredients.push(
                `${yemekBilgi["strIngredient" + i]} - ${
                    yemekBilgi["strMeasure" + i]
                }`
            );
        } else {
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${yemekBilgi.strMeal}</h1>
        <img
            src="${yemekBilgi.strMealThumb}"
            alt="${yemekBilgi.strMeal}"
        />
        <p>
        ${yemekBilgi.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients
                .map(
                    (ing) => `
            <li>${ing}</li>
            `
                )
                .join("")}
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);

    // show the popup
    mealPopup.classList.remove("hidden");
}

/* Search butonuna tıklandığında rastgele gelen yemek */
searchBtn.addEventListener("click", async () => {
    // clean container
    yemekler.innerHTML = "";

    const search = searchTerm.value;
    const yemeks = await arananYemek(search);

    if (yemeks) {
        yemeks.forEach((item) => {
            yemekEkle(item);
        });
    }
});

popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});
