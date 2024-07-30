class SkipToContent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
      <a href="#trendy-Restaurants" class="skip-link" id="skip-link" >Skip to main content</a>
    `;
    }
}

customElements.define('skip-to-content', SkipToContent);
