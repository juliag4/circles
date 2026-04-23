.header{
  background-color: blue;
}

class Root extends HTMLElement{
  constructor(){
    super();
    console.log("before html");
    this.innerHTML = `
      <div class="header">
        Initial header class
      </div>
    `;
    console.log("after html");
  }
}
customElements.define('root', Root);
