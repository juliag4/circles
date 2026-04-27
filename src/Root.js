import {AddStyle} from './Styles.js';

AddStyle(`
  circle-root{
    display: flex;
    width: 100vw;
    height: 100vh;
    margin: 0;
    font-family: sans-serif;
  }

  circle-root .name-input-view{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  circle-root .header{
    display: flex;
    color: steelblue;
    font-size: 50px;
    font-weight: bold;
    position: absolute;
    top: 0;
  }
  
  circle-root .input-button-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  circle-root .input-button{
    padding: 5px;
    border: 1px solid black;
    border-radius: 3px;
    font-size: 18px;
  }

  circle-root .username{
    display: flex;
    background-color: lightgrey;
  }

  circle-root .play{
    display: flex;
    justify-content: center;
    width: 50%;
    background-color: steelblue;
    color: white;
    cursor: pointer;
  }

  circle-root .play:hover{
    filter: brightness(0.7);
  }
`);

class Root extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
          <div class="name-input-view">
              <div class="header">Circles</div>
              <div class="input-button-container">
                  <input class="username input-button" placeholder="Name" spellcheck="false"></input>
                  <button class="play input-button">Play</button>
              </div>
          </div>
        `;
        this.querySelector('.play').addEventListener('click', () => location.href += 'game.html');
    };
};
customElements.define('circle-root', Root);
