function addToCart() {


    const blocks = document.querySelector(".blocks");
    blocks.addEventListener('click', (event) => {
        if (event.target.classList.contains('addCartBtn')) {
            //const itemName = button.parentElement.querySelector('.name').textContent;
            //const itemPrice = button.parentElement.querySelector('.overlay').textContent;
            // Зберегти назву та ціну товару до локального сховища
            //localStorage.setItem(itemName, itemPrice);
            console.log("+++");
        }
    });
}
