//products filter

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

//Cards popup
let modalBg = document.querySelector(".modal");
let modalPage = document.querySelector(".modal-wrapper");
let btnAddPopup = document.querySelectorAll(".menu-assortment__item-btn");
let orderModalTitle = document.querySelector(".modal__order-title")
let orderModalPrice = document.querySelector(".modal__order-price")
let orderModalCalories = document.querySelector(".modal__order-description-calories")
let orderModalImg = document.querySelector(".modal__order-img")

btnAddPopup.forEach (btnpopup => {
    btnpopup.onclick = () => {
        if (document.querySelector(".modal__order-img img")) {
            document.querySelector(".modal__order-img img").remove();
        }
        modalBg.classList.remove("visually-hidden");
        let parentContent = btnpopup.parentNode;
        let cloneContent = parentContent.cloneNode(true);
        orderModalTitle.textContent = cloneContent.children[2].textContent;
        orderModalPrice.textContent = cloneContent.children[1].textContent;
        orderModalCalories.textContent = cloneContent.children[3].textContent;
        orderModalImg.appendChild(cloneContent.children[0]);
    }
});


///Modal

let modalCloseBtn = document.querySelector(".modal__close-btn");

modalCloseBtn.onclick = () => {
    modalBg.classList.toggle("visually-hidden");
}