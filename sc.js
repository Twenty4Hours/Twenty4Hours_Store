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

            // Check if the quantity is zero
            if (quantity <= 0) {
                // Show a notification to add items
                alert('Please add items into the cart before proceeding.');
                return; // Exit the function
            }

            // Check if the item already exists in the cart
            const existingItemIndex = cartItems.findIndex(item => item.name === productName);

            if (existingItemIndex > -1) {
                // Item exists, update the quantity
                cartItems[existingItemIndex].quantity += quantity;
            } else {
                // Item does not exist, add a new item
                cartItems.push({ name: productName, price: productPrice, quantity: quantity, image: productImage });
            }

            // Update the cart count
            cartCount += quantity;
            document.getElementById('cartCount').textContent = cartCount; // Update cart count display

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

            // Calculate total price
            const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            cartItemsContainer.innerHTML += `
                <div style="text-align: right; font-weight: bold;">
                    Total Price: $${totalPrice.toFixed(2)}
                </div>
            `;
        }

        // Show the modal
        cartModal.show();
        
        // Check if checkout button already exists
        let checkoutButton = document.querySelector('.modal-footer .btn-primary');
        if (!checkoutButton) {
            // Add event listener for the Checkout button
            checkoutButton = document.createElement('button');
            checkoutButton.textContent = 'Checkout';
            checkoutButton.className = 'btn btn-primary mt-3';
            checkoutButton.addEventListener('click', () => {
                // Save cart items to local storage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                // Redirect to payment page
                window.location.href = 'checkout.html'; // Redirect to the payment page
            });

            // Append the checkout button to the modal footer
            document.querySelector('.modal-footer').appendChild(checkoutButton);
        }
    });
});
const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("zoomedImage");
    const closeModal = document.querySelector(".close");
    
    // All zoomable images
    const zoomableImages = document.querySelectorAll(".zoomable-image");

    // Add event listener to each image
    zoomableImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "flex";
            modalImg.src = this.src; // Use clicked image's src for zoom
        });
    });

    // Close the modal when the 'X' is clicked
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Close modal when user clicks outside the zoomed image
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

