let style = document.createElement('style');
style.innerHTML = `
  .root .header{
    background-color: blue;
  }
`;
document.head.appendChild(style);

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
