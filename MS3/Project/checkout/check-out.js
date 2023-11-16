
let quantityInputs = document.querySelectorAll('.textbook-info input[type="number"]');
let subtotalParagraph = document.getElementById('subtotal');


let removeButton = document.querySelectorAll('.remove-btn');

for(let i =0; i < removeButton.length; i++){
    removeButton[i].addEventListener('click', removeItem);
}

function removeItem(event){
    let removeButton = event.target;
    
    let cartItem = removeButton.parentElement;
    cartItem.remove();

    updateSubtotal();
}

for (let i = 0; i < quantityInputs.length; i++) {
    // Store the base price as a data attribute
    let priceParagraph = quantityInputs[i].parentElement.querySelector('.price');
    let basePrice = parseFloat(priceParagraph.textContent.replace('Price: $', ''));
    quantityInputs[i].dataset.basePrice = basePrice;

    quantityInputs[i].addEventListener('change', updatePrice);
}

function updatePrice(event) {
    let quantityInput = event.target;
    let priceParagraph = quantityInput.parentElement.querySelector('.price');
    let basePrice = parseFloat(quantityInput.dataset.basePrice);
    let quantity = parseInt(quantityInput.value);
    let newPrice = basePrice * quantity;
    priceParagraph.textContent = 'Price: $' + newPrice.toFixed(2);
    updateSubtotal();
}

function updateSubtotal() {
    let priceParagraphs = document.querySelectorAll('.textbook-info .price');

    let subtotal = 0;
    for (let i = 0; i < priceParagraphs.length; i++) {
        subtotal += parseFloat(priceParagraphs[i].textContent.replace('Price: $', ''));
    }
    subtotalParagraph.textContent = '$' + subtotal.toFixed(2);
}