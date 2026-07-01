document.querySelectorAll('.card-3d-inner').forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) return;
        
        const parentCard = this.closest('.product-card');
        parentCard.classList.toggle('flipped');
    });
});

let cart = [];
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalSum = document.getElementById('cartTotalSum');
const cartCount = document.getElementById('cartCount');

cartIcon.addEventListener('click', (e) => { e.preventDefault(); cartSidebar.classList.add('open'); });
closeCart.addEventListener('click', () => { cartSidebar.classList.remove('open'); });

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); 
        const card = e.target.closest('.product-card');
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name');
        const price = parseFloat(card.getAttribute('data-price'));
        const img = card.querySelector('.front-face img').src;

        addToCart(id, name, price, img);
        cartSidebar.classList.add('open'); 
    });
});

function addToCart(id, name, price, img) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, img, quantity: 1 });
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const itemHTML = `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price.toFixed(2)} DH &times; ${item.quantity}</p>
                </div>
                <i class="fas fa-trash-alt remove-item" data-id="${item.id}"></i>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    document.querySelectorAll('.remove-item').forEach(trash => {
        trash.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            removeFromCart(id);
        });
    });

    cartTotalSum.innerText = total.toFixed(2) + ' DH';
    cartCount.innerText = count;
}

const searchIcon = document.getElementById('searchIcon');
const searchContainer = document.getElementById('searchContainer');

searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    searchContainer.classList.toggle('active');
    if(searchContainer.classList.contains('active')) {
        searchContainer.querySelector('input').focus();
    }
});

const accountIcon = document.getElementById('accountIcon');
const accountModal = document.getElementById('accountModal');
const closeModal = document.getElementById('closeModal');
const toSignUp = document.getElementById('toSignUp');
const toLogin = document.getElementById('toLogin');
const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');

accountIcon.addEventListener('click', (e) => { e.preventDefault(); accountModal.classList.add('open'); });
closeModal.addEventListener('click', () => { accountModal.classList.remove('open'); });
window.addEventListener('click', (e) => { if (e.target === accountModal) accountModal.classList.remove('open'); });

toSignUp.addEventListener('click', () => { loginForm.style.display = 'none'; signUpForm.style.display = 'block'; });
toLogin.addEventListener('click', () => { signUpForm.style.display = 'none'; loginForm.style.display = 'block'; });