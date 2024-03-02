let btnRange = document.querySelectorAll(".menu-range-item button");
let menuCards = document.querySelectorAll(".menu-assortment__wrapper");

btnRange.forEach (btn => {
    btn.onclick = () => {
        btnRange.forEach (clear => {
            clear.classList.remove("active-btn")
        })
        btn.classList.add("active-btn")
        menuCards.forEach (card => {
            if (btn.dataset.filter === card.dataset.filter) {
                card.classList.remove("visually-hidden")
            } else {
                card.classList.add("visually-hidden")
            }
        })
    }
});