.header{
  background-color: blue;
}

class Root extends HTMLElement{
  this.innerHTML = `
    <div class="header">
      Initial header class
    </div>
  `;
  
  constructor(){
    super();
  }
}
customElements.define('root', Root);
