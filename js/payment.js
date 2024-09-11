const select = document.getElementById("type");

select.addEventListener('change', (e) => {
    // When changing options the div with each content option should be displayed.
    console.log(e.target.value);
})