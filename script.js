// قاعدة بيانات المنتجات المهيكلة حسب طلبك الدقيق لجميع الأقسام
const productsData = [
    // قسم Chocolat Noir (16 منتج)
    ...generateProducts('noir', 'Chocolat Noir', 16, 45, 'noir-1.png', 'noir-2.png'),
    // قسم Chocolat au Lait (16 منتج)
    ...generateProducts('lait', 'Chocolat au Lait', 16, 40, 'lait-1.png', 'lait-2.png'),
    // قسم Chocolat Dulcey (5 منتجات)
    ...generateProducts('dulcey', 'Chocolat Dulcey', 5, 50, 'dulcey-1.png', 'dulcey-2.png'),
    // قسم Chocolat Sucre (6 منتجات)
    ...generateProducts('sucre', 'Chocolat Sucre', 6, 35, 'sucre-1.png', 'sucre-2.png'),
    // قسم Gamme Confiserie (8 منتجات)
    ...generateProducts('confiserie', 'Gamme Confiserie', 8, 60, 'conf-1.png', 'conf-2.png'),
    // قسم Collection Ombrelle الكبير والمجموعات الفرعية بداخله
    ...generateProducts('ombrelle', 'Collection Ombrelle', 6, 450, 'omb-1.png', 'omb-2.png'),
    ...generateProducts('zlipse', 'Collection Zlipse', 1, 180, 'zlip-1.png', 'zlip-2.png'),
    ...generateProducts('fuzion', 'Collection Fuzion', 1, 220, 'fuz-1.png', 'fuz-2.png'),
    ...generateProducts('lumea', 'Collection Lumea', 1, 190, 'lum-1.png', 'lum-2.png'),
    ...generateProducts('cera', 'Collection Céra', 3, 210, 'cera-1.png', 'cera-2.png'),
    ...generateProducts('drea', 'Collection Dréa', 1, 250, 'drea-1.png', 'drea-2.png'),
    ...generateProducts('dorina', 'Collection Dorina', 3, 300, 'dor-1.png', 'dor-2.png'),
    ...generateProducts('coffrets', 'Nos Coffrets', 10, 150, 'box-1.png', 'box-2.png')
];

// دالة مساعدة لإنشاء المنتجات والصور التناوبية ثلاثية الأبعاد تلقائياً لتوفير الكفاءة
function generateProducts(category, prefixName, count, basePrice, imgFront, imgBack) {
    let list = [];
    for (let i = 1; i <= count; i++) {
        list.push({
            id: `${category}-${i}`,
            category: category,
            name: `${prefixName} #0${i}`,
            price: basePrice + (i * 5),
            imgFront: imgFront, // الصورة الأولى الأساسية
            imgBack: imgBack    // الصورة الثانية التي تظهر عند القلب 3D
        });
    }
    return list;
}

let cart = [];

// توليد الكروت وعرضها داخل شبكات الأقسام عند تحميل الموقع
document.addEventListener("DOMContentLoaded", () => {
    renderAllGrids();
});

function renderAllGrids() {
    const categories = ['noir', 'lait', 'dulcey', 'sucre', 'confiserie', 'ombrelle', 'zlipse', 'fuzion', 'lumea', 'cera', 'drea', 'dorina', 'coffrets'];
    
    categories.forEach(cat => {
        const grid = document.getElementById(`grid-${cat}`);
        if(grid) {
            const filtered = productsData.filter(p => p.category === cat);
            grid.innerHTML = filtered.map(product => `
                <div class="product-card-3d" id="card-${product.id}" onclick="flipCard('${product.id}')">
                    <div class="card-3d-inner">
                        <div class="card-front">
                            <img src="${product.imgFront}" alt="${product.name}">
                            <div class="product-info">
                                <h3>${product.name}</h3>
                                <div class="price">${product.price} DH</div>
                            </div>
                            <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">إضافة للسلة</button>
                        </div>
                        <div class="card-back">
                            <img src="${product.imgBack}" alt="${product.name}">
                            <div class="product-info">
                                <h3>${product.name} - تفاصيل</h3>
                                <div class="price">${product.price} DH</div>
                            </div>
                            <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">إضافة للسلة</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    });
}

// دالة التحكم في تأثير القلب ثلاثي الأبعاد للأقسام والمنتجات
function flipCard(id) {
    const card = document.getElementById(`card-${id}`);
    card.classList.toggle('flipped');
}

// إدارة النوافذ المنبثقة (الحساب والسلة)
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
}

// دالة محرك البحث الشامل والذكي لكل الموقع
function searchProducts() {
    let query = document.getElementById("search-input").value.toLowerCase();
    let allCards = document.querySelectorAll(".product-card-3d");
    
    productsData.forEach((product, index) => {
        let card = allCards[index];
        if(card) {
            if (product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    });
}

// التحكم بالسلة: الإضافة، الزيادة، النقصان
function addToCart(id) {
    const product = productsData.find(p => p.id === id);
    const exist = cart.find(item => item.id === id);
    
    if (exist) {
        exist.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCartUI();
}

function changeQty(id, delta) {
    const item = cart.find(p => p.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(p => p.id !== id);
        }
        updateCartUI();
    }
}

function updateCartUI() {
    const container = document.getElementById("cart-items-container");
    const countSpan = document.getElementById("cart-count");
    const totalSpan = document.getElementById("cart-total-price");
    
    let totalCount = 0;
    let totalPrice = 0;
    
    container.innerHTML = cart.map(item => {
        totalCount += item.qty;
        totalPrice += item.price * item.qty;
        return `
            <div class="cart-item">
                <img src="${item.imgFront}" style="width:40px; height:40px; object-fit:contain;">
                <div>
                    <h4>${item.name}</h4>
                    <span style="color:#d4af37">${item.price} DH</span>
                </div>
                <div class="quantity-control">
                    <button onclick="changeQty('${item.id}', -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty('${item.id}', 1)">+</button>
                </div>
            </div>
        `;
    }).join('');
    
    countSpan.innerText = totalCount;
    totalSpan.innerText = totalPrice;
}

// معالجة وإرسال البيانات إلى واتساب المشروع مع هيكلة تفصيلية ومجموع مالي دقيق
function proceedToWhatsApp() {
    if(cart.length === 0) {
        alert("سلتك فارغة، يرجى اختيار الشوكولاتة أولاً!");
        return;
    }
    
    let phoneNumber = "212600000000"; // رقم واتساب الخاص بالمشروع
    let message = "مرحباً Rêve Chocolatier، أريد تقديم طلبية جديدة عبر الموقع الإلكتروني:\n\n";
    let total = 0;
    
    cart.forEach(item => {
        let subtotal = item.price * item.qty;
        total += subtotal;
        message += `• *${item.name}* (الكمية: ${item.qty}) -> ${subtotal} درهم\n`;
    });
    
    message += `\n*المجموع الإجمالي للطلب:* ${total} درهم كاش عند الاستلام.`;
    
    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// دالة فتح خريطة الموقع عند الضغط على زر الموقع العلوي أو السفلي
function openLocation() {
    window.open("https://maps.google.com/?q=Casablanca", "_blank");
}