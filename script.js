const translations = {
    fr: {
        "nav-services": "Services", "nav-noir": "Chocolat Noir", "nav-lait": "Chocolat au Lait",
        "nav-dulcey": "Chocolat Dulcey", "nav-sucre": "Sans Sucre", "nav-confiserie": "Confiserie",
        "nav-collections": "Collections", "sec-services": "Nos Services",
        "services-desc": "Artisan Chocolatier de luxe, nous créons des expériences gustatives uniques.",
        "sec-noir": "Chocolat Noir", "sec-lait": "Chocolat au Lait", "sec-coffrets": "Nos Coffrets", 
        "auth-title": "Connexion / Inscription", "or": "OU", "register": "Créer mon compte", 
        "cart-title": "Votre Panier", "checkout": "Passer la commande via WhatsApp", "f-loc": "Notre Boutique (Casablanca)"
    },
    en: {
        "nav-services": "Services", "nav-noir": "Dark Chocolate", "nav-lait": "Milk Chocolate",
        "nav-collections": "Collections", "sec-services": "Our Services",
        "services-desc": "Luxury Artisan Chocolatier, we craft exceptional taste experiences.",
        "sec-noir": "Dark Chocolate", "sec-lait": "Milk Chocolate", "sec-coffrets": "Our Gift Boxes", 
        "auth-title": "Login / Sign Up", "or": "OR", "register": "Create Account", 
        "cart-title": "Your Cart", "checkout": "Checkout via WhatsApp", "f-loc": "Our Boutique (Casablanca)"
    },
    ar: {
        "nav-services": "خدماتنا", "nav-noir": "شوكولاتة سوداء", "nav-lait": "شوكولاتة بالحليب",
        "nav-collections": "المجموعات", "sec-services": "خدماتنا الفاخرة",
        "services-desc": "شوكولاتة حرفية فاخرة، نصنع لكم تجارب تذوق استثنائية تناسب أرقى مناسباتكم.",
        "sec-noir": "الشوكولاتة السوداء", "sec-lait": "الشوكولاتة بالحليب", "sec-coffrets": "صناديق الهدايا", 
        "auth-title": "تسجيل الدخول / إنشاء حساب", "or": "أو", "register": "إنشاء حساب جديد", 
        "cart-title": "سلة المشتريات", "checkout": "إرسال الطلب عبر الواتساب", "f-loc": "موقعنا (الدار البيضاء)"
    }
};

let currentLang = 'fr';
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    const ticker = document.querySelector('.ticker-wrap');
    if(ticker) { ticker.innerHTML += ticker.innerHTML; }
});

// محرك البحث الفوري عن طريق قراءة سطر الـ HTML (data-name) ديريكت
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card-3d');
    
    cards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        if (name.includes(query)) { card.style.display = "block"; } 
        else { card.style.display = "none"; }
    });
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) { existing.qty++; } 
    else { cart.push({ name, price, qty: 1 }); }
    updateCartUI();
}

function changeQty(name, delta) {
    const item = cart.find(item => item.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { cart = cart.filter(i => i.name !== name); }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items-list');
    container.innerHTML = '';
    let total = 0, count = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div><h4>${item.name}</h4><small>${item.price} DH</small></div>
            <div class="quantity-controls" style="display:flex; align-items:center; gap:8px;">
                <button onclick="changeQty('${item.name}', -1)" style="padding:2px 8px;">-</button>
                <span>${item.qty}</span>
                <button onclick="changeQty('${item.name}', 1)" style="padding:2px 8px;">+</button>
            </div>`;
        container.appendChild(div);
    });

    document.getElementById('cart-count').innerText = count;
    document.getElementById('cart-total-price').innerText = total;
}

function sendToWhatsApp() {
    if (cart.length === 0) { alert("Votre panier est vide!"); return; }
    let message = `Bonjour Rêve Chocolatier, Je souhaite passer une commande :\n\n`;
    let total = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        message += `• ${item.name} (x${item.qty}) : ${subtotal} DH\n`;
        total += subtotal;
    });
    message += `\n*Total de la commande : ${total} DH*`;
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank');
}

function changeLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.body.style.direction = (lang === 'ar') ? "rtl" : "ltr";
    
    document.querySelectorAll('[data-tr]').forEach(element => {
        const key = element.getAttribute('data-tr');
        if (translations[lang][key]) {
            if(element.tagName === 'INPUT') { element.placeholder = translations[lang][key]; }
            else { element.innerHTML = translations[lang][key]; }
        }
    });
}

function toggleModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

function setupEventListeners() {
    document.getElementById('auth-btn').addEventListener('click', () => toggleModal('auth-modal'));
    document.getElementById('cart-btn').addEventListener('click', () => toggleModal('cart-modal'));
    document.getElementById('map-btn').addEventListener('click', () => window.open('https://maps.google.com', '_blank'));
}