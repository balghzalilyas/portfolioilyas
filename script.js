document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const cardRect = card.getBoundingClientRect();
            
            // حساب مكان الماوس بالنسبة للكارت
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            // تحويل الإحداثيات لزوايا ميلان
            const midCardWidth = cardRect.width / 2;
            const midCardHeight = cardRect.height / 2;
            
            // الحد الأقصى للميلان هو 15 درجة
            const angleX = -(y - midCardHeight) / midCardHeight * 15;
            const angleY = (x - midCardWidth) / midCardWidth * 15;
            
            // تطبيق التأثير 3D
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // إرجاع الكارت لحالته الطبيعية عند خروج الماوس
        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = "all 0.5s ease";
        });

        card.addEventListener("mouseenter", () => {
            card.style.transition = "none";
        });
    });
});