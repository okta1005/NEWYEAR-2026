/* ===== CANVAS BINTANG ===== */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Bintang jatuh
let stars = Array.from({length: 120}, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  r: Math.random()*2,
  dy: Math.random()*1.2 + 0.3
}));

function animateStars() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#0ff";
  stars.forEach(s => {
    s.y += s.dy;
    if (s.y > canvas.height) { s.y = 0; s.x = Math.random()*canvas.width; }
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}
animateStars();

/* ===== FIREWORKS ===== */
let fireworksActive = false;
let fireworks = [];

function launchFirework() {
  fireworks.push({
    x: Math.random() * canvas.width,
    y: canvas.height,
    targetY: Math.random() * canvas.height / 2,
    exploded: false,
    particles: []
  });
}

// Ledakan hati diperbesar
function heartPattern(x, y) {
  const p = [];
  for (let t = 0; t < Math.PI * 2; t += 0.15) {
    const r = 25*(1-Math.sin(t)); // lebih besar
    p.push({ x, y, dx: r*Math.cos(t)*0.6, dy: -r*Math.sin(t)*0.6, life: 100, color:"#f0f" });
  }
  return p;
}

// explode tanpa teks, semua pakai heartPattern
function explode(fw){
  fw.particles = heartPattern(fw.x, fw.y);
}

function animateFireworks() {
  if(!fireworksActive) return;
  fireworks.forEach((fw,i)=>{
    if(!fw.exploded){
      fw.y -= 10; // lebih cepat
      ctx.fillStyle="#fff";
      ctx.fillRect(fw.x,fw.y,4,4); // lebih besar
      if(fw.y<=fw.targetY){
        fw.exploded=true;
        explode(fw);
      }
    } else {
      fw.particles.forEach((p,j)=>{
        p.x+=p.dx;
        p.y+=p.dy;
        p.life--;
        ctx.fillStyle=p.color;
        ctx.fillRect(p.x,p.y,4,4); // partikel lebih besar
        if(p.life<=0) fw.particles.splice(j,1);
      });
    }
    if(fw.exploded && fw.particles.length===0) fireworks.splice(i,1);
  });
  requestAnimationFrame(animateFireworks);
}

/* ===== COUNTDOWN 10 DETIK ===== */
const newYear = Date.now() + 10000; // 10 detik
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const nameInput = document.getElementById("name");
const wishInput = document.getElementById("wish");
const wishList = document.getElementById("wishList");

const timer = setInterval(()=>{
  const now = Date.now();
  const d = newYear - now;
  if(d<=0){
    clearInterval(timer);
    document.getElementById("countdown").innerHTML="🎆 00 : 00 : 00 : 00 🎆";
    title.innerText="HAPPY NEW YEAR 2026";
    subtitle.innerText="Semoga semua harapan tercapai ✨";
    title.classList.add("newyear");

    // Aktifkan form kalau belum submit
    if(!localStorage.getItem("submitted")){
      document.querySelectorAll("input, textarea, button").forEach(el=>el.disabled=false);
    }

    fireworksActive=true;
    setInterval(launchFirework, 700);
    animateFireworks();
    return;
  }

  days.innerText = Math.floor(d / (1000*60*60*24));
  hours.innerText = Math.floor((d / (1000*60*60)%24));
  minutes.innerText = Math.floor((d/ (1000*60)%60));
  seconds.innerText = Math.floor((d/1000)%60);

},1000);

/* ===== SAVE WISH ===== */
function saveWish(){
  const name = nameInput.value.trim();
  const wish = wishInput.value.trim();
  if(!name||!wish) return alert("Isi dulu ✨");

  if(localStorage.getItem("submitted")){
    alert("Kamu sudah mengirim harapan sebelumnya 🎆");
    return;
  }

  const data = JSON.parse(localStorage.getItem("wishes"))||[];
  data.push({name,wish});
  localStorage.setItem("wishes",JSON.stringify(data));
  localStorage.setItem("submitted","true");

  alert("Harapan tersimpan 🎆");

  // ubah tampilan setelah submit
  document.querySelector(".container").innerHTML=`
    <h1 id="title">SEE YOU ON 2027</h1>
    <p id="subtitle"></p>
    <span style="position:fixed;bottom:5px;right:10px;font-size:12px;color:#0ff;">by OKTXVNUS</span>
  `;
}

/* ===== ADMIN ===== */
function openAdmin(){
  if(prompt("Password admin:")==="admin2026"){
    wishList.style.display="block";
    const data=JSON.parse(localStorage.getItem("wishes"))||[];
    wishList.innerHTML="<h3>📜 Harapan Masuk</h3>";
    data.forEach((w,i)=>{
      wishList.innerHTML+=`<p>${i+1}. <b>${w.name}</b>: ${w.wish}</p>`;
    });
  } else alert("Akses ditolak ❌");
}

/* ===== AKTIFKAN FORM JIKA BELUM SUBMIT ===== */
if(!localStorage.getItem("submitted")){
  document.querySelectorAll("input, textarea, button").forEach(el=>el.disabled=false);
}
