function startFireworks(){
    let canvas = document.getElementById('fireworks');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function randomColor() {
        return 'hsl(' + (Math.random() * 360) + ',100%,50%)';
    }

    function drawCircle(x, y, radius, color){
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    function drawHeart(x, y, size, color){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x, y - size/2, x - size, y - size/2, x - size, y);
        ctx.bezierCurveTo(x - size, y + size/2, x, y + size, x, y + size*1.5);
        ctx.bezierCurveTo(x, y + size, x + size, y + size/2, x + size, y);
        ctx.bezierCurveTo(x + size, y - size/2, x, y - size/2, x, y);
        ctx.fillStyle = color;
        ctx.fill();
    }

    setInterval(()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let i=0;i<5;i++){
            let x = Math.random()*canvas.width;
            let y = Math.random()*canvas.height/2;
            drawCircle(x,y, Math.random()*20+10, randomColor());
        }
        for(let i=0;i<2;i++){
            let x = Math.random()*canvas.width;
            let y = Math.random()*canvas.height/2;
            drawHeart(x,y,20, randomColor());
        }
    }, 300);
}
