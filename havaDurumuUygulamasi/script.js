const apikey = "3265874a2c77ae4a04bb96236a642d2f";
const container = document.getElementById("container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
//api
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
//api'den bilgileri alma
async function lokasyonBilgisi(city) {
  const resp = await fetch(url(city), { origin: "cors" });
  const respData = await resp.json();

 // console.log(respData);
  if (respData.cod === "404") {
    return uyariMesaji();
  } else {
    havaDurumuBilgisi(respData);
  }
}

function havaDurumuBilgisi(data) {
  const sehirBilgisi = data;
  const temp = dereceCevirme(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C </h2>
        <small>${data.weather[0].main} - </small>
        <small><label>${sehirBilgisi.sys.country}</label>,</small>
        <small>${sehirBilgisi.name}</small>
    `;

  // cleanup
  main.innerHTML = "";
  main.appendChild(weather);
}

function dereceCevirme(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;

  if (city) {
    lokasyonBilgisi(city);
  } else {
    return uyariMesaji();
  }
});

function uyariMesaji() {
  const notif = document.createElement("div");
  notif.classList.add("mesaj");
  notif.innerText = " Konum bilgisi bulunmamaktadır !!! ";
  container.appendChild(notif);
  setTimeout(() => {
    notif.remove();
  }, 2000);
  main.innerHTML = "";
  main.appendChild(weather);
}
