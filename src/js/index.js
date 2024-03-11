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

//Clicker

let quantity = document.querySelector('.modal__order-clicker-quantity');
let btnPlus = document.querySelector('.modal__order-clicker-plus');
let btnMinus = document.querySelector('.modal__order-clicker-minus');

let count = 1;

btnPlus.onclick = () => {
    ++count
    quantity.textContent = count;
}
btnMinus.onclick = () => {
    if (count > 1) {
        --count
        quantity.textContent = count;
    }
}

///Modal

let modalCloseBtn = document.querySelector(".modal__close-btn");

modalCloseBtn.onclick = () => {
    modalBg.classList.toggle("visually-hidden");
    quantity.textContent = 1;
    count = 1;
}

document.onkeydown = (e) => {
    if (!modalBg.classList.contains("visually-hidden")) {
        if (e.code == "Escape" || e.code == "Backspace") {
            modalBg.classList.add("visually-hidden");
            quantity.textContent = 1;
            count = 1;
        }
    }
};

//Basket

let basketaddBtn = document.querySelector(".modal__order-btn");
let basketaddTitle = document.querySelector(".modal__order-title");
let basketList = document.querySelector(".menu-basket__list");
let basketItemCreater = document.querySelector(".menu-basket__item");
let basketImg = document.querySelector(".menu-basket__item-img");
let basketTitle = document.querySelector(".menu-basket__item-title");
let basketItemWeight = document.querySelector(".menu-basket__item-weight");
let basketItemPrice = document.querySelector(".menu-basket__item-price");
let basketClickerQuantity = document.querySelector(".menu-basket__item-clicker-quantity");

basketaddBtn.onclick = () => {
    let modalImgClone = document.querySelector(".modal__order-img img").cloneNode(true)
    console.log(modalImgClone)
    let basketCloneContent = basketItemCreater.cloneNode(true);
    basketTitle.textContent = basketaddTitle.textContent;
    basketItemWeight.textContent = orderModalCalories.textContent;
    basketItemPrice.textContent = orderModalPrice.textContent;
    basketClickerQuantity.textContent = quantity.textContent;
    if (document.querySelector(".menu-basket__item-img img")) {
        document.querySelector(".menu-basket__item-img img").remove();
    }
    basketImg.appendChild(modalImgClone);
    basketList.appendChild(basketCloneContent);
    modalBg.classList.add("visually-hidden");
}