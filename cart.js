
const DEFAULT_CART_ITEMS = [
    { id: 1, name: 'Redmi Note 13 Pro+', price: 64500, quantity: 1 },
    { id: 2, name: 'Xiaomi Redmi 13', price: 64500, quantity: 1 }
];

// Load cart items from local storage or use default
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || DEFAULT_CART_ITEMS;

function renderCartItems() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear previous items
    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: Ksh ${item.price}</p>
            <input type="number" value="${item.quantity}" min="1" onchange="updateItem(${item.id}, this.value)">
            <button onclick="confirmRemoval(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(itemDiv);
    });

    document.getElementById('total').innerText = `Ksh ${total}`;
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Sync with local storage
}

function updateItem(id, quantity) {
    const item = cartItems.find(item => item.id === id);
    if (item && quantity > 0) {
        item.quantity = Number(quantity);
        renderCartItems();
        showNotification(`Updated ${item.name} quantity to ${quantity}`);
    }
}

function confirmRemoval(id) {
    const confirmAction = confirm("Are you sure you want to remove this item from your cart?");
    if (confirmAction) {
        removeItem(id);
    }
}

function removeItem(id) {
    const index = cartItems.findIndex(item => item.id === id);
    if (index >= 0) {
        const removedItemName = cartItems[index].name;
        cartItems.splice(index, 1);
        renderCartItems();
        showNotification(`${removedItemName} removed from your cart`);
    }
}

function showNotification(message) {
    // Create a simple notification element
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerText = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000); // Remove after 3 seconds
}

// Initial render
renderCartItems();

// Checkout logic (placeholder function)
document.getElementById('checkout-button').addEventListener('click', () => {
    alert("Proceeding to checkout...");
});
