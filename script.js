// 📦 إدارة السلة (Shopping Cart)
let cart = [];

function addToCart(name, price) {
    cart.push({ name: name, price: price });
    updateCartUI();
}

function updateCartUI() {
    // تحديث رقم شارة السلة
    document.getElementById('cart-counter').innerText = cart.length;
    
    // تحديث محتوى السلة داخل المودال
    const listContainer = document.getElementById('cart-items-list');
    const totalContainer = document.getElementById('cart-total-price');
    
    if(cart.length === 0) {
        listContainer.innerHTML = '<p style="color: #aaa; text-align: center; margin: 20px 0;">Sua sacola está vazia</p>';
        totalContainer.innerText = 'R$ 0,00';
        return;
    }
    
    listContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        listContainer.innerHTML += `
            <div class="cart-item-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span>${item.name}</span>
                <div>
                    <span style="color:#ffb300; margin-right: 15px;">R$ ${item.price},00</span>
                    <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff4d4d; cursor: pointer; font-size: 16px;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    totalContainer.innerText = `R$ ${total},00`;
}

// 💬 الإرسال للواتساب مباشرة للكونطاك
function checkoutToWhatsapp() {
    if(cart.length === 0) {
        alert("Sua sacola está vazia!");
        return;
    }
    let message = "Olá W ROOFTOP, gostaria de fazer o pedido:\n\n";
    let total = 0;
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - R$ ${item.price},00\n`;
        total += item.price;
    });
    message += `\n*Total: R$ ${total},00*`;
    
    // تحويل الميساج لروابط آمنة وفتح واتساب
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5585996210033?text=${encodedMessage}`, '_blank');
}

// 🔍 الروشيرش الفوري (Search)
function searchDishes() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.dish-card-3d');
    
    cards.forEach(card => {
        const name = card.getAttribute('data-name');
        if(name.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// 🌐 نظام تغيير اللغات الفوري الشغال
const translations = {
    
    pt: {
        nav_menu: "MENU", nav_brunch: "BRUNCH", nav_antepasto: "ANTEPASTO", nav_contato: "CONTATO",
        title_menu: "MENU W ROOFTOP", title_brunch: "BRUNCH W ROOFTOP", title_antepasto: "MENU ANTEPASTO",
        login_btn: "Login", login_title: "Entrar na Conta", register_title: "Criar Nova Conta",
        cart_title: "Sua Sacola"
    },
    en: {
        nav_menu: "MENU", nav_brunch: "BRUNCH", nav_antepasto: "ANTEPASTO", nav_contato: "CONTACT",
        title_menu: "W ROOFTOP MENU", title_brunch: "W ROOFTOP BRUNCH", title_antepasto: "ANTEPASTO MENU",
        login_btn: "Login", login_title: "Sign In", register_title: "Create New Account",
        cart_title: "Your Bag"
    },
    fr: {
        nav_menu: "MENU", nav_brunch: "BRUNCH", nav_antepasto: "ANTEPASTO", nav_contato: "CONTACT",
        title_menu: "MENU W ROOFTOP", title_brunch: "BRUNCH W ROOFTOP", title_antepasto: "MENU ANTEPASTO",
        login_btn: "Connexion", login_title: "Se Connecter", register_title: "Créer um Compte",
        cart_title: "Votre Panier"
    }
};

function changeLanguage(lang) {
    document.getElementById('current-lang').innerText = lang.toUpperCase();
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if(translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

// 🪟 التحكم في النوافذ المنبثقة (Modals: Login & Cart)
function toggleLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function switchForm(toRegister) {
    document.getElementById('login-form-wrapper').style.display = toRegister ? 'none' : 'block';
    document.getElementById('register-form-wrapper').style.display = toRegister ? 'block' : 'none';
    
}