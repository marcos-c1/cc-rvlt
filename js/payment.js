const select = document.getElementById("type");
const creditCard = document.getElementById("credit-card-container");
const pix = document.getElementById("pix-container");
const paypal = document.getElementById("paypal-container");
const nubank = document.getElementById("nubank-container");

const chooseType = new Map(
    [
        ['credit-card', creditCard],
        ['pix', pix],
        ['paypal', paypal],
        ['nubank', nubank],
    ]
)

select.addEventListener('change', (e) => {
    // When changing options the div with each content option should be displayed.
    const opt = (e.target.value);
    const mapper = Array.from(chooseType.entries());

    if(chooseType.get(opt) == null){
        mapper.forEach(([_, value]) => {
            value.toggleAttribute('hidden', true)
        });
    } else {
        mapper.forEach(([key, value]) => {
            if(key == opt){
                value.toggleAttribute('hidden', false)
            } else {
                value.toggleAttribute('hidden', true)
            }
        });
    }

    
})