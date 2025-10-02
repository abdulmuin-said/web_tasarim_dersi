const C_dot = document.querySelector("[data-cursor-dot]")
const C_border = document.querySelector("[data-cursor-border]")

window.addEventListener("mousemove", function (e){
    
    const pozX = e.clientX
    const pozY = e.clientY

    C_dot.style.left = `${pozX}px`
    C_dot.style.top = `${pozY}px`

    C_border.style.left = `${pozX}px`
    C_border.style.top = `${pozY}px`

    C_border.animate({
        left : `${pozX}px`,
        top : `${pozY}px`},
        { duration: 600, fill: "forwards"})
    
})
