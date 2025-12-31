function startFireworks(){
    let canvas = document.getElementById('fireworks');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function randomColor(){
        let colors = ['#ff00ff','#0ff','#00ff99','#ff0099'];
        return colors[Math.floor(Math.random()*colors.length)];
    }

    function drawCircle(x,y,radius,color){
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI*2);
        ctx.fillStyle=color;
        ctx.fill();
    }

    function drawPixel(x,y,size,color){
        ctx.fillStyle=color;
        ctx.fillRect(x,y,size,size);
    }

    setInterval(()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let i=0;i<5;i++){
            let x=Math.random()*canvas.width;
            let y=Math.random()*canvas.height/2;
            drawCircle(x,y,Math.random()*15+5,randomColor());
        }
        for(let i=0;i<3;i++){
            let x=Math.random()*canvas.width;
            let y=Math.random()*canvas.height/2;
            drawPixel(x,y,6,randomColor());
        }
    },300);
}
