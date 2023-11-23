
removeItems();
quantityChangePrice();
placeOrder();
goBack();

function removeItems(){
    const removeBtn = document.querySelectorAll('.remove-btn');

    removeBtn.forEach(button => {
        button.addEventListener('click', (event) => {
            const textBook = event.target.closest('.textbook');
            textBook.remove();
            updatePrice();
            checkCartEmpty();
            
        });
    });   
}

function quantityChangePrice(){
    let quantityInputs = document.querySelectorAll('.textbook-info input[type="number"]');

    for(let i = 0; i < quantityInputs.length; i++){
        quantityInputs[i].addEventListener('change',updatePrice);
    }
    
    updatePrice();
   
}

function updatePrice() {

    let items = document.querySelectorAll('.textbook-info');``
    let subtotal = 0;
    let totalItems = 0;

    items.forEach((currBook) => {
        const currPrice = parseFloat(currBook.querySelector('.price').textContent.replace(/[^\d.-]/g, ''));
        const currQuantity = parseInt(currBook.querySelector('input[type="number"]').value);
        totalItems += currQuantity;
        
        subtotal += currQuantity * currPrice;
    });
   
    updateShoppingCartNumber(totalItems);
  
    const GST = subtotal * 0.05;
    const PST = subtotal * 0.07;
    subtotal += GST + PST;

    const GSTElement = document.querySelector('#gst-price');
    GSTElement.textContent = GST.toFixed(2);

    const PSTElement = document.querySelector('#pst-price');
    PSTElement.textContent = PST.toFixed(2);

    const subtotalElement = document.querySelector('#total-price');
    subtotalElement.textContent = subtotal.toFixed(2); 
}

function updateShoppingCartNumber(totalItems){

    let cart = (document.querySelector('.cart h1'));
    let cartItems = cart.textContent.match(/\((\d+)\)/)[1];
    cart.textContent = cart.textContent.replace(/\(\d+\)/, `(${totalItems})`);
    
}

function placeOrder(){
    document.getElementById("place-order").addEventListener('click', () => {
        alert("Order has been successfully place. ")
    });
}

function checkCartEmpty() {
    let textbooks = document.querySelectorAll('.textbook');

    if (textbooks.length === 0) {
        let h1 = document.createElement('h1');
        h1.textContent = 'Your Cart is Empty';
        document.querySelector('.cart').appendChild(h1);
    }
}

function goBack(){
    document.getElementById('back-button').addEventListener('click', function() {
        window.location.href = '../search-files/search.html'; // Adjust the path as needed
    });
}
