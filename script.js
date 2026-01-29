const coffeeMenu = [
    { name: "Espresso",   image: "https://picsum.photos/seed/espresso/800/600" },
    { name: "Americano",  image: "https://picsum.photos/seed/americano/800/600" },
    { name: "Latte",      image: "https://picsum.photos/seed/latte/800/600" },
    { name: "Cappuccino", image: "https://picsum.photos/seed/cappuccino/800/600" },
    { name: "Mocha",      image: "https://picsum.photos/seed/mocha/800/600" },
  ];
  
  const nonCoffeeMenu = [
    { name: "Cloud Matcha",  image: "https://picsum.photos/seed/matcha/800/600" },
    { name: "Chocolate",     image: "https://picsum.photos/seed/chocolate/800/600" },
    { name: "Taro",          image: "https://picsum.photos/seed/taro/800/600" },
    { name: "Lemon Tea",     image: "https://picsum.photos/seed/lemontea/800/600" },
    { name: "Milk Vanilla",  image: "https://picsum.photos/seed/vanilla/800/600" },
  ];
  
  document.getElementById("year").textContent = new Date().getFullYear();
  const mod = (n, m) => ((n % m) + m) % m;
  
  function createCard(item, variant) {
    const el = document.createElement("article");
    el.className = `card ${variant === "red" ? "card--red" : "card--orange"}`;
  
    el.innerHTML = `
      <div class="card__img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="card__body">
        <h4 class="card__name">${item.name}</h4>
      </div>
    `;
  
    return el;
  }
  
  class InfiniteCarousel {
    constructor({ viewport, track, items, variant, dir = 1 }) {
      this.viewport = viewport;
      this.track = track;
      this.items = items;
      this.variant = variant;
      this.dir = dir; // 1: kanan->kiri, -1: kiri->kanan
  
      this.progress = 0;
      this.cycleWidth = 1;
      this.itemW = 200;
      this.gap = 16;
  
      this.dragging = false;
      this.startX = 0;
      this.startProgress = 0;
  
      this.lastX = 0;
      this.lastT = 0;
      this.velocity = 0;
      this.inertiaActive = false;
  
      this.lastFrame = performance.now();
      this.speed = window.innerWidth < 640 ? 22 : 30;
  
      this.build();
      this.recalc();
  
      // start from middle to avoid blank on reverse direction
      this.progress = this.cycleWidth; 
      this.render();
  
      this.bind();
      requestAnimationFrame(this.tick.bind(this));
    }
  
    build() {
      this.track.innerHTML = "";
  
      // build 3 cycles to ensure seamless in both directions
      const cycles = 3; 
      for (let c = 0; c < cycles; c++) {
        for (let i = 0; i < this.items.length; i++) {
          this.track.appendChild(createCard(this.items[i], this.variant));
        }
      }
    }
  
    recalc() {
      const first = this.track.querySelector(".card");
      if (!first) return;
  
      this.itemW = first.getBoundingClientRect().width;
  
      const styles = getComputedStyle(this.track);
      const g = parseFloat(styles.gap || styles.columnGap || "16");
      this.gap = Number.isFinite(g) ? g : 16;
  
      // one cycle = base items length
      this.cycleWidth = Math.max(1, this.items.length * (this.itemW + this.gap));
  
      // speed responsive
      this.speed = window.innerWidth < 640 ? 22 : 30;
    }
  
    bind() {
      this.viewport.addEventListener("pointerdown", (e) => {
        this.dragging = true;
        this.inertiaActive = false;
  
        this.startX = e.clientX;
        this.startProgress = this.progress;
  
        this.lastX = e.clientX;
        this.lastT = performance.now();
        this.velocity = 0;
  
        this.viewport.setPointerCapture?.(e.pointerId);
      });
  
      this.viewport.addEventListener("pointermove", (e) => {
        if (!this.dragging) return;
  
        const dx = e.clientX - this.startX;
  
        const now = performance.now();
        const dt = Math.max(1, now - this.lastT);
        const ddx = e.clientX - this.lastX;
  
        this.velocity = (ddx / dt) * 1000; // px/s
        this.lastX = e.clientX;
        this.lastT = now;
  
        // drag kanan => progress turun
        this.progress = this.startProgress - dx;
        this.render();
      });
  
      const end = () => {
        if (!this.dragging) return;
        this.dragging = false;
        this.inertiaActive = Math.abs(this.velocity) > 80;
      };
  
      this.viewport.addEventListener("pointerup", end);
      this.viewport.addEventListener("pointercancel", end);
      this.viewport.addEventListener("pointerleave", end);
  
      window.addEventListener("resize", () => {
        this.recalc();
        // keep near middle after resize
        this.progress = this.cycleWidth;
        this.render();
      }, { passive: true });
    }
  
    render() {
      // keep progress inside middle cycle to avoid blank
      if (this.progress < 0) this.progress += this.cycleWidth;
      if (this.progress > this.cycleWidth * 2) this.progress -= this.cycleWidth;
  
      // translate in pixels
      const x = -this.progress;
      this.track.style.transform = `translate3d(${x}px,0,0)`;
    }
  
    tick(now) {
      const dt = Math.min(40, now - this.lastFrame);
      this.lastFrame = now;
  
      // autoplay
      if (!this.dragging && !this.inertiaActive) {
        this.progress += (this.dir * this.speed * dt) / 1000;
        this.render();
      }
  
      // inertia
      if (!this.dragging && this.inertiaActive) {
        const friction = 0.92;
        this.velocity *= Math.pow(friction, dt / 16);
  
        if (Math.abs(this.velocity) < 8) {
          this.inertiaActive = false;
          this.velocity = 0;
        } else {
          // drag velocity (+) geser kanan => progress berkurang
          this.progress -= (this.velocity * dt) / 1000;
          this.render();
        }
      }
  
      requestAnimationFrame(this.tick.bind(this));
    }
  }

  // ===== INIT =====
 new InfiniteCarousel({
  viewport: document.getElementById("coffeeViewport"),
  track: document.getElementById("coffeeTrack"),
  items: coffeeMenu,
  variant: "red",
  dir: 1   // COFFEE: kanan -> kiri
});

new InfiniteCarousel({
  viewport: document.getElementById("noncoffeeViewport"),
  track: document.getElementById("noncoffeeTrack"),
  items: nonCoffeeMenu,
  variant: "orange",
  dir: -1  // NON COFFEE: kiri -> kanan
});