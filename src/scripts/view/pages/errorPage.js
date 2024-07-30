const showErrorPage = () => {
    const bodyElement = document.querySelector('body');
    const errorContainer = document.createElement('div');

    errorContainer.className = 'error-container';
    bodyElement.innerHTML = '';

    errorContainer.innerHTML = `
    <div class="error-content">
      <h1 class="error-title">Oops!</h1>
      <p class="error-message">400 - Bad Request</p>
      <p class="error-description">
        Your device is offline. Check your internet connection, then refresh the page.
      </p>
      <p class="refresh-instruction">Click the reload button below to refresh the page.</p>
      <button class="refresh-button" onclick="window.location.reload()">Refresh</button>
    </div>
  `;

    bodyElement.appendChild(errorContainer);
};

export default showErrorPage;
