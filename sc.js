document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0; // Initialize cart count
    const cartItems = []; // Array to hold cart items

    // Handle quantity adjustment
    const quantityControls = document.querySelectorAll('.quantity-controls');

    quantityControls.forEach(control => {
        const quantityDisplay = control.querySelector('.quantity');
        const increaseButton = control.querySelector('.quantity-increase');
        const decreaseButton = control.querySelector('.quantity-decrease');

        // Increase quantity
        increaseButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityDisplay.textContent);
            quantityDisplay.textContent = currentQuantity + 1; // Increase the quantity
        });

        // Decrease quantity
        decreaseButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityDisplay.textContent);
            if (currentQuantity > 1) {
                quantityDisplay.textContent = currentQuantity - 1; // Decrease the quantity
            }
        });
    });

    // Handle add to cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            const quantityDisplay = button.previousElementSibling.querySelector('.quantity'); // Get the quantity display
            const quantity = parseInt(quantityDisplay.textContent); // Get the quantity value
            const productImage = button.getAttribute('data-image'); // Get the product image

            // Update the cart count
            cartCount += quantity;
            document.getElementById('cartCount').textContent = cartCount; // Update cart count display

            // Add item to cart items array
            cartItems.push({ name: productName, price: productPrice, quantity: quantity, image: productImage });

            // Notify user
            alert(`${quantity} x ${productName} has been added to your cart!`);
        });
    });

    // Handle cart icon click
    document.getElementById('cartIcon').addEventListener('click', () => {
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        const cartItemsContainer = document.getElementById('cartItems');

        // Clear previous items
        cartItemsContainer.innerHTML = '';

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            // Populate cart items in modal
            cartItems.forEach(item => {
                cartItemsContainer.innerHTML += `
                    <div class="cart-item" style="display: flex; align-items: center; margin-bottom: 10px; justify-content: center;">
                        <img src="${item.image}" alt="${item.name}" style="width: 150px; height: auto; margin-right: 10px;">
                        <div style="text-align: left;">
                            <p>${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                `;
            });
        }

        // Show the modal
        cartModal.show();
        
        // Add event listener for the Checkout button
        const checkoutButton = document.createElement('button');
        checkoutButton.textContent = 'Checkout';
        checkoutButton.className = 'btn btn-primary mt-3';
        checkoutButton.addEventListener('click', () => {
            // Save cart items to local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Redirect to payment page
            window.location.href = 'qr_code.html'; // Redirect to the payment page
        });

        // Append the checkout button to the modal footer
        document.querySelector('.modal-footer').appendChild(checkoutButton);
    });
});
