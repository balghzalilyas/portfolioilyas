let globalCartRegistry = [];

// 1. مراقبة التمرير لتعديل مظهر الهيدر
window.addEventListener('scroll', function() {
    let header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. أنيميشن الظهور التدريجي للأقسام عند التصفح
function runRevealAnimation() {
    let reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", runRevealAnimation);
window.addEventListener("load", runRevealAnimation);

// 3. دالة التحكم في تحريك السلايدر الأفقي بالأسهم الجانبية
function slideSection(trackId, direction) {
    const track = document.getElementById(trackId);
    const scrollAmount = 345; // حجم التحريك المحسوب (حجم الكارد + gap)
    
    if (direction === 'left') {
        track.scrollLeft -= scrollAmount;
    } else {
        track.scrollLeft += scrollAmount;
    }
}

// 4. محرك البحث وتصفية المنتجات في الوقت الفعلي
function searchProduct() {
    let query = document.getElementById('searchInput').value.toLowerCase();
    let productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        let productName = card.getAttribute('data-name').toLowerCase();
        if (productName.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// 5. التحكم بنافذة حساب ديكاتلون (فتح/إغلاق)
function openAuthPage() { document.getElementById('authPageModal').style.display = 'flex'; }
function closeAuthPage() { document.getElementById('authPageModal').style.display = 'none'; }

function processDecathlonAuth(event) {
    event.preventDefault();
    const identifierInput = document.getElementById('authInputIdentifier').value.trim();
    if (identifierInput) {
        alert(`Welcome to EcoSurfShop! A secure connection link has been successfully sent to: ${identifierInput}`);
        closeAuthPage();
        document.getElementById('authInputIdentifier').value = '';
    }
}

// 6. التحكم بلوحة السلة الجانبية
function openCartPanel() { document.getElementById('cartSidebarPanel').style.display = 'flex'; }
function closeCartPanel() { document.getElementById('cartSidebarPanel').style.display = 'none'; }

window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = "none";
    }
}

// 7. نظام سجل السلة وحفظ البيانات
function addToBagRegistry(name, price, img) {
    globalCartRegistry.push({ name, price, img ,total: price});
    document.getElementById('cartCount').innerText = globalCartRegistry.length;
    refreshCartRegistryUI();
    alert(`${name} has been saved to your surf bag registry!`);
}

function refreshCartRegistryUI() {
    const container = document.getElementById('cartRegistryContainer');
    if (globalCartRegistry.length === 0) {
        container.innerHTML = `<p class="empty-cart-text">Your bag is currently empty.</p>`;
        return;
    }
    
    let combinedHTML = '';
    globalCartRegistry.forEach((product, position) => {
        combinedHTML += `
            <div class="registry-item">
                <img src="${product.img}" alt="${product.name}">
                <div class="registry-details">
                    <h4>${product.name}</h4>
                    <p>${product.price}</p>S
                </div>
                <span class="remove-item-btn" onclick="removeItemFromRegistry(${position})">𝐑𝐞𝐦𝐨𝐯𝐞</span>
            </div>
        `;
    });
    container.innerHTML = combinedHTML;
}

function removeItemFromRegistry(position) {
    globalCartRegistry.splice(position, 1);
    document.getElementById('cartCount').innerText = globalCartRegistry.length;
    refreshCartRegistryUI();
    function goToWhatsapp() {
    // 1. التأكد واش السلة خاوية
    if (typeof globalCartRegistry === 'undefined' || globalCartRegistry.length === 0) {
        alert("Sua sacola está vazia! / سلتك فارغة");
        return;
    }

    // 2. بداية الميساج
    let message = "Olá Ecosurfshop, gostaria de finalizar o seguinte pedido:\n\n";
    let total = 0;

    // 3. الدوران على السلعة اللي فـ globalCartRegistry
    globalCartRegistry.forEach((product, index) => {
        message += `${index + 1}. 🏄‍♂️ ${product.name} -  ${product.price}\n`;
        
        // كود ذكي: كيجبد غير الأرقام من الثمن وخا تكون معاه "DH" ويجمعهم
        let priceNumber = parseInt(product.price.replace(/[^0-9]/g, '')) || 0;
        total += priceNumber;
    });

    // 4. زيادة المجموع الكلي
    message += `\n*Total: ${total} DH*`;

    // 5. رقم الواتساب ديالك (بدلو برقمك الحقيقي يبدا بـ 212 وما ديرش + أو أصفار فالبداية)
    const whatsappNumber = "212600000000"; 

    // 6. تشفير النص وفتح الواتساب
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${212773620718}?text=${encodedMessage}`, '_blank');
}
} 