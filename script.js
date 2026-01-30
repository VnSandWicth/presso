document.querySelectorAll('.carousel').forEach(container => {
    const track = container.querySelector('.track');
    
    // 1. Gandakan konten untuk infinity loop
    const originalHTML = track.innerHTML;
    track.innerHTML = originalHTML.repeat(6); 

    let currentPos = 0;
    const isLTR = container.classList.contains('ltr');
    let direction = isLTR ? 1 : -1;
    let speed = 1.2 * direction; 
    
    let isDragging = false;
    let startX = 0;
    let lastTranslate = 0;
    
    // Variabel untuk membedakan klik vs swipe
    let clickStartX = 0;
    let clickStartY = 0;

    function animate() {
        if (!isDragging) {
            currentPos += speed;
            const trackWidth = track.scrollWidth / 6; 

            if (isLTR) {
                if (currentPos >= 0) currentPos = -trackWidth;
            } else {
                if (currentPos <= -trackWidth) currentPos = 0;
            }
            track.style.transform = `translateX(${currentPos}px)`;
        }
        requestAnimationFrame(animate);
    }

    const startDrag = (e) => {
        isDragging = true;
        
        // Simpan posisi awal kursor/jari
        clickStartX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        clickStartY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
        startX = clickStartX;
        
        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        lastTranslate = matrix.m41;
        currentPos = lastTranslate;
    };

    const moveDrag = (e) => {
        if (!isDragging) return;
        const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const walk = x - startX;
        currentPos = lastTranslate + walk;
        track.style.transform = `translateX(${currentPos}px)`;
    };

    const stopDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;

        // Ambil posisi akhir kursor/jari
        const endX = e.type.includes('mouse') ? e.pageX : (e.changedTouches ? e.changedTouches[0].pageX : startX);
        const endY = e.type.includes('mouse') ? e.pageY : (e.changedTouches ? e.changedTouches[0].pageY : clickStartY);
        
        // Hitung jarak pergerakan
        const distanceX = Math.abs(endX - clickStartX);
        const distanceY = Math.abs(endY - clickStartY);

        // LOGIKA UTAMA: Jika geseran sangat kecil (< 5px), itu adalah KLIK
        if (distanceX < 5 && distanceY < 5) {
            const card = e.target.closest('.card');
            if (card && card.dataset.url) {
                window.location.href = card.dataset.url;
            }
        }

        const trackWidth = track.scrollWidth / 6;
        if (Math.abs(currentPos) >= trackWidth * 2) {
            currentPos = isLTR ? -trackWidth : 0;
        }
    };

    // Event Listeners
    container.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', stopDrag);

    container.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchmove', moveDrag, { passive: true });
    window.addEventListener('touchend', stopDrag);

    animate();
});



document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('coffee-assemble-container');
    const targetImg = document.querySelector('.hero-img-target');
    
    if (!container || !targetImg) return;

    const particleCount = 12; // Jumlah lebih sedikit tapi ukuran lebih besar untuk kesan smooth

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('coffee-particle');

        // Posisi acak melingkar yang sangat luas
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 400 + Math.random() * 200;
        const startX = Math.cos(angle) * distance;
        const startY = Math.sin(angle) * distance;
        
        // Random blur agar tidak terlihat berpiksel
        const randomBlur = 10 + Math.random() * 20;

        particle.style.opacity = '0';
        particle.style.filter = `blur(${randomBlur}px)`; // Efek bokeh/blur awal
        particle.style.transform = `translate(${startX}px, ${startY}px) scale(${0.5 + Math.random()}) rotate(${Math.random() * 360}deg)`;

        container.appendChild(particle);

        // Menjalankan animasi menyatu
        requestAnimationFrame(() => {
            setTimeout(() => {
                particle.style.opacity = '0.6'; // Partikel semi-transparan agar halus saat bertumpuk
                particle.style.transform = `translate(0, 0) scale(1) rotate(0deg)`;
                particle.style.filter = 'blur(2px)'; // Tetap agak blur agar menyatu lembut
            }, i * 30);
        });
    }

    // Penyatuan akhir ke gambar yang tajam
    setTimeout(() => {
        targetImg.classList.add('assembled');
        
        const particles = document.querySelectorAll('.coffee-particle');
        particles.forEach(p => {
            p.style.opacity = '0';
            p.style.transform = 'scale(1.5)';
            p.style.filter = 'blur(20px)'; // Menghilang dengan efek "evaporasi" blur
        });
    }, 1100);
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Picu Fade In segera setelah struktur siap
    // Ini tidak akan mengganggu partikel karena partikel punya animasinya sendiri
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 10);

    // 2. Fungsi Global untuk pindah halaman dengan Fade Out
    window.navigateTo = function(url) {
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = url;
        }, 600); // Harus sama dengan durasi transition di CSS (0.6s)
    };

    // 3. Update Logika Klik pada Carousel (Cari bagian stopDrag Anda)
    // Pastikan bagian pengecekan klik diubah seperti ini:
    /*
    if (distanceX < 5 && distanceY < 5) {
        const card = e.target.closest('.card');
        if (card && card.dataset.url) {
            navigateTo(card.dataset.url); // Panggil fungsi transisi
        }
    }
    */
});