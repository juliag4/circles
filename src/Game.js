import {AddStyle} from './Styles.js';

AddStyle(`
    body{
        margin: 0;
    }

    circle-game{
        display: flex;
        width: 100vw;
        height: 100vh;
        font-family: sans-serif;
    }

    canvas{
        background-color: lightblue;
        border: 2px solid black;
        object-fit: contain;
    }
`);

class Game extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
            <canvas></canvas>
        `;
        
        this.canvas = this.querySelector('canvas');
        this.canvas.width = '500';
        this.canvas.height = '500';
        this.ctx = this.canvas.getContext('2d');
        
        this.mousePos = {x: 45, y: 230};
        this.circlePos = {x: 45, y: 230};
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });
        this.redraw = this.redraw.bind(this);
        const drawInterval = setInterval(() => {
            const playerAlive = this.circlePos.x <= 460 && this.circlePos.x >= 40 &&
                            this.circlePos.y <= 460 && this.circlePos.y >= 40;
            if(playerAlive){ this.redraw(); }
            else{
                clearInterval(drawInterval);
                location.href = location.href.replace('game.html', '');
            }
       }, 1000);
    };
    
    redraw(){
        if(this.circlePos.x === this.mousePos.x && this.circlePos.y === this.mousePos.y){
            return;
        }
        
        this.ctx.clearRect(this.circlePos.x - 22, this.circlePos.y - 22, 44, 44);

        const xDiff = this.mousePos.x - this.circlePos.x;
        const yDiff = this.mousePos.y - this.circlePos.y;
        
        const changeX = xDiff <= 0 ? Math.max(xDiff, -20) : Math.min(xDiff, 20);
        const changeY = yDiff <= 0 ? Math.max(yDiff, -20) : Math.min(yDiff, 20);
        
        this.circlePos.x += changeX;
        this.circlePos.y += changeY;
         
        this.ctx.beginPath();
        this.ctx.arc(this.circlePos.x, this.circlePos.y, 20, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'purple';
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        this.ctx.closePath();
    };
};
customElements.define('circle-game', Game);
