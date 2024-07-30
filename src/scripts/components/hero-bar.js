class HeroBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML += `      
    <div class="hero">
    <div class="hero__inner">
      <h1 class="hero__title">Luweh Culinary</h1>
      <p class="hero__tagline">Kami buatkan daftar beberapa restoran terbaik dan favorite bagi pecinta kuliner di Indonesia yang perlu anda kunjungi</p>
    </div>
  </div>
    `;
  }
}

customElements.define('hero-bar', HeroBar);
