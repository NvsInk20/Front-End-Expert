class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML += `   
    <div class="logo_brand" id="title" alt="logo" tabindex="0">
        <i class="fa fa-utensils"></i>  
        <h1 class="header__title" >Luweh Culinary</h1>
    </div>
        <nav id="drawer" class="nav">
          <ul class="nav__list">
            <li class="nav__item"><a href="">Home</a></li>
            <li class="nav__item"><a href="#/favorite">Favorite</a></li>
            <li class="nav__item"><a href="https://github.com/NvsInk20">About Us</a></li>
           </ul>
        </nav>
        <a href="" id="menu" class="header__menu" tabindex="0">☰</a>
    `;
  }
}

customElements.define('app-bar', AppBar);
