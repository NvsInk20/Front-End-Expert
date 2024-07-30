class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML += `
                <div class="footer-bar" tabindex="0" alt="Anda sudah berada di akhir halaman">
                  <p>Copyright &copy; 2024 - Ramadhan</p>
                  </div>
          `;
  }
}

customElements.define("footer-bar", FooterBar);
