const MENU = [
    { name: 'Spanish Coffee', cat: 'signature', img: 'img/spanish.png', page: 'spanish.html', color: '#c8803a', line: 'Creamy dan smooth, kopinya tetep berasa.' },
    { name: 'Salted Caramel', cat: 'signature', img: 'img/salted.png', page: 'salted.html', color: '#d49a52', line: 'Karamelnya tipis-tipis tapi berasa.' },
    { name: 'Aren Coffee', cat: 'signature', img: 'img/gula aren.png', page: 'aren.html', color: '#8a5a34', line: 'Manis arennya pas, gurih susunya dapet.' },
    { name: 'Caramel Macchiato', cat: 'signature', img: 'img/maciato.png', page: 'maciato.html', color: '#b8742f', line: 'Kopi, susu, dan saus karamel yang estetik.' },
    { name: 'Pistachio', cat: 'signature', img: 'img/pistacio.png', page: 'pistacio.html', color: '#8fa66a', line: 'Gurih kacang yang bikin kopi naik kelas.' },

    { name: 'Vanilla', cat: 'classic', img: 'img/vanilla.png', page: 'vanila.html', color: '#d8b36a', line: 'Klasik dan comforting, wangi vanila lembut.' },
    { name: 'Cafe Latte', cat: 'classic', img: 'img/Caffe Late.png', page: 'latte.html', color: '#b08968', line: 'Espresso mantap ketemu susu yang lembut.' },
    { name: 'Hazelnut', cat: 'classic', img: 'img/hazelnut.png', page: 'hazelnut.html', color: '#a9714b', line: 'Gurih kacang, aromanya bikin rileks.' },
    { name: 'Tiramisu', cat: 'classic', img: 'img/tiramisu.png', page: 'tiramisu.html', color: '#9c6b4e', line: 'Kayak minum cake Italia yang creamy.' },
    { name: 'Caramel', cat: 'classic', img: 'img/caramel.jpg', page: 'caramel.html', color: '#c8803a', line: 'Si manis yang nggak pernah gagal.' },
    { name: 'Butterscotch', cat: 'classic', img: null, page: 'buter.html', color: '#d9a441', line: 'Karamel mentega, gurih manis bikin nagih.' },
    { name: 'Americano', cat: 'classic', img: null, page: null, color: '#5a3925', line: 'Espresso dan air, simpel dan tegas.' },
    { name: 'Rumbullion', cat: 'classic', img: 'img/rumbullion.png', page: 'rumbulion.html', color: '#7a4a2b', line: 'Menu classic Folkpresso dengan rasa beda.' },
    { name: 'Almond', cat: 'classic', img: 'img/almond.png', page: 'almond.html', color: '#c9a27a', line: 'Wangi almond, manis-gurih yang lembut.' },

    { name: 'Matcha Latte', cat: 'non', img: 'img/matcha.png', page: 'matcha.html', color: '#7da05a', line: 'Matcha earthy ketemu susu seger.' },
    { name: 'Chocolate', cat: 'non', img: 'img/coklat.png', page: 'coklat.html', color: '#6b3f2a', line: 'Cokelat pekat, manisnya pas.' }
];
const ORDER_URL='https://folkpresso-apk.vercel.app/',MIN_ORDER_LUAR='10 menu kopi';
const BY=Object.fromEntries(MENU.map(m=>[m.name,m])),$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const href=m=>m.page||'#pesan';
const polo=m=>`<a class="polo" href="${href(m)}" style="--c:${m.color}"><div class="ph">${m.img?`<img src="${m.img}" alt="${m.name}" loading="lazy" draggable="false">`:m.name[0]}</div><b>${m.name}</b><small>${m.line}</small></a>`;
// hero: stiker rasa
const FL=['Spanish Coffee','Aren Coffee','Salted Caramel','Pistachio','Matcha Latte','Chocolate'].map(n=>BY[n]);
const hero=$('#home'),cup=$('#cup'),capN=$('#capN'),capL=$('#capL'),capA=$('#capA'),picks=$('#picks');let cur=0,auto;
FL.forEach((m,i)=>{const b=document.createElement('button');b.className='pick'+(i?'':' on');b.setAttribute('aria-label',m.name);b.innerHTML=`<img src="${m.img}" alt="" draggable="false">`;b.onclick=()=>{clearInterval(auto);sel(i)};picks.appendChild(b)});
function sel(i){cur=i;const m=FL[i];$$('.pick').forEach((b,j)=>b.classList.toggle('on',j===i));hero.style.setProperty('--c',m.color);cup.classList.add('out');setTimeout(()=>{cup.src=m.img;cup.alt=m.name;capN.textContent=m.name;capL.textContent=m.line;capA.href=m.page;cup.classList.remove('out')},260)}
hero.style.setProperty('--c',FL[0].color);auto=setInterval(()=>sel((cur+1)%FL.length),4500);
// carousel: selalu jalan kanan ke kiri
function marquee(row,speed){const track=$('.mtrack',row),base=[...track.children];let period=0,pos=0,paused=false,drag=false,moved=0,sx=0,sp=0,vis=true,last=0,ready=false;
function build(){$$('[data-c]',track).forEach(c=>c.remove());period=track.scrollWidth+(parseFloat(getComputedStyle(track).columnGap)||28);const n=Math.ceil(Math.max(innerWidth,screen.width)*2/period)+1;for(let i=0;i<n;i++)base.forEach(c=>{const k=c.cloneNode(true);k.dataset.c=1;k.setAttribute('aria-hidden','true');k.tabIndex=-1;track.appendChild(k)});if(!ready){pos=0;ready=true}}
build();addEventListener('load',build);let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(build,200)});
new IntersectionObserver(e=>{vis=e[0].isIntersecting}).observe(row);
function tick(t){const dt=Math.min((t-last)/1000||0,.05);last=t;if(vis){if(!paused&&!drag)pos-=speed*dt;while(pos<=-period)pos+=period;while(pos>0)pos-=period;track.style.transform=`translate3d(${pos}px,0,0)`}requestAnimationFrame(tick)}
if(matchMedia('(hover: hover)').matches){row.onmouseenter=()=>paused=true;row.onmouseleave=()=>paused=false}
row.addEventListener('pointerdown',e=>{drag=true;moved=0;sx=e.clientX;sp=pos});addEventListener('pointermove',e=>{if(!drag)return;moved=Math.max(moved,Math.abs(e.clientX-sx));pos=sp+e.clientX-sx});
['pointerup','pointercancel','blur'].forEach(v=>addEventListener(v,()=>drag=false));row.addEventListener('click',e=>{if(moved>6)e.preventDefault()},true);requestAnimationFrame(tick)}
[['signature','Signature'],['classic','Classic'],['non','Non-kopi']].forEach(([c,t])=>{const w=document.createElement('div');w.innerHTML=`<p class="row-tt wrap">${t}</p><div class="mrow"><div class="mtrack">${MENU.filter(m=>m.cat===c).map(polo).join('')}</div></div>`;$('#rows').append(...w.children);});
$$('.mrow').forEach(r=>marquee(r,42));
// kocok rekomendasi
let lastR=null;const out=$('#rollOut');
function roll(){const pool=MENU.filter(m=>m.img&&m.name!==lastR),m=pool[Math.random()*pool.length|0];lastR=m.name;out.innerHTML=polo(m)+`<p class="hand">${m.line}</p>`}
$('#roll').onclick=roll;roll();
// area antar
const ar=$('#chips'),aout=$('#areaOut');
['Parung','Sawangan','Ciputat','Pamulang','Daerah lain'].forEach(a=>{const b=document.createElement('button');b.textContent=a;b.onclick=()=>{$$('button',ar).forEach(x=>x.classList.toggle('on',x===b));aout.style.animation='none';void aout.offsetWidth;aout.style.animation='';aout.textContent=a==='Daerah lain'?`Tetap bisa kok! Minimal order ${MIN_ORDER_LUAR}.`:`Aman, ${a} kami antar. Berapa pun pesanannya.`};ar.appendChild(b)});
$('button',ar).click();
// umum
addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('done'),600));
const bar=$('#progress');addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%'},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(el=>io.observe(el));
if(matchMedia('(hover: hover)').matches){const d=document.createElement('div');d.className='drag-dot';d.textContent='geser';document.body.appendChild(d);document.addEventListener('pointermove',e=>{const on=!!e.target.closest('.mrow');d.classList.toggle('on',on);if(on)d.style.transform=`translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`})}
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target==='_blank'||e.defaultPrevented||e.metaKey||e.ctrlKey)return;const h=a.getAttribute('href');if(!h||h.startsWith('#')||/^https?:/.test(h))return;e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.href=a.href,260)});
addEventListener('pageshow',()=>document.body.classList.remove('leaving'));
