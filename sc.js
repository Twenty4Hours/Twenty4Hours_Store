const cart = {};
let totalAmount = 0;

// Handle adding items to the cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        const productImage = button.getAttribute('data-image');

        // Update cart
        if (!cart[productName]) {
            cart[productName] = { price: productPrice, quantity: 1, image: productImage };
        } else {
            cart[productName].quantity++;
        }

        // Update total amount
        totalAmount += productPrice;
        localStorage.setItem('totalAmount', `$${totalAmount.toFixed(2)}`);

        // Update cart count
        document.getElementById('cart-count').innerText = Object.values(cart).reduce((total, item) => total + item.quantity, 0);

        alert(`${productName} has been added to your cart!`);
    });
});

// Cart modal functionality
const cartIcon = document.getElementById('cart');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close');
const cartItemsContainer = document.getElementById('cart-items');
const totalAmountModal = document.getElementById('total-amount-modal');
const checkoutButton = document.getElementById('checkout-btn');

// Display cart items in modal
cartIcon.addEventListener('click', () => {
    cartItemsContainer.innerHTML = '';
    Object.entries(cart).forEach(([name, item]) => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${name}" class="cart-item-image">
                <p>${name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>`;
    });
    totalAmountModal.innerHTML = `<h4>Total Amount: $${totalAmount.toFixed(2)}</h4>`;
    cartModal.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Checkout button functionality
checkoutButton.addEventListener('click', () => {
    window.location.href = 'qr.html'; // Redirect to the QR code payment page
});

// Close modal on clicking outside of it
window.onclick = function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
};
