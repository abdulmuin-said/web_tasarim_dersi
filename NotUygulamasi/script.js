const yeniNotBtn = document.getElementById("yeniNot");

const notTut = JSON.parse(localStorage.getItem("notlar"));

if (notTut) {
    notTut.forEach((item) => {
        ekleYeniNot(item);
    });
}


yeniNotBtn.addEventListener("click", () => {
  ekleYeniNot();
});

function ekleYeniNot(text = "") {
  const not = document.createElement("div");
  not.classList.add("not");

  not.innerHTML = `<div class="notlar">
    <div class="araclar">
        <button class="ekle">
        <i class="fas fa-edit"></i>
        </button>
        <button class="sil">
        <i class="fas fa-trash-alt"></i>
        </button>
        </div>
    <div class="notSayfa ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    </div> `;
   
    const ekleBtn = not.querySelector(".ekle");
    const silBtn = not.querySelector(".sil");
    
    const notSayfa = not.querySelector(".notSayfa");
    const textArea = not.querySelector("textarea");

    textArea.value = text;
    notSayfa.innerHTML = marked(text);
    
    ekleBtn.addEventListener("click", () => {
      notSayfa.classList.toggle("hidden");
      textArea.classList.toggle("hidden");
    });
    

    silBtn.addEventListener("click", () =>{
        not.remove();
        guncelleLocalStorage();

    });

    textArea.addEventListener("input", (e) => {
      const { value } = e.target;
    
      notSayfa.innerHTML = marked(value);
      guncelleLocalStorage();
    });

  document.body.appendChild(not);
}

function guncelleLocalStorage() {
    const notYaz = document.querySelectorAll("textarea");

    const yazilanNot = [];

    notYaz.forEach((not) => {
        yazilanNot.push(not.value);
    });

    localStorage.setItem("notlar", JSON.stringify(yazilanNot));
}

