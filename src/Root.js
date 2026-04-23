let style = document.createElement('style');
style.innerHTML = `
  .agario-root .header{
    color: blue;
    font-size: 50px;
  }
`;
document.body.appendChild(style);

class Root extends HTMLElement{
  constructor(){
    super();
    this.innerHTML = `
      <div class="header">
        Initial header class
      </div>`;
  };
};
customElements.define('agario-root', Root);
