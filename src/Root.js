import {AddStyle} from './Styles.js';

AddStyle(`
  circle-root{
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    margin: 0;
    font-family: sans-serif;
  }

  circle-root .header{
    display: flex;
    color: blue;
    font-size: 50px;
  }
`);

class Root extends HTMLElement{
  constructor(){
    super();
    this.innerHTML = `
      <div class="header">
        Circles
      </div>`;
  };
};
customElements.define('circle-root', Root);
