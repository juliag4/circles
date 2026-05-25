import {AddStyle} from './Styles.js';

import FoodCollection from './FoodCollection.js';

AddStyle(`
    body{
        margin: 0;
    }

    multiplayer-game{
        display: flex;
        font-family: sans-serif;
        width: 100vw;
        height: 100vh;
    }

    canvas{
        background-color: lightblue;
        object-fit: contain;
    }
`);

export default class MultiplayerGame extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <canvas></canvas>
        `;
    }
    
}
customElements.define('multiplayer-game', MultiplayerGame);
