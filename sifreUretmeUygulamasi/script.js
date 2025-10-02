const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const buyukHarfler = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const kucukHarfler = "abcdefghijklmnopqrstuvwxyz";
const rakamlar = "0123456789";
const semboller = "!@#$%^&*()_+=";

function kucukHarfGetir() {
    return kucukHarfler[Math.floor(Math.random() * kucukHarfler.length)];
}

function buyukHarfGetir() {
    return buyukHarfler[Math.floor(Math.random() * buyukHarfler.length)];
}

function sayiGetir() {
    return rakamlar[Math.floor(Math.random() * rakamlar.length)];
}

function sembolGetir() {
    return semboller[Math.floor(Math.random() * semboller.length)];
}


function sifreUret() {
    const len = lenEl.value;
    let sifre = "";

    if (upperEl.checked) {
        sifre += buyukHarfGetir();
    }

    if (lowerEl.checked) {
        sifre += kucukHarfGetir();
    }

    if (numberEl.checked) {
        sifre += sayiGetir();
    }

    if (symbolEl.checked) {
        sifre += sembolGetir();
    }


    if (len > 20){
        return alert("Hatalı giriş yaptınız.!!!  Maximum şifre uzunluğu 20'dir.");
    }
    else {
        for (let i = sifre.length; i < len; i++) {
            const x = kontrol();
            sifre += x;
        }
        pwEl.innerText = sifre;
    }
 

   
}

function kontrol() {
    const xs = [];

   
    if (upperEl.checked) {
        xs.push(buyukHarfGetir());
    }

    if (lowerEl.checked) {
        xs.push(kucukHarfGetir());
    }

    if (numberEl.checked) {
        xs.push(sayiGetir());
    }

    if (symbolEl.checked) {
        xs.push(sembolGetir());
    }

    if (xs.length === 0) return "";

    return xs[Math.floor(Math.random() * xs.length)];
}

generateEl.addEventListener("click", sifreUret);

copyEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const sifre = pwEl.innerText;

    if (!sifre) {
        return;
    }

    textarea.value = sifre;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Şifre Kopyalandı!");
});