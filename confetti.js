function startConfetti(){
    let canvas = document.getElementById('confetti');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confetti = [];
    for(let i=0;i<150;i++){
        confetti.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            r: Math.random()*6+2,
            d: Math.random()*150+1,
            color: `hsl(${Math.random()*360},100%,50%)`,
            tilt: Math.random()*10-10
        });
    }

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        confetti.forEach(c=>{
            ctx.beginPath();
            ctx.lineWidth = c.r;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + c.r/2, c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r/2);
            ctx.stroke();
        });
        update();
    }

    function update(){
        confetti.forEach(c=>{
            c.y += Math.cos(0.01*c.d)+1+c.r/2;
            c.x += Math.sin(0.01*c.d);
            if(c.y>canvas.height) c.y=0;
        });
    }

    setInterval(draw,20);
}
