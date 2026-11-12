const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('load', () => setTimeout(() => $('#loader')?.classList.add('done'), 600));

const nav = $('#dnav'), bar = $('#progress'), sticky = $('.sticky-order');
function onScroll() {
    const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav?.classList.toggle('scrolled', y > 30);
    if (bar) bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    sticky?.classList.toggle('show', y > 300);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: 0.12 });
$$('.reveal').forEach(el => io.observe(el));

// Model 3D: tombol putar/stop + hint
const mv = $('model-viewer'), hint = $('.stage-hint'), spin = $('#spinBtn');
if (mv && hint) ['pointerdown', 'touchstart'].forEach(ev =>
    mv.addEventListener(ev, () => { hint.style.opacity = '0'; }, { once: true, passive: true }));
if (mv && spin) spin.addEventListener('click', () => {
    const on = mv.hasAttribute('auto-rotate');
    if (on) mv.removeAttribute('auto-rotate'); else mv.setAttribute('auto-rotate', '');
    spin.textContent = on ? 'Putar' : 'Stop putar';
});

// Menu lainnya: dua baris berlawanan arah
function initMarquee(row, dir, speed) {
    const track = $('.mtrack', row);
    const base = [...track.children];
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    const period = track.scrollWidth + gap;
    const need = Math.ceil((Math.max(window.screen.width, 1600) * 2) / period) + 1;
    for (let i = 0; i < need; i++) base.forEach(c => {
        const cl = c.cloneNode(true);
        cl.setAttribute('aria-hidden', 'true');
        cl.tabIndex = -1;
        track.appendChild(cl);
    });
    let pos = dir < 0 ? 0 : -period / 2;
    let paused = false, drag = false, moved = 0, sx = 0, sp = 0, visible = true, last = performance.now();
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(row);
    function tick(now) {
        const dt = Math.min(now - last, 50);
        last = now;
        if (visible) {
            if (!paused && !drag) pos += dir * speed * dt / 16.7;
            while (pos <= -period) pos += period;
            while (pos > 0) pos -= period;
            track.style.transform = `translate3d(${pos}px,0,0)`;
        }
        requestAnimationFrame(tick);
    }
    if (matchMedia('(hover: hover)').matches) {
        row.addEventListener('mouseenter', () => { paused = true; });
        row.addEventListener('mouseleave', () => { paused = false; });
    }
    row.addEventListener('pointerdown', e => { drag = true; moved = 0; sx = e.clientX; sp = pos; });
    window.addEventListener('pointermove', e => {
        if (!drag) return;
        const dx = e.clientX - sx;
        moved = Math.max(moved, Math.abs(dx));
        pos = sp + dx;
    });
    const end = () => { drag = false; };
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    row.addEventListener('click', e => { if (moved > 6) e.preventDefault(); }, true);
    requestAnimationFrame(tick);
}
$$('.mrow').forEach(r => initMarquee(r, -1, 0.55));


// kursor "geser" di atas carousel (hanya perangkat dengan mouse)
if (matchMedia('(hover: hover)').matches) {
    const dot = document.createElement('div');
    dot.className = 'drag-dot'; dot.textContent = 'geser';
    document.body.appendChild(dot);
    document.addEventListener('pointermove', e => {
        const on = !!e.target.closest('.mrow');
        dot.classList.toggle('on', on);
        if (on) dot.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
    });
}

// Panah kiri/kanan = menu sebelumnya/berikutnya
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') $('.pn .prev')?.click();
    if (e.key === 'ArrowRight') $('.pn .next')?.click();
});

// Transisi halus antar halaman
document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    const h = a.getAttribute('href');
    if (!h || h.startsWith('#') || /^https?:/.test(h)) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => { window.location.href = a.href; }, 260);
});
window.addEventListener('pageshow', () => document.body.classList.remove('leaving'));
