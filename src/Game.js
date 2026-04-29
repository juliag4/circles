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
        width: 500px;
        height: 500px;
    }
`);

class Game extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <canvas></canvas>
        `;
        
        this.canvas = this.querySelector('canvas');
        this.canvas.width = '500';
        this.canvas.height = '500';
        this.ctx = this.canvas.getContext('2d');
        
        this.mousePos = {x: 45, y: 230};
        this.circlePos = {x: 45, y: 230};
        
        // Changes mouse position based on mousemove event
        this.canvas.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });
        
        // Redraws the circle every 1000 seconds if the player does not run into the map boundaries
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
        // Return if positions are the same
        if(this.circlePos.x === this.mousePos.x && this.circlePos.y === this.mousePos.y){
            return;
        }
        
        const radius = 20;
        const borderWidth = 2;
        
        // Clears the circle
        // Subtracts from the center of the circle and erases based
        // on its total height/width
        this.ctx.clearRect(this.circlePos.x - radius - borderWidth, this.circlePos.y - radius - borderWidth, (radius * 2) + (borderWidth * 2), (radius * 2) + (borderWidth * 2));

        // Calculates how far to move the circle
        const xDiff = this.mousePos.x - this.circlePos.x;
        const yDiff = this.mousePos.y - this.circlePos.y;
        
        const maxSpeed = 20;
        
        const changeX = xDiff <= 0 ? Math.max(xDiff, -maxSpeed) : Math.min(xDiff, maxSpeed);
        const changeY = yDiff <= 0 ? Math.max(yDiff, -maxSpeed) : Math.min(yDiff, maxSpeed);
        
        this.circlePos.x += changeX;
        this.circlePos.y += changeY;
        
        // Styling of the circle itself
        this.ctx.beginPath();
        this.ctx.arc(this.circlePos.x, this.circlePos.y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'purple';
        this.ctx.fill();
        this.ctx.lineWidth = borderWidth;
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        this.ctx.closePath();
    };
};
customElements.define('circle-game', Game);
