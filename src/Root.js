import {AddStyle} from 'Styles.js';

AddStyle(*/css*/'
  .circle-root .header{
    color: blue;
    font-size: 50px;
  }
');

class Root extends HTMLElement{
  constructor(){
    super();
    this.innerHTML = `
      <div class="header">
        Initial header class
      </div>`;
  };
};
customElements.define('circle-root', Root);
