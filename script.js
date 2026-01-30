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

// GANTI LOGIKA PINDAH HALAMAN LAMA DENGAN INI:
if (distanceX < 5 && distanceY < 5) {
    const card = e.target.closest('.card');
    if (card && card.dataset.url) {
        const targetUrl = card.dataset.url;

        // Tambahkan class fade-out ke body
        document.body.classList.add('fade-out');

        // Tunggu 500ms (sesuai durasi transition di CSS) baru pindah halaman
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 500);
    }
}