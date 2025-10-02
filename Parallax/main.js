const title = document.querySelector(".text")
const layer_2 = document.querySelector(".layer-2")
const layer_3 = document.querySelector(".layer-3")
const layer_4 = document.querySelector(".layer-4")

document.addEventListener("scroll", function(){
    let scroll_value = window.scrollY
    console.log(scroll_value);

    title.style.marginTop = scroll_value + "px"

    layer_2.style.marginBottom = (-scroll_value*1.5) + "px"
    layer_3.style.marginBottom = (-scroll_value*1.2) + "px"
    layer_4.style.marginBottom = (-scroll_value*1.1) + "px"
})