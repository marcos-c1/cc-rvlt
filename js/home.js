const courses = document.getElementById("courses");
const prices = document.getElementById("prices");
const courses_btn = document.getElementById("courses_btn");
const prices_btn = document.getElementById("prices_btn");

courses.addEventListener('mouseenter', () => {
    for(let i = 0; i < courses_btn.children[0].childElementCount; i++){
        courses_btn.children[0].children[i].style.fill = "var(--white)"
        
    }

})

prices.addEventListener('mouseenter', () => {
    for(let i = 0; i < courses_btn.children[0].childElementCount; i++){
        prices_btn.children[0].children[i].style.fill = "var(--white)"
    }
})

courses.addEventListener('mouseleave', () => {
    for(let i = 0; i < courses_btn.children[0].childElementCount; i++){
        courses_btn.children[0].children[i].style.fill = "var(--orange)"
        
    }
})

prices.addEventListener('mouseleave', () => {
    for(let i = 0; i < courses_btn.children[0].childElementCount; i++){
        prices_btn.children[0].children[i].style.fill = "var(--orange)"
    }
})

