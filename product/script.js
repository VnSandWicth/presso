document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('coffee-assemble-container');
    const targetImg = document.querySelector('.hero-img-target');
    if (!container || !targetImg) return;

    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('coffee-particle');

        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 400 + Math.random() * 200;
        const startX = Math.cos(angle) * distance;
        const startY = Math.sin(angle) * distance;
        
        const randomBlur = 10 + Math.random() * 20;

        particle.style.opacity = '0';
        particle.style.filter = `blur(${randomBlur}px)`;
        particle.style.transform = `translate(${startX}px, ${startY}px) scale(${0.5 + Math.random()})`;

        container.appendChild(particle);

        setTimeout(() => {
            const particles = document.querySelectorAll('.coffee-particle');
            particles.forEach(p => {
                p.style.opacity = '0';
                p.style.transform = 'scale(1.5)';
                p.style.filter = 'blur(20px)';
            });
        }, 1100);
    }

    // --- BAGIAN KRUSIAL PERBAIKAN ---
    
    setTimeout(() => {
        // 1. Hapus SEMUA inline style agar animasi CSS bisa jalan
        targetImg.style.transform = ''; 
        targetImg.style.filter = '';
        targetImg.style.opacity = '1';

        // 2. Tambahkan class animasi 3D
        targetImg.classList.add('coffee-3d-active');
        
        // 3. Hilangkan partikel
        const particles = document.querySelectorAll('.coffee-particle');
        particles.forEach(p => {
            p.style.opacity = '0';
            p.style.transform = 'scale(1.5)';
            p.style.filter = 'blur(20px)';
        });
    }, 1200);
});

// Logika navigasi tetap sama
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { document.body.classList.add('page-loaded'); }, 10);
    window.navigateTo = function(url) {
        document.body.classList.add('fade-out');
        setTimeout(() => { window.location.href = url; }, 600);
    };
});

// Di dalam blok setTimeout terakhir (1200ms)
setTimeout(() => {
    targetImg.style.transform = ''; 
    targetImg.style.filter = '';
    targetImg.style.opacity = '1';
    targetImg.classList.add('coffee-3d-active');

   // Cari blok setTimeout terakhir (1200ms) di script.js kamu, ganti menjadi:
setTimeout(() => {
    // 1. Munculkan model 3D dengan halus
    targetImg.style.opacity = '1';
    targetImg.style.transition = 'opacity 1s ease';

    // 2. Hilangkan partikel agar tidak menutupi model
    const particles = document.querySelectorAll('.coffee-particle');
    particles.forEach(p => {
        p.style.pointerEvents = 'none';
        p.style.opacity = '0';
    });
    
    // 3. Tambahkan class 3D active jika kamu masih butuh efek bayangan tambahan
    targetImg.classList.add('coffee-3d-active');
}, 1200);
}
)
