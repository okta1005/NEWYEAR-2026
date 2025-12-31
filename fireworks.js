function startFireworks(){
    let canvas = document.getElementById('fireworks');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function randomColor(){
        let colors = ['#ff00ff','#0ff','#ff0099','#00ff99'];
        return colors[Math.floor(Math.random()*colors.length)];
    }

    function drawSpark(x,y,r,color){
        ctx.beginPath();
        ctx.arc(x,y,r,0,Math.PI*2);
        ctx.fillStyle=color;
        ctx.fill();
    }

    let sparks = [];
    for(let i=0;i<50;i++){
        sparks.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            vx:(Math.random()-0.5)*6,
            vy:(Math.random()-0.5)*6,
            r:Math.random()*3+2,
            color: randomColor()
        });
    }

    setInterval(()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
        sparks.forEach(s=>{
            drawSpark(s.x,s.y,s.r,s.color);
            s.x += s.vx;
            s.y += s.vy;
            if(s.x<0||s.x>canvas.width)s.vx*=-1;
            if(s.y<0||s.y>canvas.height)s.vy*=-1;
        });
    },30);
}

function startParticles(){
    let canvas = document.getElementById('particle');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for(let i=0;i<100;i++){
        particles.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            size:Math.random()*2+1,
            speedY: Math.random()*1+0.5,
            color:['#ff00ff','#0ff','#ff0099','#00ff99'][Math.floor(Math.random()*4)]
        });
    }

    setInterval(()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p=>{
            ctx.fillStyle=p.color;
            ctx.fillRect(p.x,p.y,p.size,p.size);
            p.y -= p.speedY;
            if(p.y<0)p.y=canvas.height;
        });
    },20);
}
