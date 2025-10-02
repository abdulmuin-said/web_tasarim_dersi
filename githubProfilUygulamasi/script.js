const githubApi = "https://api.github.com/users/";
const sayfa = document.getElementById("sayfa");
const form = document.getElementById("form");
const search = document.getElementById("search");



async function profilBilgisiAl(profil) {
  const response = await fetch(githubApi + profil);
  const responseData = await response.json();

  profilGoruntule(responseData);
  reposGetir(profil);
}
async function reposGetir(profil) {
  const response = await fetch(githubApi + profil + "/repos");
  const responseData = await response.json();

  reposBilgileriEkle(responseData);
}

function profilGoruntule(profil) {
  const cardHTML = `
    <div class="card">
    <div>
    <img class="avatar" src="${profil.avatar_url}" alt="${profil.name}"/>
    </div>
    <div class="profil-bilgi">
   <h2>${profil.name}</h2>
   <p>${profil.bio}</p>
        <ul class="bilgi">
            <li><strong>${profil.followers} Takipçi</strong></li>
            <li><strong>${profil.following} Takip</strong></li>
            <li><strong>${profil.public_repos} Repos</strong></li>
        </ul>
        <div id="repos"></div>
   </div>
   </div>
    `;

  sayfa.innerHTML = cardHTML;
}

function reposBilgileriEkle(repos) {
  const reposEl = document.getElementById("repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const profil = search.value;
  if (profil) {
    profilBilgisiAl(profil);
    search.value = "";
  }
});
